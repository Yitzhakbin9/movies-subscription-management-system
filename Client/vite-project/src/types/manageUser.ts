import type { Permission } from '../constants/permissions';

export interface ManageUser {
  name: string;
  password: string;
  id: string;
  firstName: string;
  lastName: string;
  createdDate: string;
  sessionTimeout: number;
  permissions: Permission[];
}
