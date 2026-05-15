import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MOVIE_GENRE_OPTIONS,
  type MovieGenre,
} from '../constants/movieGenres';
import { useMoviesOutletContext } from '../hooks/useMoviesOutletContext';
import type { ManageMovie } from '../types/manageMovie';

interface EditMovieFormState {
  name: string;
  genres: MovieGenre[];
  imageUrl: string;
  premieredAt: string;
}

function normalizeGenres(genres: MovieGenre[]) {
  const uniqueGenres = new Set(genres);

  return MOVIE_GENRE_OPTIONS.filter((genre) => uniqueGenres.has(genre));
}

function createFormState(movie: ManageMovie): EditMovieFormState {
  return {
    name: movie.name,
    genres: normalizeGenres(movie.genres),
    imageUrl: movie.imageUrl,
    premieredAt: movie.premieredAt,
  };
}

function MoviesEditMovieView() {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const { movies, updateMovie } = useMoviesOutletContext();
  const movie = movies.find((currentMovie) => currentMovie.id === movieId);
  const [formData, setFormData] = useState<EditMovieFormState | null>(() =>
    movie ? createFormState(movie) : null
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!movie) {
      return;
    }

    setFormData(createFormState(movie));
  }, [movie]);

  const handleCancel = () => {
    navigate('/main/movies');
  };

  const handleFieldChange = (
    field: keyof Omit<EditMovieFormState, 'genres'>,
    value: string
  ) => {
    setFormData((currentFormData) =>
      currentFormData ? { ...currentFormData, [field]: value } : currentFormData
    );

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleGenresChange = (selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
    const nextGenres = Array.from(selectedOptions)
      .filter((option) => option.selected)
      .map((option) => option.value as MovieGenre);

    setFormData((currentFormData) =>
      currentFormData
        ? { ...currentFormData, genres: normalizeGenres(nextGenres) }
        : currentFormData
    );

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!movie || !formData) {
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedImageUrl = formData.imageUrl.trim();

    if (
      !trimmedName ||
      formData.genres.length === 0 ||
      !trimmedImageUrl ||
      !formData.premieredAt
    ) {
      setErrorMessage('Please fill in all fields before saving the movie.');
      return;
    }

    const movieNameTaken = movies.some(
      (currentMovie) =>
        currentMovie.id !== movie.id &&
        currentMovie.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (movieNameTaken) {
      setErrorMessage('That movie name already exists. Please choose another one.');
      return;
    }

    updateMovie({
      ...movie,
      name: trimmedName,
      genres: formData.genres,
      imageUrl: trimmedImageUrl,
      premieredAt: formData.premieredAt,
    });

    navigate('/main/movies');
  };

  if (!movie) {
    return (
      <section className="manage-users-view">
        <div className="manage-users-card">
          <h2 className="manage-users-section-title">Edit Movie</h2>
          <p className="manage-users-section-text">
            The selected movie could not be found.
          </p>
          <button
            className="button-secondary"
            type="button"
            onClick={handleCancel}
          >
            Back to All Movies
          </button>
        </div>
      </section>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Edit Movie</h2>
        <p className="manage-users-section-text">
          Update the selected movie details, then return to All Movies.
        </p>

        {errorMessage ? <p className="manage-users-status">{errorMessage}</p> : null}

        <form className="manage-user-form" onSubmit={handleSubmit}>
          <div className="manage-user-form-grid">
            <label className="field">
              <span className="field-label">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">Premiered At</span>
              <input
                type="date"
                name="premieredAt"
                value={formData.premieredAt}
                onChange={(event) =>
                  handleFieldChange('premieredAt', event.target.value)
                }
              />
            </label>

            <label className="field">
              <span className="field-label">Image</span>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={(event) =>
                  handleFieldChange('imageUrl', event.target.value)
                }
                placeholder="Paste a movie poster URL"
              />
            </label>

            <label className="field">
              <span className="field-label">Genres</span>
              <select
                multiple
                className="manage-movie-genre-select"
                name="genres"
                value={formData.genres}
                onChange={(event) => handleGenresChange(event.target.options)}
              >
                {MOVIE_GENRE_OPTIONS.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <span className="manage-movie-helper-text">
                You can choose more than one genre here. Hold `Command` on Mac
                or `Ctrl` on Windows while selecting.
              </span>
            </label>
          </div>

          {formData.imageUrl ? (
            <section className="manage-movie-preview" aria-label="Movie image preview">
              <h3 className="manage-user-permissions-title">Image Preview</h3>
              <img
                className="manage-movie-preview-image"
                src={formData.imageUrl}
                alt={`${formData.name || movie.name} preview`}
              />
            </section>
          ) : null}

          <section
            className="manage-user-permissions"
            aria-labelledby="movie-subscriptions-title"
          >
            <h3
              className="manage-user-permissions-title"
              id="movie-subscriptions-title"
            >
              Subscriptions Watched
            </h3>
            {movie.subscriptions.length > 0 ? (
              <div className="movie-subscriptions-list">
                {movie.subscriptions.map((subscription) => (
                  <span className="movie-subscription-badge" key={subscription.id}>
                    {subscription.memberName} ({subscription.watchedYear})
                  </span>
                ))}
              </div>
            ) : (
              <p className="manage-user-permissions-text">
                No subscriptions watched this movie yet.
              </p>
            )}
          </section>

          <div className="manage-user-actions">
            <button className="button-primary" type="submit">
              Update
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MoviesEditMovieView;
