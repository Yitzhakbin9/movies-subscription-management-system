# Project Plan

## Goal

Build `Server/SubscriptionWS` step by step as a REST API service, while stopping after each step for review before continuing.

The user asked that every step should include:

- what was done
- why it was done that way
- a pause for approval before moving to the next step

## Frontend Auth Progress

This chat also added the first Redux-based auth foundation in `Client/vite-project`.

### Decision

We chose:

- `@reduxjs/toolkit` for modern Redux setup
- `react-redux` for connecting React components to the store
- `localStorage` only for persistence across refreshes

Why:

- Redux is the live app state
- `localStorage` is only the persistence layer
- this is a clean base for future protected routes, shared header UI, and JWT auth

### What Was Added

Completed:

- installed `@reduxjs/toolkit`
- installed `react-redux`
- added `Client/vite-project/src/app/store.ts`
- wrapped the app with Redux `Provider` in `Client/vite-project/src/main.tsx`
- added `Client/vite-project/src/features/auth/authSlice.ts`
- added `Client/vite-project/src/features/auth/authStorage.ts`
- updated `Client/vite-project/src/components/LoginPage.tsx` to dispatch Redux login

### Current Auth Shape

Current Redux auth state:

- `auth.user`
- `auth.isAuthenticated`

Current user shape:

- `id`
- `username`
- `joinedAt`

### Current Behavior

Implemented:

- submitting the login form dispatches a Redux `login(...)` action
- auth state is saved to `localStorage`
- auth state is loaded back into Redux when the app starts
- refresh keeps the user logged in locally

Important current limitation:

- `id` and `joinedAt` are still temporary frontend-generated values
- real backend login has not been connected yet
- JWT authentication has not been added yet
- the shared header that shows the username on every page has not been built yet

### Validation

Validation completed during this chat:

- `npm run build` passed after store setup
- `npm run build` passed after adding the auth slice
- `npm run build` passed after wiring login dispatch
- `npm run build` passed after adding auth persistence

### Next Frontend Steps

Recommended next steps when continuing:

1. Add a shared layout/header.
2. Read `state.auth.user` there.
3. Show the username in the top-right corner on every page.
4. Add logout behavior.
5. Replace temporary login data with real backend auth response.
6. Add JWT-based login flow later if desired.

## Agreed Architecture

The backend workspace currently contains:

- `Server/CinemaWS`
- `Server/SubscriptionWS`
- shared server-level config in `Server/configs`

The intended layered structure for `SubscriptionWS` is:

- `index.ts`
- `routers/`
- `services/`
- `repositories/`
- `models/`

The same layered idea already exists in `CinemaWS`, so `SubscriptionWS` should follow that pattern for consistency.

## Shared DB Decision

We discussed whether both WS services should share the DB config.

Decision:

- shared DB config lives in `Server/configs/db.ts`
- both `CinemaWS` and `SubscriptionWS` import that shared config

Important implementation note:

- directly importing `mongoose` inside a shared file above both WS folders caused a module-resolution risk
- the safer shared solution was to keep one shared `connectDB` function and pass each WS its own local `mongoose` instance

Current state:

- `Server/configs/db.ts` exists
- both WS build successfully against it

## Step-by-Step Progress So Far

### Step 1 - SubscriptionWS scaffold

Completed:

- added `Server/SubscriptionWS/index.ts`
- added `Server/SubscriptionWS/tsconfig.json`
- updated `Server/SubscriptionWS/package.json` scripts
- added initial DB connection setup

Why:

- establish a clean runnable service before adding business logic
- keep the shape aligned with `CinemaWS`

Validation:

- `npm run build` passed in `Server/SubscriptionWS`

### Shared-config refactor

Completed:

- moved DB config up to `Server/configs/db.ts`
- updated `CinemaWS` and `SubscriptionWS` to use it
- added `Server/CinemaWS/tsconfig.json`
- updated both WS package build/start behavior to match the new compile layout

Why:

- avoid duplicated DB config
- keep one source of truth for the shared Mongo connection logic

Validation:

- `npm run build` passed in `Server/CinemaWS`
- `npm run build` passed in `Server/SubscriptionWS`

### Step 2 - Initial subscription data layer

Originally implemented:

- one `Subscription` model with `memberId` and `movies[]`

Status:

- superseded after the user clarified the real collection design

Reason for refactor:

- the first version was based on an incomplete schema description

### Step 2 Refactor - Real collections

After clarification, the real data model is:

1. `Members`
2. `Movies`
3. `Subscriptions`

Completed:

- added `models/memberInterface.ts`
- added `models/memberModel.ts`
- added `models/movieInterface.ts`
- added `models/movieModel.ts`
- updated `models/subscriptionInterface.ts`
- updated `models/subscriptionModel.ts`
- added `repositories/memberRepository.ts`
- added `repositories/movieRepository.ts`
- kept `repositories/subscriptionRepository.ts`

Why:

- match the real project schema
- keep Mongo persistence isolated in repositories
- prepare a stable base for service and router work

Validation:

- `npm run build` passed in `Server/SubscriptionWS`

## Real Collection Design

### Members

Source:

- external WS: `https://jsonplaceholder.typicode.com/users`

Stored locally in Mongo collection:

- `Members`

Fields:

- `_id` - `ObjectId`
- `Name` - `String`
- `Email` - `String`
- `City` - `String`

### Movies

Source:

- external WS: `https://api.tvmaze.com/shows`

Stored locally in Mongo collection:

