import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Genres: {
      type: [String],
      required: true,
      default: [],
    },
    Image: {
      type: String,
      required: true,
      trim: true,
    },
    Premiered: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Movies',
  }
);

export default mongoose.model('Movie', movieSchema);
