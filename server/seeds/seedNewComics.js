import mongoose from "mongoose";
import dotenv from "dotenv";
import Comic from "../models/Comics.js";
import Genre from "../models/Genre.js";
import Tag from "../models/Tag.js";
import Creator from "../models/Creator.js";
import { allComics } from "../assets/AllComics.js";
import { allAuthors } from "../assets/AllAuthors.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");
  try {
    // 1. Remove old data
    await Comic.deleteMany({});
    await Genre.deleteMany({});
    await Tag.deleteMany({});
    await Creator.deleteMany({});
    console.log("Existing data deleted");
    console.log("Existing Creators deleted");

    // 2. Insert Genres and Tags first
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



     
     

     const creators = await Creator.insertMany(allAuthors);
     console.log("New authors added", allAuthors);


    // 3. Create lookup maps
    const genreMap = {};
    genres.forEach((g) => (genreMap[g.name] = g._id));

    const tagMap = {};
    tags.forEach((t) => (tagMap[t.name] = t._id));

    const creatorMap = {};
    creators.forEach((c) => (creatorMap[c.username] = c._id));

    // 4. Transform allComics with ObjectIds
    const comicsWithIds = allComics.map((comic) => ({
      ...comic,
      genre: [genreMap[comic.genre]], // turn "Comedy" → ObjectId
      tag: [tagMap[comic.tag]],       // turn "New" → ObjectId
      author: [creatorMap[comic.author]]
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
