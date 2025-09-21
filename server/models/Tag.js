// models/Tag.js
import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: true
}, // e.g., "New", "Top", "Hot"
});

export default mongoose.model("Tag", TagSchema, "Tag");
