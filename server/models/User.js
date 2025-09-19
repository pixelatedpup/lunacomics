import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // fixed typo
    password: { type: String, required: true },
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comic" }],
    isCreator: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema, "User");
