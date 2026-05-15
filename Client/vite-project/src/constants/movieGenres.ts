export const MOVIE_GENRE_OPTIONS = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
] as const;

export type MovieGenre = (typeof MOVIE_GENRE_OPTIONS)[number];
