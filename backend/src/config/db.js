import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmdirect';
  mongoose.set('bufferCommands', false);

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at "${mongoUri}": ${error.message}`);
    console.warn(`[Database Warning] The API will start and handle requests. Ensure MongoDB is running locally or supply a valid MONGO_URI in backend/.env for database persistence.`);
    return null;
  }
};

export default connectDB;

