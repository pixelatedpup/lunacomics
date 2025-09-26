// In server/routes/user.js
import express from "express";
import User from "../models/User.js";
import verifyToken from "../middleware/verifyToken.js"; 
import Comic from "../models/Comics.js";
import Creator from "../models/Creator.js";

const router = express.Router();

// Get the currently logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Normalize field names
    res.json({
      id: user._id,
      username: user.username,
      isCreator: user.isCreator,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all authors
router.get("/creator", async(req,res) => {
    try{
        const creator = await Creator.find({});
        res.json(creator);
    }catch(err){
        console.error("Failed to get author details:",err);
        res.status(500).json({error: err.message});
    }
});

//Get specific authors info
router.get("/creator/:id", async(req,res) => {
    try{
        const creator = await Creator.findById(req.params.id);

        res.json(creator);
    }catch(err){
        console.error("Failed to get author details:");
        res.status(500).json({error: "Failed to get author"});
    }
});

// Your original route to get user by ID remains
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/library/:id", async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    .select("-password")
    .populate({
      path:"library",
      populate: [
        {path: "tag", select:"_id name"},
        {path:"genre", select:"_id name"}
      ]
    })
    if(!user){
      return res.status(404).json({error:"User not found"});
    }
    res.json(user.library);
    


  }catch(err){
    res.status(500).json({error: err.message});
    console.log("Failed to get library", err);
  }
})

//Adding comics to library 
router.post("/library/add", verifyToken, async (req,res) =>{
  try{
    const {comicId} = req.body;
    const userId = req.user.id;

    console.log("Server-side: Received comicId:", comicId, "with type:", typeof comicId);

    //Check comic exists
    const comic = await Comic.findById(comicId);
    if(!comic) return res.status(404).json({error: "Comic not found"});

    //Update user library, preventing duplicates
    const user = await User.findByIdAndUpdate(
      userId,
      {$addToSet: {library: comicId}}, //$addToSet prevents duplicates
      {new: true}
    )
    .populate({
      path: "library",
      populate:[{path:"tag"}, {path:"genre"}]
    })
    .select("-password");

      res.json(user.library);
  }
  catch(err){
    console.error("Error adding to library:", err);
    res.status(500).json({error: err.messages});
  }
})


export default router;