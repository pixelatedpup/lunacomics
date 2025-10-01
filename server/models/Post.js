import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema(
    {
        user: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
        message: {type: String, required: true},
        createdAt: {type:Date, default:Date.now}
    },
    {_id:false}
)
const PostSchema = new mongoose.Schema(
    {
        // Title - Title of the post
        // Message - Content of the post
        //Likes - Users that liked the post (could be counted to give like amount)
        //Comment - Both the comment and the user that left it
        //Poster - Person that left the post
        //ImageID - Any additional images added to the community page (optional)
        //isUpdate - Checks if it is a Creator update post or a regular user post.
        title: {type: String, required:true},
        message: {type: String, required:true},
        likes: [{type:mongoose.Schema.Types.ObjectId, ref:"User" }],
        comments: [CommentSchema],
        poster:{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true },
        imageId: [{type: String}],
        isUpdate: {type: Boolean, default: false},

    },
    {timestamps: true}
)

export default mongoose.model("post", PostSchema, "Post");