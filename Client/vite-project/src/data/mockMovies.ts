import type { ManageMovie } from '../types/manageMovie';

export const mockMovies: ManageMovie[] = [
  {
    id: 'movie-1',
    name: 'The Matrix',
    year: 1999,
    imageUrl:
      'https://placehold.co/280x400/0f172a/f8fafc?text=The+Matrix',
    subscriptions: [
      {
        id: 'matrix-sub-1',
        memberName: 'Dana Levi',
        watchedYear: 2026,
      },
      {
        id: 'matrix-sub-2',
        memberName: 'System Admin',
        watchedYear: 2025,
      },
    ],
  },
  {
    id: 'movie-2',
    name: 'Inception',
    year: 2010,
    imageUrl:
      'https://placehold.co/280x400/1e293b/f8fafc?text=Inception',
    subscriptions: [
      {
        id: 'inception-sub-1',
        memberName: 'Noa Cohen',
        watchedYear: 2026,
      },
    ],
  },
  {
    id: 'movie-3',
    name: 'Interstellar',
    year: 2014,
    imageUrl:
      'https://placehold.co/280x400/172554/f8fafc?text=Interstellar',
    subscriptions: [],
  },
];
