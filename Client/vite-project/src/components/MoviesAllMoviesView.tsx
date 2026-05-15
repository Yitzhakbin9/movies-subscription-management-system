import { useNavigate } from 'react-router-dom';
import { useMoviesOutletContext } from '../hooks/useMoviesOutletContext';
import MoviesList from './MoviesList';

function MoviesAllMoviesView() {
  const navigate = useNavigate();
  const { filteredMovies, searchTerm, deleteMovie } = useMoviesOutletContext();

  const handleDeleteMovie = (movieId: string) => {
    deleteMovie(movieId);
  };

  const handleEditMovie = (movieId: string) => {
    navigate(`/main/movies/edit/${movieId}`);
  };

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">All Movies</h2>
        <p className="manage-users-section-text">
          This area shows all movies together with their image, details, and
          the subscriptions that watched them.
        </p>

        {searchTerm.trim() ? (
          <p className="manage-users-section-text">
            Showing results for "{searchTerm.trim()}".
          </p>
        ) : null}

        <MoviesList
          movies={filteredMovies}
          onDeleteMovie={handleDeleteMovie}
          onEditMovie={handleEditMovie}
          emptyMessage={
            searchTerm.trim()
              ? `No movies matched "${searchTerm.trim()}".`
              : 'There are no movies to show right now.'
          }
        />
      </div>
    </section>
  );
}

export default MoviesAllMoviesView;
