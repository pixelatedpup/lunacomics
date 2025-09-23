import mongoose from "mongoose";
import Comic from "./models/Comics.js";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const comics = await Comic.find({});
  console.log("Found comics:", comics.length);
  console.log("First comic:", comics[0]);

  process.exit(0);
};

run();
