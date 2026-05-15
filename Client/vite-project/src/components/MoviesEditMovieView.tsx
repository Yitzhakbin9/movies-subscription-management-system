import { useParams } from 'react-router-dom';
import { useMoviesOutletContext } from '../hooks/useMoviesOutletContext';

function MoviesEditMovieView() {
  const { movieId } = useParams();
  const { movies } = useMoviesOutletContext();
  const movie = movies.find((currentMovie) => currentMovie.id === movieId);

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Edit Movie</h2>
        <p className="manage-users-section-text">
          {movie
            ? `This page will hold the edit form for ${movie.name}.`
            : 'We could not find the selected movie.'}
        </p>
      </div>
    </section>
  );
}

export default MoviesEditMovieView;
