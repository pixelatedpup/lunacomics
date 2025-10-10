import Button from "../Button";
import Icon from "../Icon";
import ComicPage from "../ComicPage"
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchCreatorOne, type CreatorUse, followAuthor, unfollowAuthor } from "../../api/authorApi";
import { fetchComics, type Comic} from "../../api/comicApi";

import { useUser } from "../../hooks/useUser";
import { useNotifications } from "../../context/NotificationContext";

const Creator = () => {

        type Display = "comic" | "shop";
        const {cardId} = useParams<{cardId: string}>();
        const [creator, setCreator] = useState<CreatorUse|null>(null);
        const [comic, setComic] = useState<Comic[]>([]);
        const [loading, setLoading] = useState(true);
        const [error,setError] = useState<string|null>(null);
        const {user, token} = useUser();
        const [followerCount, setFollowerCount] = useState(0);
        const [followed, setFollowed] = useState(false);
        const {addNotification} = useNotifications();
        const[displayUse, setDisplayUse] = useState<Display>("comic")
        const[filteredComics, setFilteredComics] = useState<Comic[]>([]);



        useEffect(() => {
        fetchComics()
            .then((data) => {
            setComic(data);
            setError(null);
            console.log("Fetched comics (Creator): ", data);
            })
            .catch((err) => {
            console.error("Could not fetch comics", err);
            setError("Failed to fetch comics");
            })
            .finally(() => setLoading(false));
        }, []);

        useEffect(() => {
            if (!cardId || comic.length === 0) return;

            const filtered = comic.filter((c) =>
            c.author.some((a) => a._id === cardId)
            );


            setFilteredComics(filtered);
            console.log("Filtered comics (Creator): ", filtered);
        }, [cardId, comic]);


        useEffect (() => {
            if(!cardId) return;

            fetchCreatorOne(cardId)
            .then((data) => {
                setCreator(data);
                setError(null);
                console.log("Adding the following creator data: ", data)

                if(user && data.followers?.some((f:any) => f._id === user.id)) {
                    setFollowed(true);
                }else{
                    setFollowed(false);
                }
            }
            )
            .catch((err) => {
                console.error("Could not fetch details of author", cardId, err);
                setError("Failed to load creator");
            })
            .finally(()=>setLoading(false));

            (console.log(`CardID: ${cardId}`));
            // (console.log(`AuthorID: ${author?.id}`));
            // (console.log(`AuthorName Object: ${author?.name}`))
        },[cardId, user]
        )

        useEffect(()=>{
            console.log(loading,error,filteredComics);
        },[])



        const handleDisplay = (displayInUse:string) =>{
            if (displayInUse === "comic" && displayUse === "comic"){
                setDisplayUse("comic");
            }else if(displayInUse === "shop" && displayUse === "comic"){
                setDisplayUse("shop");
            }else{
                setDisplayUse("comic")
            }
        }

     
                
        const handleFollowAuthor = async () => {
        if (!cardId || !token) {
            console.warn("Must be logged in to follow creator");
            return;
        }

        console.log("Client-side: Sending creatorId:", cardId, "with type:", typeof cardId);

        try {
            // Call API
            if(!followed){
                const updatedData = await followAuthor(cardId, token);

                // If backend returns { followers, followersCount }
                setFollowerCount(updatedData.followersCount);
                setFollowed(true);

                addNotification(`You just followed ${creator?.name}`);
                return;
            }

            const updatedData = await unfollowAuthor(cardId, token);

            setFollowerCount(updatedData.followersCount);
            setFollowed(false);

            addNotification(`You have unfollowed ${creator?.name}`);
        } catch (err) {
            console.error("Error following author:", err);
            alert("Failed to follow author");
        }
        };

        
        const comicUse = comic.filter(c => c.author.some((a) => a._id === cardId)) ;
        // const comicIdUse = allComics.find(c => c.author === Number(cardId));
        // const author = allAuthors.find(a => a.id === Number(cardId));
    return (
        <>
        {/* NOTE: I'll turn this into a component later.. */}
        <div className="flex flex-col gap-10">
            <section className="flex flex-row gap-4">
                <article className="flex-[1/3]">
                    <Icon iconid={creator?.imageId}/>
                </article>

                <div className="flex-1 flex flex-row ">
                        <article className="flex-1 flex flex-col gap-4">
                            <h2>{creator?.name}</h2>
                            <div>
                                <h3> {comicUse.length} books published</h3>
                                <h3> {`Member since ${creator?.dateCreated}`}</h3>
                            </div>
                        </article>

                    <div className="flex flex-1 flex-col items-center justify-center ">
                        <article className="flex flex-col gap-10">
                            <h2 className="text-center">{`${followerCount || creator?.followersCount} followers`}</h2>
                            <Button text={followed? "Unfollow" : "Follow"} bg = {followed? "light" : "accent"} color = {followed? "dark" : "light"}  onClick={handleFollowAuthor} size="auto"/>
                        </article>
                    </div>
                </div>
                
            </section>

            <section>
                <div className="bg-black text-white p-[30px] rounded-2xl">
                    <h1>Summary</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tellus velit, 
                        volutpat in cursus interdum, tempor posuere tellus. Sed eu sodales mi. 
                        Vivamus vitae augue ligula. Praesent at velit euismod massa lobortis euismod. 
                        Nullam tristique vitae tellus sed mollis.</p>
                </div>
            </section>

            <section>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-7">
                        <button className={`${displayUse === "comic"? "text-[var(--accent)]":"text-[var(--dark)]"}`} onClick={()=>handleDisplay("comic")}><h2>Comics</h2></button>
                        <button className={`${displayUse === "shop"? "text-[var(--accent)]":"text-[var(--dark)]"}`} onClick={()=>handleDisplay("shop")}><h2>Shop</h2></button>
                    </div>

                    <div className="flex flex-col border border-black rounded-2xl p-[30px] gap-10">
                        
                    {displayUse === "comic" && 
                    ( <>
                        {comicUse.map((c, index)=>(
                            <article key={index} className="flex flex-row">
                                <ComicPage comicid={c.imageId}/>
                                <div className="flex flex-col p-[30px]">
                                    <h2>{c.title}</h2>
                                    <h3 className="mb-[20px]">{`${c.volume} Volumes`}</h3>
                                    <p>{c.description}</p>
                                </div>
                            </article>
                        ) )}
                        </>
                        )}
                    {displayUse ==="shop" && 
                    (
                       <>
                            <p className="text-grey">Shop is empty at the moment</p>
                       </> 
                    )}
                    </div>



                </div>
            </section>
        </div>
        </>
    );
}

export default Creator;