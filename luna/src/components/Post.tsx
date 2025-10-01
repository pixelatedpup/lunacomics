import { useEffect, useState } from "react";
import Card from "./Card";
import Symbol from "./Symbol";
import { fetchPosts as fetchPostsApi, type PostTypeUse} from "../api/postApi";
import { fetchUserOne } from "../api/userApi";
import { fetchCreatorOne } from "../api/authorApi";

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
  const [openComments, setOpenComments] = useState(false);

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

  const handleComments = () =>{
    if(!openComments){
        setOpenComments(true);
    }else{
        setOpenComments(false);
    }
  }


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
            <h3 className="flex flex-col justify-center ">{post.poster?.username}</h3>
          </article>

          {/* Posts*/}
          <article className="mt-[30px]">
            <div className="flex flex-col gap-5 w-full h-[250px] border border-[1px] border-[var(--dark)] rounded-2xl p-[15px] bg-[var(--dark)] ">
            <h2 className="text-[var(--light)] font-bold">{post.title}</h2>
              <p className="text-[var(--light)]">{post.message}</p>
            </div>
          </article>

          {/* Like and comment buttons*/}
          <article className="flex flex-row gap-5 mt-[30px]">
            <button className="flex flex-row gap-[8px]" >
              <Symbol symbol="like" />
              <p className="flex items-center">{post.likes?.length ?? 0}</p>
            </button>
            <button className="flex flex-row gap-[8px]" onClick={handleComments}>
              <Symbol symbol="comment" />
              <p className="flex items-center">{post.comments?.length ?? 0}</p>
            </button>
          </article>

          { openComments &&
          (
            <div className="w-full h-[150px] bg-[var(--light)] border border-[var(--dark)] mt-[10px]">
                {post.comments.map((comment, index)=> (
                    <div className="flex border border-b gap-7 p-[12px]">
                        <div className="font-bold text-[var(--primary)]"> {comment.user.username}</div>
                        <h3>{comment.message}</h3>
                        
                    </div>
                ))}
            </div>
          )

          }
        </div>
      ))}
    </section>
  );
};

export default Post;
