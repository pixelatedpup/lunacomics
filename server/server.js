import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import comicRoutes from "./routes/comic.js";

dotenv.config();
const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173", "https://lunacomics-client.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ MongoDB connection caching (important for serverless)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ✅ Connect once per cold start (not every request)
await connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comics", comicRoutes);

// ✅ Root route
app.get("/", (req, res) => res.json({ ok: true }));

export default app;
