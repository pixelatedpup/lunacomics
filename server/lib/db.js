// lib/db.js
import mongoose from "mongoose";

let isConnected = false; // prevent multiple connections in serverless

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ Missing MONGO_URI in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};
