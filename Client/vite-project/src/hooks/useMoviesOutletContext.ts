import { useOutletContext } from 'react-router-dom';
import type { ManageMovie } from '../types/manageMovie';

export interface MoviesOutletContext {
  movies: ManageMovie[];
  filteredMovies: ManageMovie[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  addMovie: (newMovie: ManageMovie) => void;
  deleteMovie: (movieId: string) => void;
  updateMovie: (updatedMovie: ManageMovie) => void;
}

export function useMoviesOutletContext() {
  return useOutletContext<MoviesOutletContext>();
}
