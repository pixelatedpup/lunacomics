// seedPosts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { allPosts } from "../assets/AllPosts.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB Connected");
  try {
    // 1. Clear existing posts
    await Post.deleteMany({});
    console.log("Existing posts deleted");

    // 2. Find all users to map string usernames → ObjectIds
    const users = await User.find({});
    const userMap = {};
    users.forEach((u) => (userMap[u.username] = u._id));

    // 3. Transform dummy data into schema-ready docs
    const postsWithIds = allPosts.map((p) => ({
      ...p,
      likes: p.likes.map((username) => userMap[username]).filter(Boolean),
      comments: p.comment.map((c) => ({
        user: userMap[c.user],
        message: c.message,
        createdAt: new Date(), // make sure it’s a date
      })),
      poster: userMap[p.poster],
      images: [p.imageId], // adapt to match PostSchema
      isUpdate: p.isUpdate === "true" // convert string → boolean
    }));

    // 4. Insert posts
    await Post.insertMany(postsWithIds);
    console.log("Dummy posts inserted successfully");

    const count = await Post.countDocuments();
    console.log("Total posts in DB:", count);

    process.exit(0);
  } catch (err) {
    console.error("Error inserting posts:", err);
    process.exit(1);
  }
});
