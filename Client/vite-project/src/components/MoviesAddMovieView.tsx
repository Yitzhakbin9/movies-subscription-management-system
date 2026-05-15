import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MOVIE_GENRE_OPTIONS,
  type MovieGenre,
} from '../constants/movieGenres';
import { useMoviesOutletContext } from '../hooks/useMoviesOutletContext';

interface AddMovieFormState {
  name: string;
  genres: MovieGenre[];
  imageUrl: string;
  premieredAt: string;
}

const initialFormState: AddMovieFormState = {
  name: '',
  genres: [],
  imageUrl: '',
  premieredAt: '',
};

function createMovieId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `movie-${Date.now()}`;
}

function MoviesAddMovieView() {
  const navigate = useNavigate();
  const { movies, addMovie } = useMoviesOutletContext();
  const [formData, setFormData] = useState<AddMovieFormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCancel = () => {
    navigate('/main/movies');
  };

  const handleFieldChange = (
    field: keyof Omit<AddMovieFormState, 'genres'>,
    value: string
  ) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleGenresChange = (selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
    const nextGenres = Array.from(selectedOptions)
      .filter((option) => option.selected)
      .map((option) => option.value as MovieGenre);

    setFormData((currentFormData) => ({
      ...currentFormData,
      genres: nextGenres,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      (movie) => movie.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (movieNameTaken) {
      setErrorMessage('That movie name already exists. Please choose another one.');
      return;
    }

    addMovie({
      id: createMovieId(),
      name: trimmedName,
      genres: formData.genres,
      imageUrl: trimmedImageUrl,
      premieredAt: formData.premieredAt,
      subscriptions: [],
    });

    navigate('/main/movies');
  };

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Add Movie</h2>
        <p className="manage-users-section-text">
          Add a new movie with its main details so it can appear in the movies
          list.
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
                alt={`${formData.name || 'New movie'} preview`}
              />
            </section>
          ) : null}

          <div className="manage-user-actions">
            <button className="button-primary" type="submit">
              Save
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

export default MoviesAddMovieView;
