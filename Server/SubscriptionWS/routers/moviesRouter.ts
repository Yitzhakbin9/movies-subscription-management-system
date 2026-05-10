import express, { Request, Response } from 'express';
import { MovieData } from '../models/movieInterface';
import * as movieService from '../services/movieService';
import ApiError from '../utils/apiError';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies(
      req.query as Record<string, string | undefined>
    );
    res.json(movies);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.post('/sync', async (_req: Request, res: Response) => {
  try {
    const result = await movieService.syncMovies();
    res.json(result);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const movieId = String(req.params.id);
    const movie = await movieService.getMovieById(movieId);
    res.json(movie);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const movie = await movieService.createMovie(req.body as MovieData);
    res.status(201).json(movie);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const movieId = String(req.params.id);
    const movie = await movieService.updateMovie(
      movieId,
      req.body as Partial<MovieData>
    );

    res.json(movie);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const movieId = String(req.params.id);
    const movie = await movieService.replaceMovie(
      movieId,
      req.body as MovieData
    );

    res.json(movie);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const movieId = String(req.params.id);
    const movie = await movieService.deleteMovie(movieId);
    res.json(movie);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

export default router;
