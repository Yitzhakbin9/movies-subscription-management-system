import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
    },
    City: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Members',
  }
);

export default mongoose.model('Member', memberSchema);
