import { Types } from 'mongoose';

export interface WatchedMovie {
  movieId: Types.ObjectId | string;
  date: Date;
}

export interface SubscriptionData {
  MemberId: Types.ObjectId | string;
  Movies?: WatchedMovie[];
}

export type PartialSubscriptionData = Partial<SubscriptionData>;
