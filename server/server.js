import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import comicRoutes from "./routes/comic.js";
import { connectDB } from "./lib/db.js";

const app = express();

// ✅ Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://lunacomics-client.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comics", comicRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

export default app;
