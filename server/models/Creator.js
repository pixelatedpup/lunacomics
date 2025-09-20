import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        username: String,
        dateCreated: String,
        followersCount: Number,

    },
    {timestamps: true}
)

export default mongoose.model("Creator", CreatorSchema, "Creator");