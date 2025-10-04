// In server/routes/user.js
import express from "express";
import User from "../models/User.js";
import verifyToken from "../middleware/verifyToken.js"; 
import Comic from "../models/Comics.js";
import Creator from "../models/Creator.js";
import Post from "../models/Post.js";

const router = express.Router();

//Get all posts
router.get("/posts", async (req, res) => {
  try{
    const posts = await Post.find({})
      .populate("poster", "username name")
      .populate("comments.user", "username")
    .populate("likes", "username name");
    res.json(posts);
  }catch(err){
    res.status(500).json({error: err.message});
  }
})

//Add a new posr
router.post("/posts/add" , verifyToken, async(req,res) => {
  try{
    const{title, message, images, isUpdate} = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      title,
      message,
      images,
      isUpdate,
      poster:userId,
    });


    await newPost.save();
    res.json(newPost);
  
  }catch(err){
    res.status(500).json({error: err.message});
  }
})

//Like a post
router.post("/like", verifyToken, async(req,res) => {
  try{
    const { postId } = req.body;
    const userId = req.user.id;

    console.log(`Adding user: ${userId} to likes array of: ${postId}`);

    // 1. Make sure user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Add the user to likes array
    let post= await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } }, // only update likes here
      { new: true }
    ).populate("poster", "username name")
    .populate("likes", "username name");

    if(!post){
      return res.status(404).json({error: "Post not found"});
    }

    res.json(post);
  }catch(err){
    res.status(500).json({error: err.message});
  }
})

//UnLike a post
router.post("/unlike", verifyToken, async(req,res) => {
  try{
    const { postId } = req.body;
    const userId = req.user.id;

    console.log(`Removing user: ${userId} to likes array of: ${postId}`);

    // 1. Make sure user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Add the user to likes array
    let post= await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } }, // only update likes here
      { new: true }
    ).populate("poster", "username name")
    .populate("likes", "username name");

    if(!post){
      return res.status(404).json({error: "Post not found"});
    }

    res.json(post);
  }catch(err){
    res.status(500).json({error: err.message});
  }
})

//Remove Post
router.delete("/posts/:id", verifyToken, async(req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({error: "Post not found"});

    //Making sure only poster can delete
    if(post.poster.toString() !== req.user.id) {
      return res.status(403).json({error: "Not authorized"})
    }
    await post.deleteOne();
    res.json({message: "Post deleted"});

  }catch(err){
    res.status(500).json({error: err.message});
  }
})
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
      name: user.name,
      dateCreated: user.createdAt,
      
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
        const creator = await Creator.findById(req.params.id).populate("followers", "_id name username");

        res.json(creator);
    }catch(err){
        console.error("Failed to get author details:");
        res.status(500).json({error: "Failed to get author"});
    }
});

router.post("/follow", verifyToken, async (req, res) => {
  try {
    const { creatorId } = req.body;
    const userId = req.user.id;

    console.log(`Adding user: ${userId} to follower array of: ${creatorId}`);

    // 1. Make sure user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Add the user to followers array
    let creator = await Creator.findByIdAndUpdate(
      creatorId,
      { $addToSet: { followers: userId } }, // only update followers here
      { new: true }
    ).populate("followers");

    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }

    // 3. Update followersCount dynamically
    creator.followersCount = creator.followers.length;
    await creator.save();

    res.json({
      followers: creator.followers,
      followersCount: creator.followersCount,
    });
  } catch (err) {
    console.error("Failed to follow the user: ", err);
    res.status(500).json({ error: err.message });
  }
});


router.post("/unfollow", verifyToken, async (req, res) => {
  try {
    const { creatorId } = req.body;
    const userId = req.user.id;

    console.log(`Removing user: ${userId} from follower array of: ${creatorId}`);

    // 1. Make sure user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Remove the user from followers array
    let creator = await Creator.findByIdAndUpdate(
      creatorId,
      { $pull: { followers: userId } }, // <-- $pull removes userId from followers
      { new: true }
    ).populate("followers");

    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }

    // 3. Update followersCount dynamically
    creator.followersCount = creator.followers.length;
    await creator.save();

    res.json({
      followers: creator.followers,
      followersCount: creator.followersCount,
    });
  } catch (err) {
    console.error("Failed to unfollow the user: ", err);
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

router.post("/library/remove", verifyToken, async (req, res) => {
  try {
    const { comicId } = req.body;
    const userId = req.user.id;

    console.log(`Removing comic: ${comicId} from user: ${userId} library`);

      //Check comic exists
    const comic = await Comic.findById(comicId);
    if(!comic) return res.status(404).json({error: "Comic not found"});


    // 2. Remove the comic form the users library array
    let user = await User.findByIdAndUpdate(
      userId,
      { $pull: { library: comicId } }, // <-- $pull removes comicId from library
      { new: true }
    ).populate({
      path:"library", 
      populate: [{path: "tag"}, {path: "genre"}]
    })
    .select("-password");

    //Returns the updated user library
    res.json(user.library);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

  } catch (err) {
    console.error("Unable to remove book from library: ", err);
    res.status(500).json({ error: err.message });
  }
});




export default router;