import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
    genre: String
})

const Genre = mongoose.model("Genre", GenreSchema,"Genre");
export default Genre;