export const USER_FIELDS = {
  // Database fields (MongoDB)
  USER_NAME: 'name',
  PASSWORD: 'password',

  // Users.json profile fields
  ID: 'Id',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  CREATED_DATE: 'CreatedDate',
  SESSION_TIMEOUT: 'sessionTimeout'
} as const;

export type UserFieldKey = keyof typeof USER_FIELDS;
