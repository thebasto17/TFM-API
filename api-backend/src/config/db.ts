import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};