import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from '../configs/db';
import membersRouter from './routers/membersRouter';
import moviesRouter from './routers/moviesRouter';
import subscriptionsRouter from './routers/subscriptionsRouter';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'SubscriptionWS API is running' });
});

app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/subscriptions', subscriptionsRouter);

app.listen(PORT, () => {
  console.log(`SubscriptionWS API is listening at http://localhost:${PORT}`);
  connectDB(mongoose);
});
