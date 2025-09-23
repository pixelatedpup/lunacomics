// models/Tag.js
import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: true
}, // e.g., "New", "Top", "Hot"
});


const Tag = mongoose.model("Tag", TagSchema, "Tag");
export default Tag;
