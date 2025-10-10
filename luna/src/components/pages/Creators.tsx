import Card from "../Card";
import { allAuthors } from "../../assets/AllAuthors";
import Input from "../Input";
import { allComics } from "../../assets/AllComics.tsx";
import Banner from "../Banner";
import { fetchCreators, followAuthor, type CreatorUse } from "../../api/authorApi.tsx";
import { fetchPosts as fetchPostsApi, type PostTypeUse } from "../../api/postApi.tsx";
import { useState,useEffect } from "react";
import { useUser } from "../../hooks/useUser.tsx";
import Loading from "../Loading.tsx";
const Creators = () => {

    

    const [creators, setCreators] = useState<CreatorUse[]>([]);
    const [posts, setPosts] = useState<PostTypeUse[]>([]);
    const [loading, setLoading] = useState(true);
    
    const updates= [
        {title: "New Upload",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         author:""
        },
        {title: "New Upload",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         author:""
        },

    ]
    useEffect(()=>{

        fetchCreators()
        .then(setCreators)
        .catch((err) => {
            console.error("Failed to get and store creators", err)
        })
        .finally(()=>setLoading(false))

        
    },[])

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
        <>
            {loading &&
            <Loading/>}
            <section className="border-b mb-[100px]">
                <h2> Updates </h2>
                <article className="flex flex-col sm:gap-10 lg:gap-10 md:gap-10 mt-[30px] ">
    
                    <div className="flex flex-row gap-[10px] overflow-x-auto w-full hide-scrollbar">
                        {posts.map ((post, index) => (
                                <div className="flex flex-col gap-5">
                                    <div className="w-[350px] h-[170px] p-[15px] border border-[var(--dark)] rounded-2xl">
                                        <p>{post.message}</p>
                                    </div>
                                    {/* <div className="h-[40px] w-[40px] bg-[black]"></div> */}
                                              <article className="flex flex-row gap-[8px] w-[308px] ">
                                                    <Card
                                                    custom="h-[42px] w-[42px]"
                                                    round={true}
                                                    cardType="banner"
                                                    cardid={1}
                                                    />
                                                    <h3 className="flex flex-col justify-center ">{post.poster?.username}</h3>
                                                </article>
                                </div>

                                
                            
                        ))}
                    </div>
                    

                </article>
            </section>

        <section className="flex lg:flex-row md:flex-row sm:flex-col gap-20 md:gap-5 sm:gap-5 mt-[50px]">
            <h2 className="sm:text-center md:text-center sm:text-start md:text-start ">Creators</h2>
            <div className="flex flex-1 flex-col lg:items-end lg:justify-center sm:items-start md:items-center ">
                <Input custom="w-[383px] h-[35px]"/>
            </div>
        </section>

        <section className="lg:grid lg:grid-cols-4 lg:gap-5 
                            md:flex md:flex-wrap
                            sm:flex sm:flex-wrap
                            w-full justify-evenly mt-[30px] ">
            {creators.map((creator,index) => (
                <div className="flex flex-col items-center gap-[8px]">
                <Banner key={index} cardid={creator.imageId} otherId={creator._id}/>

                <h2 className="text-center font-bold">{creator.name}</h2>
                <h3 className="text-center text-[var(--primary)]">@{creator.username}</h3>
                </div>
            ))}

        </section>
        </>
    );
}

export default Creators;