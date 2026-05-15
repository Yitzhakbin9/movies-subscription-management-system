export interface MovieSubscription {
  id: string;
  memberName: string;
  watchedYear: number;
}

export interface ManageMovie {
  id: string;
  name: string;
  year: number;
  imageUrl: string;
  subscriptions: MovieSubscription[];
}
