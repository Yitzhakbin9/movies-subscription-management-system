import axios from 'axios';
import { MovieData, PartialMovieData } from '../models/movieInterface';
import * as movieRepository from '../repositories/movieRepository';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import ApiError from '../utils/apiError';
import validateObjectId from '../utils/validateObjectId';

type ExternalMovie = {
  name: string;
  genres: string[];
  image?: {
    medium?: string;
    original?: string;
  } | null;
  premiered?: string | null;
};

const MOVIES_WS_URL = 'https://api.tvmaze.com/shows';

const getAllMovies = (filter: Record<string, unknown> = {}) =>
  movieRepository.getAllMovies(filter);

const getMovieById = async (id: string) => {
  validateObjectId(id, 'Movie id');
  const movie = await movieRepository.getMovieById(id);

  if (!movie) {
    throw new ApiError('Movie not found', 404);
  }

  return movie;
};

const createMovie = (movieData: MovieData) =>
  movieRepository.createMovie(movieData);

const updateMovie = async (id: string, movieData: PartialMovieData) => {
  validateObjectId(id, 'Movie id');
  const movie = await movieRepository.updateMovie(id, movieData);

  if (!movie) {
    throw new ApiError('Movie not found', 404);
  }

  return movie;
};

const replaceMovie = async (id: string, movieData: MovieData) => {
  validateObjectId(id, 'Movie id');
  const movie = await movieRepository.replaceMovie(id, movieData);

  if (!movie) {
    throw new ApiError('Movie not found', 404);
  }

  return movie;
};

const deleteMovie = async (id: string) => {
  validateObjectId(id, 'Movie id');

  // Prevent deleting a movie that is still referenced by subscriptions.
  const hasSubscriptions = await subscriptionRepository.hasSubscriptionForMovie(id);

  if (hasSubscriptions) {
    throw new ApiError('Cannot delete movie with existing subscriptions', 409);
  }

  const movie = await movieRepository.deleteMovie(id);

  if (!movie) {
    throw new ApiError('Movie not found', 404);
  }

  return movie;
};

// Pull movies from the external WS and upsert them into the local Movies collection.
const syncMovies = async () => {
  let response;

  try {
    response = await axios.get<ExternalMovie[]>(MOVIES_WS_URL);
  } catch (error) {
    throw new ApiError(`Failed to fetch movies from external WS: ${(error as Error).message}`, 502);
  }

  const syncedMovies = await Promise.all(
    response.data.map((movie) =>
      movieRepository.upsertMovieByNameAndPremiered({
        Name: movie.name,
        Genres: movie.genres || [],
        Image: movie.image?.original || movie.image?.medium || '',
        Premiered: movie.premiered ? new Date(movie.premiered) : new Date(0),
      })
    )
  );

  return {
    synced: syncedMovies.length,
    movies: syncedMovies,
  };
};

export {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  replaceMovie,
  deleteMovie,
  syncMovies,
};
