import { useEffect, useState } from "react";
import Card from "./Card";
import Symbol from "./Symbol";
import { fetchPosts as fetchPostsApi, type PostTypeUse, likePost, unlikePost} from "../api/postApi";
import { useUser } from "../hooks/useUser";
// import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
// interface PostType {
//   _id: string;
//   title: string;
//   message: string;
//   likes: string[]; // array of userIds/usernames
//   comments: { user: string; message: string; createdAt: string }[];
//   poster?: string;
//   imageId?: string[];
//   isUpdate?: boolean;
// }

const Post = () => {
  const [posts, setPosts] = useState<PostTypeUse[]>([]);
  const [openComments, setOpenComments] = useState<string | null> (null) ;
  const [openLikes, setOpenLikes] = useState<string | null> (null);
  const {user, token} = useUser();
  const [openModal, setOpenModal] = useState(false);
  // const [numLikes, setNumLikes] = useState(0)

  // const navigate = useNavigate();

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

  const handleComments = (postId:string) =>{
        setOpenComments(prev => prev === postId ? null : postId);
}   

  const handlLikeHover = (postId:string) => {
    setOpenLikes(postId);
  }
  const handleLike = async (postId: string) =>{
        if (!token) {
            console.warn("Must be logged in to leave a likecreator");
            setOpenModal(true);
            
            return;
        }
    try{
       
        const postUse = posts.find((f)=> f._id === postId);
        if (!postUse) return;

        let updatedPost;
        //Checks if user id is already in liked post
        if(user && postUse?.likes?.some((likeUser:any) => likeUser._id === user.id)) {
            //Unlike
            updatedPost = await unlikePost(postId, token);
        }else{
            //Like
            updatedPost = await likePost(postId, token);
        }

        //Update posts state with updated data
        setPosts(prev =>
            prev.map(p => p._id === updatedPost._id ? updatedPost : p)
        );

    }catch(err){
        console.error("Failed to fetch posts:", err);
    }

  }


  return (
    <section>

        <AlertModal value={openModal} handle={setOpenModal}></AlertModal>
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
            <button className="flex flex-row gap-[8px]" onClick={()=> handleLike(post._id)}>
              <Symbol symbol="like" />
              <div onMouseEnter={()=>handlLikeHover(post._id)} onMouseLeave={()=>setOpenLikes(null)}>
                <p className="flex items-center">{post.likes?.length ?? 0}</p>
              </div>
            </button>
            <button className="flex flex-row gap-[8px]" onClick={()=>handleComments(post._id)}>
              <Symbol symbol="comment" />
              <p className="flex items-center">{post.comments?.length ?? 0}</p>
            </button>
          </article>
            
            {openLikes === post._id && 
            (
            <div className="absolute z-50">
                <div className="flex flex-col gap-5 bg-[var(--accent)] border border-[var(--dark)] rounded-2xl p-[20px]">
                    <p className="border-b border-black">Liked by</p>
                    <ul>
                    {/* {post.likes.map((user, index)=>(
                        
                            // <li className="font-bold">{user}</li>
                            <li>Hi</li>
                        
                    ))} */}
                    </ul>
                </div>
            </div>
            )
          }


          { openComments === post._id &&
          (
            <div className="w-full h-[150px] bg-[var(--light)] border border-[var(--dark)] mt-[10px]">
                {post.comments.map((comment, index)=> (
                    <div key = {index} className="flex border-b border-[var(--dark)] gap-7 p-[12px]">
                        <div className="font-bold text-[var(--primary)]"> {comment.user.username}</div>
                        <h3 className="font-bold">{comment.message}</h3>
                        
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
