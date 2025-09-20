import mongoose from "mongoose";

const ComicSchema = new mongoose.Schema ({
    title: {type:String, required: true},
    img: String,
    link: String,
    author: Number,
    volume: Number,
    tag: String,
    description: String,
    imageId: Number,
    status:String,
})

const Comic = mongoose.model("Comic", ComicSchema, "Comic");
export default Comic;