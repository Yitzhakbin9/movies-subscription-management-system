import MovieListItem from './MovieListItem';
import type { ManageMovie } from '../types/manageMovie';

interface MoviesListProps {
  movies: ManageMovie[];
  onDeleteMovie: (movieId: string) => void;
  onEditMovie: (movieId: string) => void;
  emptyMessage?: string;
}

function MoviesList({
  movies,
  onDeleteMovie,
  onEditMovie,
  emptyMessage = 'There are no movies to show right now.',
}: MoviesListProps) {
  if (movies.length === 0) {
    return (
      <div className="manage-users-empty-state">
        <p className="manage-users-section-text">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <section className="users-list" aria-label="Movies list">
      {movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          onDelete={onDeleteMovie}
          onEdit={onEditMovie}
        />
      ))}
    </section>
  );
}

export default MoviesList;
