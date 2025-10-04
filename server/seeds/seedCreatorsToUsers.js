// server/seeds/seedCreatorsToUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import { allAuthors } from "../assets/AllAuthors.js";

// ✅ Resolve .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

// ✅ Ensure MONGO_URI exists
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

async function seedCreatorsToUsers() {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ✅ STEP 1: Update existing users to have all new fields
    const users = await User.find({});
    console.log(`🔧 Updating ${users.length} existing users...`);

    for (const user of users) {
      let updated = false;

      if (user.followers === undefined) {
        user.followers = [];
        updated = true;
      }
      if (user.following === undefined) {
        user.following = [];
        updated = true;
      }
      if (user.followersCount === undefined) {
        user.followersCount = 0;
        updated = true;
      }
      if (user.imageId === undefined) {
        user.imageId = null;
        updated = true;
      }
      if (user.bio === undefined) {
        user.bio = "";
        updated = true;
      }
      if (user.isCreator === undefined) {
        user.isCreator = false;
        updated = true;
      }

      if (updated) {
        await user.save();
        console.log(`🧩 Updated user: ${user.username}`);
      }
    }

    // ✅ STEP 2: Seed new creator users
    console.log("🌟 Seeding new creators from allAuthors...");

    for (const author of allAuthors) {
      const existingUser = await User.findOne({ username: author.username });

      if (existingUser) {
        // User already exists — just ensure they're marked as a creator
        if (!existingUser.isCreator) {
          existingUser.isCreator = true;
          existingUser.followersCount = author.followersCount || 0;
          existingUser.imageId = author.imageId || null;
          await existingUser.save();
          console.log(`✨ Updated existing user as creator: ${author.username}`);
        } else {
          console.log(`⚠️  Skipping ${author.username} (already exists and is a creator)`);
        }
        continue;
      }

      // Create new creator
      const hashedPassword = await bcrypt.hash("helloKitty123", 10);

      const newUser = new User({
        name: author.name,
        username: author.username,
        password: hashedPassword,
        followersCount: author.followersCount || 0,
        imageId: author.imageId || null,
        isCreator: true,
        followers: [],
        following: [],
        bio: "",
      });

      await newUser.save();
      console.log(`✅ Created new creator: ${author.username}`);
    }

    console.log("🎉 All users updated and creators seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedCreatorsToUsers();
