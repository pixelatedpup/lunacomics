import mongoose from "mongoose";
import dotenv from "dotenv";
import Genre from "../models/Genre.js";
import {allGenres} from "../assets/AllGenres.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(async ()=>{
    console.log("MongoDB database connected successfully");
    console.log("Current Database: ",mongoose.connection.name)
    try{
        await Genre.deleteMany({});
        console.log("All previous data delered successfuly");

        await Genre.insertMany(allGenres);
        console.log("Inserted all genres into the Genre collection");

        const count = await Genre.countDocuments();
        console.log("There are: ", count , "documents")

        process.exit(0);
    }
    catch(err){
        console.error("There were some errors handling the insert, delete, and count processes", err);
        process.exit(1);
    }
})
.catch( err => {
    console.error("Unable to connect to MongoDB databse", err);
    process.exit(1);
})