import mongoose from "mongoose";
import dotenv from "dotenv";
import Tag from "../models/Tag.js";
import {allTags} from "../assets/AllTags.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(async ()=>{
    console.log("MongoDB database connected successfully");
    console.log("Current Database: ",mongoose.connection.name)
    try{
        await Tag.deleteMany({});
        console.log("All previous data delered successfuly");

        await Tag.insertMany(allTags);
        console.log("Inserted all Tags into the Tag collection");

        const count = await Tag.countDocuments();
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