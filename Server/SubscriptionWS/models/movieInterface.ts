export interface MovieData {
  Name: string;
  Genres: string[];
  Image: string;
  Premiered: Date;
}

export type PartialMovieData = Partial<MovieData>;
