import Subscription from '../models/subscriptionModel';
import {
  PartialSubscriptionData,
  SubscriptionData,
} from '../models/subscriptionInterface';

const getAllSubscriptions = (filter = {}) => Subscription.find(filter);

const getSubscriptionById = (id: string) => Subscription.findById(id);

const createSubscription = (subscriptionData: SubscriptionData) =>
  Subscription.create(subscriptionData);

const updateSubscription = (
  id: string,
  subscriptionData: PartialSubscriptionData
) =>
  Subscription.findByIdAndUpdate(id, subscriptionData, {
    new: true,
    runValidators: true,
  });

const replaceSubscription = (id: string, subscriptionData: SubscriptionData) =>
  Subscription.findOneAndReplace({ _id: id }, subscriptionData, {
    new: true,
    runValidators: true,
  });

const hasSubscriptionForMember = (memberId: string) =>
  Subscription.exists({ MemberId: memberId });

const hasSubscriptionForMovie = (movieId: string) =>
  Subscription.exists({ 'Movies.movieId': movieId });

const deleteSubscription = (id: string) => Subscription.findByIdAndDelete(id);

export {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  replaceSubscription,
  hasSubscriptionForMember,
  hasSubscriptionForMovie,
  deleteSubscription,
};
