// lib/db.js
import mongoose from "mongoose";

let isConnected = false;
let connectionPromise = null;

export const connectDB = async () => {
  if (isConnected) return;

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ Missing MONGO_URI in environment variables");
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 1, // good for serverless
    })
    .then(() => {
      isConnected = true;
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      connectionPromise = null;
      throw err;
    });

  await connectionPromise;
};
