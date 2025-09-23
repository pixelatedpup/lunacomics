// In server/routes/user.js
import express from "express";
import User from "../models/User.js";
import verifyToken from "../middleware/verifyToken.js"; 

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

export default router;