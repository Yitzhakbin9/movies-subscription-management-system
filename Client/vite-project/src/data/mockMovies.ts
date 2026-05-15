import type { ManageMovie } from '../types/manageMovie';

export const mockMovies: ManageMovie[] = [
  {
    id: 'movie-1',
    name: 'The Matrix',
    genres: ['Action', 'Sci-Fi'],
    imageUrl:
      'https://placehold.co/280x400/0f172a/f8fafc?text=The+Matrix',
    premieredAt: '1999-03-31',
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
    genres: ['Action', 'Mystery', 'Sci-Fi'],
    imageUrl:
      'https://placehold.co/280x400/1e293b/f8fafc?text=Inception',
    premieredAt: '2010-07-16',
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
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    imageUrl:
      'https://placehold.co/280x400/172554/f8fafc?text=Interstellar',
    premieredAt: '2014-11-07',
    subscriptions: [],
  },
];
