import {
  PERMISSIONS,
  type Permission,
} from '../constants/permissions';
import type { ManageUser } from '../types/manageUser';

const adminPermissions: Permission[] = [
  PERMISSIONS.VIEW_SUBSCRIPTIONS,
  PERMISSIONS.CREATE_SUBSCRIPTIONS,
  PERMISSIONS.DELETE_SUBSCRIPTIONS,
  PERMISSIONS.UPDATE_SUBSCRIPTION,
  PERMISSIONS.VIEW_MOVIES,
  PERMISSIONS.CREATE_MOVIES,
  PERMISSIONS.DELETE_MOVIES,
  PERMISSIONS.UPDATE_MOVIE,
];

export const mockManageUsers: ManageUser[] = [
  {
    id: '1',
    name: 'admin',
    password: '1234',
    firstName: 'System',
    lastName: 'Admin',
    createdDate: '2026-05-14',
    sessionTimeout: 30,
    permissions: adminPermissions,
  },
  {
    id: '2',
    name: 'dana',
    password: '1234',
    firstName: 'Dana',
    lastName: 'Levi',
    createdDate: '2026-05-12',
    sessionTimeout: 45,
    permissions: [
      PERMISSIONS.VIEW_SUBSCRIPTIONS,
      PERMISSIONS.CREATE_SUBSCRIPTIONS,
      PERMISSIONS.VIEW_MOVIES,
    ],
  },
];
