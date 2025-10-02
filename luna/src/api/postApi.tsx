// src/api/postApi.tsx
import axios from "axios";

export interface PostTypeUse {
  _id: string;
  title: string;
  message: string;
  likes: string[];
  comments: { user: { username: string }; message: string; createdAt: string }[];
  poster: { _id: string; username: string; name?: string };
  images: string[];
  isUpdate: boolean;
  createdAt: string;
}

const API_URL = "http://localhost:8000/api/user"; // adjust base path

// Fetch all posts
export const fetchPosts = async (): Promise<PostTypeUse[]> => {
  const res = await axios.get(`${API_URL}/posts`);
  return res.data;
};

// Add a new post
export const addPost = async (post: {
  title: string;
  message: string;
  images?: string[];
  isUpdate?: boolean;
}, token: string): Promise<PostTypeUse> => {
  const res = await axios.post(
    `${API_URL}/posts/add`,
    post,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Remove a post
export const removePost = async (postId: string, token: string) => {
  const res = await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a like
export async function likePost(postId: string, token: string): Promise<PostTypeUse> {
    const res = await fetch(`${API_URL}/like`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({postId: postId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to like post");
    return res.json();
}

// Remove a like
export async function unlikePost(postId: string, token: string): Promise<PostTypeUse> {
    const res = await fetch(`${API_URL}/unlike`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({postId: postId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to unlike post");
    return res.json();
}
