import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comic" }],

    // Social graph
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Role flag
    isCreator: { type: Boolean, default: false },

    // Optional: creator-specific metadata
    followersCount: { type: Number, default: 0 },
    imageId: Number,
    bio: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema, "User");
