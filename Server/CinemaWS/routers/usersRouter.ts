import express, { Request, Response } from 'express';
import * as userService from '../services/userService';
import ApiError from '../utils/apiError';
import { UserData } from '../models/userInterface';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(
      req.query as Record<string, string | undefined>
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }
    const user = await userService.getUserById(req.params.id as string);
    res.json(user);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body as UserData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});


router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(
      req.params.id as string,
      req.body as Partial<UserData>
    );
    res.json(user);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 400)
      .json({ message: customError.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.id as string);
    res.json(user);
  } catch (error) {
    const customError = error as ApiError;
    res
      .status(customError.status || 500)
      .json({ message: customError.message });
  }
});

export default router;
