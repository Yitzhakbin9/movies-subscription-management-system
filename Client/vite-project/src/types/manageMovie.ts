import type { MovieGenre } from '../constants/movieGenres';

export interface MovieSubscription {
  id: string;
  memberName: string;
  watchedYear: number;
}

export interface ManageMovie {
  id: string;
  name: string;
  genres: MovieGenre[];
  imageUrl: string;
  premieredAt: string;
  subscriptions: MovieSubscription[];
}
