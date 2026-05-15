import { useOutletContext } from 'react-router-dom';
import type { ManageUser } from '../types/manageUser';

export interface ManageUsersOutletContext {
  users: ManageUser[];
  addUser: (newUser: ManageUser) => void;
  deleteUser: (userId: string) => void;
  updateUser: (updatedUser: ManageUser) => void;
}

export function useManageUsersOutletContext() {
  return useOutletContext<ManageUsersOutletContext>();
}