- `Movies`

Fields:

- `_id` - `ObjectId`
- `Name`
- `Genres` - array of strings
- `Image` - string URL
- `Premiered` - `Date`

### Subscriptions

Stored locally in Mongo collection:

- `Subscriptions`

Fields:

- `_id` - `ObjectId`
- `MemberId` - `ObjectId`
- `Movies` - array of:
  - `movieId` - `ObjectId`
  - `date` - `Date`

## Important Clarifications From The Chat

### Why `Member` and `Movie` models exist

Even though members and movies come from external WS endpoints, the clarified requirement is to store them in local Mongo collections too.

That means:

- external WS is the upstream source
- MongoDB is the local persisted copy used by this service

Because of that, `Member` and `Movie` models are correct and needed.

### What `ref` means in Mongoose

We discussed this in the `Subscription` schema:

```ts
movieId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Movie',
  required: true,
}
```

Meaning:

- the field stores an `ObjectId`
- that `ObjectId` is meant to point to a `Movie` document
- `ref` helps Mongoose understand relationships and enables `.populate()`
- it is not a true SQL-style foreign key constraint

### Where external WS fetching should happen

Decision:

- external API calls should happen in the service layer
- not in models
- not in repositories

Expected responsibility split:

- `models/` define Mongo shapes
- `repositories/` perform DB-only operations
- `services/` call external WS endpoints with `axios`, map the data, and save/update Mongo
- `routers/` expose HTTP endpoints and call services

### What sync means in this project

Sync means:

- fetch data from the external WS
- map it into the local Mongo shape
- upsert it into the local collection

Current behavior:

- `GET /members` reads local Mongo data
- `GET /movies` reads local Mongo data
- `POST /members/sync` refreshes the local `Members` collection from the external members WS
- `POST /movies/sync` refreshes the local `Movies` collection from the external movies WS

Why sync is used here instead of calling the external WS every time:

- local Mongo data gives stable `_id` values for `Subscriptions`
- requests do not depend on the external WS being available for every read
- validation between `Subscriptions`, `Members`, and `Movies` stays local and consistent

### When sync should be used

Typical use cases:

- first-time setup when local collections are empty
- manual refresh when external source data should be pulled again
- after clearing/resetting the DB
- before creating subscriptions, so referenced members and movies already exist locally

## Next Planned Step

Step 3 should add:

- `services/memberService.ts`
- `services/movieService.ts`
- `services/subscriptionService.ts`
- `routers/membersRouter.ts`
- `routers/moviesRouter.ts`
- `routers/subscriptionsRouter.ts`
- route mounting in `Server/SubscriptionWS/index.ts`

Status:

- completed

What was added:

- local CRUD services for members, movies, and subscriptions
- manual sync endpoints for members and movies
- `apiError.ts` for `SubscriptionWS`
- router mounts in `index.ts`

Manual sync endpoints currently available:

- `POST /members/sync`
- `POST /movies/sync`

Why this direction was chosen:

- keep external WS calls in the service layer
- keep routers thin
- keep manual control over imports instead of forcing startup sync
- preserve stable local Mongo ids for relationships

## Expected Service Responsibilities

### Member service

Should support:

- local CRUD
- fetch/sync from `https://jsonplaceholder.typicode.com/users`

Likely sync flow:

1. call external WS
2. map response fields into local shape
3. save or update local Mongo documents

### Movie service

Should support:

- local CRUD
- fetch/sync from `https://api.tvmaze.com/shows`

Likely sync flow:

1. call external WS
2. map response fields into local shape
3. save or update local Mongo documents

### Subscription service

Should support:

- CRUD for subscription documents
- later validation that `MemberId` and `movieId` point to existing local data if needed

Current state:

- `SubscriptionWS` now validates `MemberId` and `movieId` before create/update/replace
- subscriptions currently require referenced local members and movies to exist

## Stabilization Step

Completed after Step 3:

- added shared `validateObjectId.ts`
- return clearer `400` errors for invalid ids
- return clearer `502` errors when external sync fetches fail
- prevent deleting a member that is still referenced by subscriptions
- prevent deleting a movie that is still referenced by subscriptions

Why:

- avoid vague Mongoose cast errors
- avoid orphaned references inside `Subscriptions`
- make sync failures easier to understand

Notes added in code:

- short comments were added above `syncMembers()` and `syncMovies()`
- short comments were added above the delete guards in `memberService.ts` and `movieService.ts`

Delete guard explanation:

- checking by id only answers whether the target document exists
- the subscription check answers whether deleting it would leave broken references behind
- this project currently blocks those deletes instead of allowing orphaned relations

## Open Design Questions

- Should members and movies be synced only manually at first, or also on app startup?
- Do we want dedicated sync endpoints such as:
  - `POST /members/sync`
  - `POST /movies/sync`
- Should subscriptions be allowed only after members and movies were already imported locally?
- Do we want a `sync all` endpoint later?
- Do we want populated subscription responses later instead of only ids?

## Current Verified Status

- `SubscriptionWS` scaffold exists
- shared DB config is in place
- `Members`, `Movies`, and `Subscriptions` Mongo models exist
- repositories exist for all three collections
- services and routers exist for all three areas
- manual sync endpoints exist for members and movies
- validation and delete guards were added
- builds are currently passing for the completed steps

## Rule For Continuing

Before each next implementation step:

- explain what will be added
- explain why that is the chosen direction
- implement only that step
- validate it
- wait for user approval before continuing
