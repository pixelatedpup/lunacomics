import mongoose from "mongoose";
import dotenv from "dotenv";
import Comic from "../models/Comics.js";
import Genre from "../models/Genre.js";
import Tag from "../models/Tag.js";
import { allComics } from "../assets/AllComics.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");
  try {
    // 1. Remove old data
    await Comic.deleteMany({});
    await Genre.deleteMany({});
    await Tag.deleteMany({});
    console.log("Existing data deleted");

    // 2. Insert Genres and Tags first
    const genres = await Genre.insertMany([
      { genre: "Comedy" },
      { genre: "Action" },
      { genre: "Drama" },
      { genre: "Sci-Fi" },
      { genre: "Fantasy" },
    ]);

    const tags = await Tag.insertMany([
      { name: "New" },
      { name: "Hot" },
      { name: "Top" },
    ]);

    // 3. Create lookup maps
    const genreMap = {};
    genres.forEach((g) => (genreMap[g.genre] = g._id));

    const tagMap = {};
    tags.forEach((t) => (tagMap[t.tag] = t._id));

    // 4. Transform allComics with ObjectIds
    const comicsWithIds = allComics.map((comic) => ({
      ...comic,
      genre: [genreMap[comic.genre]], // turn "Comedy" → ObjectId
      tag: [tagMap[comic.tag]],       // turn "New" → ObjectId
    }));

    // 5. Insert Comics
    await Comic.insertMany(comicsWithIds);
    console.log("Dummy comics inserted successfully");

    const count = await Comic.countDocuments();
    console.log("Total comics in DB:", count);

    process.exit(0);
  } catch (err) {
    console.error("Error inserting comics:", err);
    process.exit(1);
  }
});
