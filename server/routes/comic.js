import express from "express";
import Comic from "../models/Comics.js";
import Tag from "../models/Tag.js";
import Genre from "../models/Genre.js";
import Creator from "../models/Creator.js";
import { connectDB } from "../lib/db.js"; // ✅ import this

const router = express.Router();

// ✅ Fetch all comics
router.get("/", async (req, res) => {
  try {
    await connectDB(); // ensure MongoDB is connected before querying

    console.log("📚 [GET] /api/comics – fetching comics...");
    const comics = await Comic.find({})
      .populate("tag")
      .populate("genre")
      .populate("author");

    console.log("✅ [GET] /api/comics – found:", comics.length);
    res.json(comics);
  } catch (err) {
    console.error("❌ [GET] /api/comics error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch comics by tag name
router.get("/by-tag/:tagName", async (req, res) => {
  try {
    await connectDB(); // ✅ ensure DB connected here too

    const tag = await Tag.findOne({ name: req.params.tagName });
    if (!tag) return res.status(404).json({ error: "Tag not found" });

    const comics = await Comic.find({ tag: tag._id })
      .populate("tag")
      .populate("genre");

    res.json(comics);
  } catch (err) {
    console.error("❌ Fetch by tag error:", err);
    res.status(500).json({ error: "Failed to fetch by tag" });
  }
});

export default router;
