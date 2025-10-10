// server/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import comicRoutes from "./routes/comic.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://lunacomics.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comics", comicRoutes);

// MongoDB connection (connect once per cold start)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export for Vercel
export default app;
