export interface UserData {
  userName: string;
  password: number;
  firstName?: string;
  lastName?: string;
  sessionTimeout?: number;
}

export type PartialUserData = Partial<UserData>;
