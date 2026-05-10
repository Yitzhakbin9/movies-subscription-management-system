import {
  PartialSubscriptionData,
  SubscriptionData,
} from '../models/subscriptionInterface';
import * as memberRepository from '../repositories/memberRepository';
import * as movieRepository from '../repositories/movieRepository';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import ApiError from '../utils/apiError';
import validateObjectId from '../utils/validateObjectId';

const getAllSubscriptions = (filter: Record<string, unknown> = {}) =>
  subscriptionRepository.getAllSubscriptions(filter);

const getSubscriptionById = async (id: string) => {
  validateObjectId(id, 'Subscription id');
  const subscription = await subscriptionRepository.getSubscriptionById(id);

  if (!subscription) {
    throw new ApiError('Subscription not found', 404);
  }

  return subscription;
};

const validateSubscriptionRelations = async (
  subscriptionData: PartialSubscriptionData
) => {
  if (subscriptionData.MemberId !== undefined) {
    const memberId = String(subscriptionData.MemberId);
    validateObjectId(memberId, 'MemberId');

    const member = await memberRepository.getMemberById(memberId);

    if (!member) {
      throw new ApiError('Member not found for MemberId', 404);
    }
  }

  if (subscriptionData.Movies !== undefined) {
    for (const watchedMovie of subscriptionData.Movies) {
      const movieId = String(watchedMovie.movieId);
      validateObjectId(movieId, 'movieId');

      const movie = await movieRepository.getMovieById(movieId);

      if (!movie) {
        throw new ApiError(`Movie not found for movieId ${movieId}`, 404);
      }
    }
  }
};

const createSubscription = async (subscriptionData: SubscriptionData) => {
  await validateSubscriptionRelations(subscriptionData);
  return subscriptionRepository.createSubscription(subscriptionData);
};

const updateSubscription = async (
  id: string,
  subscriptionData: PartialSubscriptionData
) => {
  validateObjectId(id, 'Subscription id');
  await validateSubscriptionRelations(subscriptionData);

  const subscription = await subscriptionRepository.updateSubscription(
    id,
    subscriptionData
  );

  if (!subscription) {
    throw new ApiError('Subscription not found', 404);
  }

  return subscription;
};

const replaceSubscription = async (
  id: string,
  subscriptionData: SubscriptionData
) => {
  validateObjectId(id, 'Subscription id');
  await validateSubscriptionRelations(subscriptionData);

  const subscription = await subscriptionRepository.replaceSubscription(
    id,
    subscriptionData
  );

  if (!subscription) {
    throw new ApiError('Subscription not found', 404);
  }

  return subscription;
};

const deleteSubscription = async (id: string) => {
  validateObjectId(id, 'Subscription id');
  const subscription = await subscriptionRepository.deleteSubscription(id);

  if (!subscription) {
    throw new ApiError('Subscription not found', 404);
  }

  return subscription;
};

export {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  replaceSubscription,
  deleteSubscription,
};
