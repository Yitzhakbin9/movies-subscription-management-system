import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { mockMovies } from '../data/mockMovies';
import type { MoviesOutletContext } from '../hooks/useMoviesOutletContext';
import type { ManageMovie } from '../types/manageMovie';
import '../css/ManageUsersPage.css';

function MoviesPage() {
  const [movies, setMovies] = useState<ManageMovie[]>(mockMovies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleAddMovie = (newMovie: ManageMovie) => {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
  };

  const handleDeleteMovie = (movieId: string) => {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== movieId)
    );
  };

  const handleUpdateMovie = (updatedMovie: ManageMovie) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const outletContext: MoviesOutletContext = {
    movies,
    filteredMovies,
    searchTerm,
    setSearchTerm,
    addMovie: handleAddMovie,
    deleteMovie: handleDeleteMovie,
    updateMovie: handleUpdateMovie,
  };

  return (
    <section className="manage-users-panel">
      <h2 className="manage-users-title">Movies</h2>
      <p className="page-description">
        Choose a section from the menu to view all movies or move to the Add
        Movie page.
      </p>

      <nav className="manage-users-menu" aria-label="Movies sections">
        <NavLink
          end
          className={({ isActive }) =>
            `button-link manage-users-tab ${
              isActive ? 'manage-users-tab-active' : 'manage-users-tab-idle'
            }`
          }
          to="."
        >
          All Movies
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `button-link manage-users-tab ${
              isActive ? 'manage-users-tab-active' : 'manage-users-tab-idle'
            }`
          }
          to="add-movie"
        >
          Add Movie
        </NavLink>
      </nav>

      <label className="field manage-movie-search">
        <span className="field-label">Search Movie By Name</span>
        <input
          type="text"
          name="searchMovie"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Type a movie name"
        />
      </label>

      <Outlet context={outletContext} />
    </section>
  );
}

export default MoviesPage;
