import * as permissionRepository from '../repositories/permissionRepository';
import { PartialPermissionData } from '../models/permissionInterface';
import ApiError from '../utils/apiError';

const getAllPermissions = async () => {
  try {
    return await permissionRepository.getAllPermissions();
  } catch (error) {
    console.error('Error reading Permission.json:', error);
    throw new ApiError('Failed to load permissions', 500);
  }
};

const getPermissionById = async (id: string) => {
  try {
    const permission = await permissionRepository.getPermissionById(id);

    if (!permission) {
      throw new ApiError('Permission not found', 404);
    }

    return permission;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error reading Permission.json:', error);
    throw new ApiError('Failed to load permissions', 500);
  }
};

const createPermission = async (permissionData: PartialPermissionData) => {
  if (!permissionData.id) {
    throw new ApiError('Permission id is required', 400);
  }

  if (!Array.isArray(permissionData.permissions)) {
    throw new ApiError('Permissions array is required', 400);
  }

  try {
    return await permissionRepository.createPermission(permissionData as {
      id: string;
      permissions: string[];
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Permission with this id already exists') {
      throw new ApiError(error.message, 409);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error creating Permission.json:', error);
    throw new ApiError('Failed to create permission', 500);
  }
};

const updatePermission = async (id: string, permissionData: PartialPermissionData) => {
  try {
    const permission = await permissionRepository.updatePermission(id, permissionData);

    if (!permission) {
      throw new ApiError('Permission not found', 404);
    }

    return permission;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error updating Permission.json:', error);
    throw new ApiError('Failed to update permission', 500);
  }
};

const replacePermission = async (id: string, permissionData: PartialPermissionData) => {
  if (!Array.isArray(permissionData.permissions)) {
    throw new ApiError('PUT requires a full permissions array', 400);
  }

  try {
    const permission = await permissionRepository.replacePermission(id, {
      id,
      permissions: permissionData.permissions,
    });

    if (!permission) {
      throw new ApiError('Permission not found', 404);
    }

    return permission;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error replacing Permission.json:', error);
    throw new ApiError('Failed to replace permission', 500);
  }
};

const deletePermission = async (id: string) => {
  try {
    const permission = await permissionRepository.deletePermission(id);

    if (!permission) {
      throw new ApiError('Permission not found', 404);
    }

    return permission;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error deleting Permission.json:', error);
    throw new ApiError('Failed to delete permission', 500);
  }
};

export {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  replacePermission,
  deletePermission,
};
