import { promises as fs } from 'fs';
import path from 'path';
import { PermissionData, PartialPermissionData } from '../models/permissionInterface';

const PERMISSIONS_FILE_PATH = path.join(__dirname, '../../data/Permission.json');

const getAllPermissions = async (): Promise<PermissionData[]> => {
  const permissionsData = await fs.readFile(PERMISSIONS_FILE_PATH, 'utf-8');
  return JSON.parse(permissionsData) as PermissionData[];
};

const getPermissionById = async (id: string): Promise<PermissionData | undefined> => {
  const permissions = await getAllPermissions();
  return permissions.find((permission) => permission.id === id);
};

const createPermission = async (
  permissionData: PermissionData
): Promise<PermissionData> => {
  const permissions = await getAllPermissions();
  const existingPermission = permissions.find(
    (permission) => permission.id === permissionData.id
  );

  if (existingPermission) {
    throw new Error('Permission with this id already exists');
  }

  const newPermission = {
    id: permissionData.id,
    permissions: permissionData.permissions,
  };

  permissions.push(newPermission);
  await fs.writeFile(PERMISSIONS_FILE_PATH, JSON.stringify(permissions, null, 2));

  return newPermission;
};

const updatePermission = async (
  id: string,
  permissionData: PartialPermissionData
): Promise<PermissionData | undefined> => {
  const permissions = await getAllPermissions();
  const permissionIndex = permissions.findIndex((permission) => permission.id === id);

  if (permissionIndex === -1) {
    return undefined;
  }

  permissions[permissionIndex] = {
    ...permissions[permissionIndex],
    ...permissionData,
  };

  await fs.writeFile(PERMISSIONS_FILE_PATH, JSON.stringify(permissions, null, 2));

  return permissions[permissionIndex];
};

const replacePermission = async (
  id: string,
  permissionData: PermissionData
): Promise<PermissionData | undefined> => {
  const permissions = await getAllPermissions();
  const permissionIndex = permissions.findIndex((permission) => permission.id === id);

  if (permissionIndex === -1) {
    return undefined;
  }

  permissions[permissionIndex] = {
    id,
    permissions: permissionData.permissions,
  };

  await fs.writeFile(PERMISSIONS_FILE_PATH, JSON.stringify(permissions, null, 2));

  return permissions[permissionIndex];
};

const deletePermission = async (id: string): Promise<PermissionData | undefined> => {
  const permissions = await getAllPermissions();
  const permissionToDelete = permissions.find((permission) => permission.id === id);

  if (!permissionToDelete) {
    return undefined;
  }

  const updatedPermissions = permissions.filter((permission) => permission.id !== id);
  await fs.writeFile(PERMISSIONS_FILE_PATH, JSON.stringify(updatedPermissions, null, 2));

  return permissionToDelete;
};

export {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  replacePermission,
  deletePermission,
};
