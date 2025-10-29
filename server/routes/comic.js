import express from "express";
import Comic from "../models/Comics.js";
import Tag from "../models/Tag.js"
import Genre from "../models/Genre.js"
import Creator from "../models/Creator.js"

const router = express.Router();

//Need to be "/" as it is already being mounted in "server.js" as "/api/comics"
router.get("/", async (req, res) => {
  try {
    console.log("📚 [GET] /api/comics – fetching comics...");
    const comics = await Comic.find({})
      .populate("tag")
      .populate("genre")
      .populate("author");
    
    console.log("✅ [GET] /api/comics – found:", comics.length);
    res.json(comics);
  } catch (err) {
    console.error("❌ [GET] /api/comics error:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/by-tag/:tagName", async (req,res) => {
    try{
        const tag = await Tag.findOne({name:req.params.tagName});
        if (!tag) return res.status(404).json({error: "Tag not found"});

        const comics = await Comic.find({tag: tag._id})
        .populate("tag")
        .populate("genre");

        res.json(comics);
    }catch(err){
        console.error("Fetch by tag error:", err);
        res.status(500).json({error: "Failed to fetch by tag"})
    }
});



export default router;

