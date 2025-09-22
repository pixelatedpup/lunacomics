import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js"
import comicRoutes from "./routes/comic.js"

dotenv.config();
const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comics", comicRoutes)

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(8000, () => console.log("🚀 Server running on http://localhost:8000"));
  })
  .catch(err => console.error("❌ MongoDB error:", err));
