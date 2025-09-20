import mongoose from "mongoose";
import dotenv from "dotenv";
import Comic from "./models/Comics.js";
import {allComics} from "./assets/AllComics.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => { 
    console.log("MongoDB Connected");
    console.log("Using database:", mongoose.connection.name);

    try{
        //Remove current data in database
        await Comic.deleteMany({});
        console.log("Existing comic deleted");

        //Insert  dummy data
        await Comic.insertMany(allComics);
        console.log("Dummy comics inserted successfully");

        const count = await Comic.countDocuments();
        console.log("Total comics in DB:", count);


        process.exit(0);
    }catch(err){
        console.error("Error inserting comics:", err);
        process.exit(1);
    }
})
.catch(err => {
    console.error("MongoDB connection error: ", err)
    process.exit(1)
});