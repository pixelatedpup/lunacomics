// server/seeds/seedNewComics.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // <-- you forgot this import
import Comic from "../models/Comics.js";
import Genre from "../models/Genre.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import { allComics } from "../assets/AllComics.js";
import { allAuthors } from "../assets/AllAuthors.js";

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI).then(async () => {
  console.log("🌱 MongoDB Connected");

  try {
    // 1. Remove old data (except users)
    await Comic.deleteMany({});
    await Genre.deleteMany({});
    await Tag.deleteMany({});
    console.log("🧹 Old comics, genres, and tags deleted");

    // 2. Insert Genres & Tags
    const genres = await Genre.insertMany([
      { name: "Comedy" },
      { name: "Action" },
      { name: "Drama" },
      { name: "Sci-Fi" },
      { name: "Fantasy" },
    ]);

    const tags = await Tag.insertMany([
      { name: "New" },
      { name: "Hot" },
      { name: "Top" },
    ]);

    console.log("✅ Genres and tags seeded");

    // 3. Load all users (already existing creators/users)
    const users = await User.find({}).select("_id username");
    console.log(`👥 Found ${users.length} users`);

    // Create username → ObjectId map
    const userMap = {};
    users.forEach((u) => (userMap[u.username] = u._id));

    // 4. Build genre and tag maps
    const genreMap = {};
    genres.forEach((g) => (genreMap[g.name] = g._id));

    const tagMap = {};
    tags.forEach((t) => (tagMap[t.name] = t._id));

    // 5. Transform allComics
    const comicsWithIds = allComics.map((comic) => {
      const authorId = userMap[comic.author];
      if (!authorId) {
        console.warn(`⚠️ No matching user found for author: ${comic.author}`);
      }
      return {
        ...comic,
        genre: [genreMap[comic.genre]],
        tag: [tagMap[comic.tag]],
        author: authorId ? [authorId] : [], // empty array if user not found
      };
    });

    // 6. Insert Comics
    await Comic.insertMany(comicsWithIds);
    console.log("🎉 Comics seeded successfully");

    const count = await Comic.countDocuments();
    console.log(`📚 Total comics in DB: ${count}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting comics:", err);
    process.exit(1);
  }
});
