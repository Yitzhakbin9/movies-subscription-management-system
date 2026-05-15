import type { ManageMovie } from '../types/manageMovie';

interface MovieListItemProps {
  movie: ManageMovie;
  onDelete: (movieId: string) => void;
  onEdit: (movieId: string) => void;
}

const movieFieldLabels = [
  { label: 'Name', valueKey: 'name' },
] as const;

function getMovieYear(premieredAt: string) {
  return new Date(premieredAt).getFullYear();
}

function MovieListItem({ movie, onDelete, onEdit }: MovieListItemProps) {
  return (
    <article className="movie-list-item">
      <div className="movie-list-item-details">
        <div className="movie-poster-wrapper">
          <img
            className="movie-poster"
            src={movie.imageUrl}
            alt={`${movie.name} poster`}
          />
        </div>

        <div className="movie-main-details">
          {movieFieldLabels.map((field) => (
            <div className="user-detail" key={field.label}>
              <span className="user-detail-label">{field.label}</span>
              <span className="user-detail-value">{String(movie[field.valueKey])}</span>
            </div>
          ))}

          <div className="user-detail">
            <span className="user-detail-label">Year</span>
            <span className="user-detail-value">
              {String(getMovieYear(movie.premieredAt))}
            </span>
          </div>

          <div className="user-detail">
            <span className="user-detail-label">Premiered At</span>
            <span className="user-detail-value">{movie.premieredAt}</span>
          </div>

          <div className="user-detail movie-detail-wide">
            <span className="user-detail-label">Genres</span>
            <div className="movie-genres-list">
              {movie.genres.map((genre) => (
                <span className="movie-genre-badge" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="user-detail movie-detail-wide">
            <span className="user-detail-label">Subscriptions Watched</span>
            {movie.subscriptions.length > 0 ? (
              <div className="movie-subscriptions-list">
                {movie.subscriptions.map((subscription) => (
                  <span className="movie-subscription-badge" key={subscription.id}>
                    {subscription.memberName} ({subscription.watchedYear})
                  </span>
                ))}
              </div>
            ) : (
              <span className="user-detail-value">
                No subscriptions watched this movie yet
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="user-list-item-actions">
        <button
          className="button-secondary user-action-button"
          type="button"
          onClick={() => onEdit(movie.id)}
        >
          Edit
        </button>
        <button
          className="button-primary user-action-button"
          type="button"
          onClick={() => onDelete(movie.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default MovieListItem;
