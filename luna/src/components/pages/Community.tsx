import { useState } from "react";
import Button from "../Button";
import Post from "../Post";
import Text from "../Text";
import { useUser } from "../../hooks/useUser";
import { addPost, fetchPosts, type PostTypeUse } from "../../api/postApi";

const Community = () => {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<PostTypeUse[]>([]);
  const { isLoggedIn, user, token } = useUser();

  const handleSubmit = async () => {
    if (!user || !isLoggedIn || !token) {
      alert("You must be logged in to post!");
      return;
    }

    if (message.trim() === "") {
      alert("Post cannot be empty.");
      return;
    }

    try {
      // Create the new post
      const newPost = await addPost(
        {
          title: `${user.username}'s post`,
          message,
          images: [],
          isUpdate: false,
        },
        token
      );

      // Optionally, append to posts state
      setPosts((prev) => [newPost, ...prev]);

      // Reset the input field
      setMessage("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1>Community</h1>
      </section>

      {/* Post input */}
      <section className="border-b pb-[40px]">
        <Text
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          placeholder="What's on your mind?"
        />
        <div className="flex justify-end w-full mt-2">
          <Button
            text="Post"
            bg="accent"
            color="light"
            size="auto"
            onClick={handleSubmit}
          />
        </div>
      </section>

      {/* Posts display */}
      <section>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} {...post} />
          ))
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default Community;
