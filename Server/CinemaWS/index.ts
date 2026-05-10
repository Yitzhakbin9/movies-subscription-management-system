import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from '../configs/db';
import usersRouter from './routers/usersRouter';
import permissionsRouter from './routers/permissionsRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CinemaWS API is running' });
});


app.use('/users', usersRouter);
app.use('/permissions', permissionsRouter);

app.listen(PORT, () => {
  console.log(`CinemaWS API is listening at http://localhost:${PORT}`);
  connectDB(mongoose);
});
