import express, { Request, Response } from 'express';
import * as permissionService from '../services/permissionService';
import ApiError from '../utils/apiError';
import { PermissionData } from '../models/permissionInterface';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const permission = await permissionService.getPermissionById(req.params.id as string);
    res.json(permission);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const permission = await permissionService.createPermission(req.body as PermissionData);
    res.status(201).json(permission);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const permission = await permissionService.updatePermission(
      req.params.id as string,
      req.body as Partial<PermissionData>
    );

    res.json(permission);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const permission = await permissionService.replacePermission(
      req.params.id as string,
      req.body as PermissionData
    );

    res.json(permission);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const permission = await permissionService.deletePermission(req.params.id as string);
    res.json(permission);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

export default router;
