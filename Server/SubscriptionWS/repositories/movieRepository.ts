import Movie from '../models/movieModel';
import { MovieData, PartialMovieData } from '../models/movieInterface';

const getAllMovies = (filter = {}) => Movie.find(filter);

const getMovieById = (id: string) => Movie.findById(id);

const createMovie = (movieData: MovieData) => Movie.create(movieData);

const updateMovie = (id: string, movieData: PartialMovieData) =>
  Movie.findByIdAndUpdate(id, movieData, {
    new: true,
    runValidators: true,
  });

const replaceMovie = (id: string, movieData: MovieData) =>
  Movie.findOneAndReplace({ _id: id }, movieData, {
    new: true,
    runValidators: true,
  });

const upsertMovieByNameAndPremiered = (movieData: MovieData) =>
  Movie.findOneAndUpdate(
    { Name: movieData.Name, Premiered: movieData.Premiered },
    movieData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

const deleteMovie = (id: string) => Movie.findByIdAndDelete(id);

export {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  replaceMovie,
  upsertMovieByNameAndPremiered,
  deleteMovie,
};
