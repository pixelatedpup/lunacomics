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
    "https://lunacomics-client.vercel.app"
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
    if (!process.env.MONGO_URI) {
      console.error("❌ Missing MONGO_URI environment variable!");
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
}


// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/api/debug", async (req, res) => {
  try {
    console.log("DEBUG: checking DB...");
    await connectDB();
    console.log("✅ DEBUG: DB connected");
    res.json({ ok: true, mongoUri: !!process.env.MONGO_URI });
  } catch (err) {
    console.error("❌ DEBUG error:", err);
    res.status(500).json({ error: err.message });
  }
});


// Export for Vercel
export default app;
