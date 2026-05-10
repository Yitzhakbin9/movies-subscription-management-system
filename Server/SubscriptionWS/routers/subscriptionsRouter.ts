import express, { Request, Response } from 'express';
import {
  SubscriptionData,
} from '../models/subscriptionInterface';
import * as subscriptionService from '../services/subscriptionService';
import ApiError from '../utils/apiError';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions(
      req.query as Record<string, string | undefined>
    );
    res.json(subscriptions);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const subscriptionId = String(req.params.id);
    const subscription = await subscriptionService.getSubscriptionById(subscriptionId);
    res.json(subscription);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionService.createSubscription(
      req.body as SubscriptionData
    );

    res.status(201).json(subscription);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const subscriptionId = String(req.params.id);
    const subscription = await subscriptionService.updateSubscription(
      subscriptionId,
      req.body as Partial<SubscriptionData>
    );

    res.json(subscription);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const subscriptionId = String(req.params.id);
    const subscription = await subscriptionService.replaceSubscription(
      subscriptionId,
      req.body as SubscriptionData
    );

    res.json(subscription);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const subscriptionId = String(req.params.id);
    const subscription = await subscriptionService.deleteSubscription(subscriptionId);
    res.json(subscription);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

export default router;
