import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: Number,
      required: true,
      trim: true,
    },
  },
);

export default mongoose.model('User', userSchema);
