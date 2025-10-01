export const allPosts = [
    {title: "Loving the new series!",
     message: "I really love this seriese by John. I can't wait for the next volumes.",
     likes: ["helloKitty123", "kennyJames", "jamesSpade123"],
     comment: [{user: "helloKitty123" , message: "I agree, I cant get my mind off it", createdAt: Date.now }],
     poster: "racksracks23",
     imageId: "1",
     isUpdate: "false"
    },


{title: "Can't wait for my new mug from their store!",
     message: "Really enjoying the design of the mug I just got from Hello Kitty 123's store!",
     likes: ["helloKitty123", "kennyJames"],
     comment: [{user: "mathKen" , message: "That looks so lovely, can't wait to get mine!", createdAt: Date.now }],
     poster: "mlk123",
     imageId: "1",
     isUpdate: "false"
    },

{title: "Samshing New Hit!",
     message: "I really love this seriese by John. I can't wait for the next volumes.",
     likes: ["mathKen"],
     comment: [{user: "helloKitty123" , message: "I agree, I cant get my mind off it", createdAt: Date.now }],
     poster: "jamesMan123",
     imageId: "1",
     isUpdate: "false"
    }
]


// import mongoose from "mongoose";


// const CommentSchema = new mongoose.Schema(
//     {
//         user: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
//         message: {type: String, required: true},
//         createdAt: {type:Date, default:Date.now}
//     },
//     {_id:false}
// )
// const PostSchema = new mongoose.Schema(
//     {
//         // Title - Title of the post
//         // Message - Content of the post
//         //Likes - Users that liked the post (could be counted to give like amount)
//         //Comment - Both the comment and the user that left it
//         //Poster - Person that left the post
//         //ImageID - Any additional images added to the community page (optional)
//         //isUpdate - Checks if it is a Creator update post or a regular user post.
//         title: {type: String, required:true},
//         message: {type: String, required:true},
//         likes: [{type:mongoose.Schema.Types.ObjectId, ref:"User" }],
//         comments: [CommentSchema],
//         poster:{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true },
//         imageId: [{type: String}],
//         isUpdate: {type: Boolean, default: false},

//     },
//     {timestamps: true}
// )

// export default mongoose.model("post", PostSchema, "Post");