import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { loadAuthState, saveAuthState } from '../features/auth/authStorage';

// Bootstrap Redux from persisted auth so refresh does not wipe the local session.
const preloadedAuthState = loadAuthState();
debugger;
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedAuthState ? { auth: preloadedAuthState } : undefined,
});

// Keep persistence out of components by syncing storage centrally at the store level.
store.subscribe(() => {
  saveAuthState(store.getState().auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
