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

// ✅ Connect to MongoDB BEFORE starting the server
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop the server if DB fails
  }
}

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comics", comicRoutes);

// ✅ Root route
app.get("/", (req, res) => res.json({ ok: true }));

// ✅ Initialize DB and then export app
await connectDB();
export default app;
