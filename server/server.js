import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

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

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(8000, () => console.log("🚀 Server running on http://localhost:8000"));
  })
  .catch(err => console.error("❌ MongoDB error:", err));
