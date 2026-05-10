type MongooseLike = {
  connect: (uri: string) => Promise<unknown>;
};

const connectDB = async (mongoose: MongooseLike): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cinema_ws';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    }
  }
};

export default connectDB;
