import mongoose from "mongoose";

const ComicSchema = new mongoose.Schema ({
    title: {type:String, required: true},
    img: String,
    author: Number,
    volume: Number,
    tag: String,
    description: String,
    genre:[{type: mongoose.Schema.Types.ObjectId, ref: "Genre"}],
    imageId: Number,
    tag:[{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
})

const Comic = mongoose.model("Comic", ComicSchema, "Comic");
export default Comic;