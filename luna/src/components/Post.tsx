import { useEffect, useState } from "react";
import Card from "./Card";
import Symbol from "./Symbol";
import { fetchPosts as fetchPostsApi, type PostTypeUse} from "../api/postApi";

interface PostType {
  _id: string;
  title: string;
  message: string;
  likes: string[]; // array of userIds/usernames
  comments: { user: string; message: string; createdAt: string }[];
  poster?: string;
  imageId?: string[];
  isUpdate?: boolean;
}

const Post = () => {
  const [posts, setPosts] = useState<PostTypeUse[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostsApi();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section>
      {posts.map((post) => (
        <div
          key={post._id}
          className="mt-[70px] mb-[100px] border-b border-b-[2px] pb-[40px]"
        >
          {/* Top section with icon and creator name*/}
          <article className="flex flex-row gap-[8px] w-[308px] ">
            <Card
              custom="h-[42px] w-[42px]"
              round={true}
              cardType="banner"
              cardid={1}
            />
            <h3 className="flex flex-col justify-center ">{post.title}</h3>
          </article>

          {/* Posts*/}
          <article className="mt-[30px]">
            <div className="w-full h-[250px] border border-[1px] border-[var(--dark)] rounded-2xl p-[15px] bg-[var(--light)]">
              <p className="text-[var(--dark)]">{post.message}</p>
            </div>
          </article>

          {/* Like and comment buttons*/}
          <article className="flex flex-row gap-5 mt-[30px]">
            <div className="flex flex-row gap-[8px]">
              <Symbol symbol="like" />
              <p className="flex items-center">{post.likes?.length ?? 0}</p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <Symbol symbol="comment" />
              <p className="flex items-center">{post.comments?.length ?? 0}</p>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
};

export default Post;
