import mongoose from "mongoose";
import dotenv from "dotenv";
import Creator from "../models/Creator.js";
import {allAuthors} from "../assets/AllAuthors.js";

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB connected");
    console.log("Using", mongoose.connection.name);

    try{
        await Creator.deleteMany({});
        console.log("Existing Creators deleted");

        await Creator.insertMany(allAuthors);
        console.log("New creators have been inserted");

        const count = await Creator.countDocuments();
        console.log("Total Creators in the Database: ", count);

        process.exit(0);

    }
    catch(err){
        console.error("Unable to insert, delete and count comics", err)
        process.exit(1);
    }

}
)
.catch(err => {
    console.error("MongoDB Connection error", err);
    process.exit(1);
})