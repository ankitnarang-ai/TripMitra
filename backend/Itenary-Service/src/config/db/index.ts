// src/lib/mongoose.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

const defaultOptions: mongoose.ConnectOptions = {
  // recommended options (some are defaults in newer drivers)
  maxPoolSize: process.env.NODE_ENV === 'production' ? 50 : 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // useUnifiedTopology and useNewUrlParser are default in mongoose >=6,
  // but leaving them out is fine. TypeScript will ignore unknown props.
};

export async function connectMongoose(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(MONGO_URI, defaultOptions);
    console.log('🟢 Mongoose connected');
    mongoose.set('strictQuery', false); // adjust as needed
    return mongoose;
  } catch (err) {
    console.error('🔴 Mongoose connection error:', err);
    throw err;
  }
}

// graceful shutdown helpers
export function closeMongoose() {
  return mongoose.connection.close();
}

// optional helper: get default connection
export const mongooseConnection = mongoose.connection;
