import mongoose from 'mongoose';

const watchedMovieSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    MemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    Movies: {
      type: [watchedMovieSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'Subscriptions',
  }
);

export default mongoose.model('Subscription', subscriptionSchema);
