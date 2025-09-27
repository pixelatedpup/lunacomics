import Button from "../Button";
import Icon from "../Icon";
import ComicPage from "../ComicPage"
import { allComics } from "../../assets/AllComics";
import { allAuthors } from "../../assets/AllAuthors";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchCreatorOne, type Creator, followAuthor, unfollowAuthor } from "../../api/authorApi";
import { fetchComics, type Comic} from "../../api/comicApi";

import { useUser } from "../../hooks/useUser";

const Creator = () => {
        const {cardId} = useParams<{cardId: string}>();
        const [creator, setCreator] = useState<Creator|null>(null);
        const [comic, setComic] = useState<Comic[]>([]);
        const [loading, setLoading] = useState(true);
        const [error,setError] = useState<string|null>(null);
        const {user, token, isLoggedIn} = useUser();
        const [followerCount, setFollowerCount] = useState(0);
        const [followed, setFollowed] = useState(false);


        useEffect (() => {
            fetchComics()
            .then((data) => {
                setComic(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Could not fetch comics", err);
                setError("Failed to fetch comics");
            })
            .finally(()=>setLoading(false));
        })

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

                alert(`${user?.name} added to followers!`);
                return;
            }

            const updatedData = await unfollowAuthor(cardId, token);

            setFollowerCount(updatedData.followersCount);
            setFollowed(false);

            alert(`You have unfollowed ${creator?.name}!`);
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
                            <Button text={followed? "Unfollow" : "Follow"} bg = {followed? "light" : "accent"} color = {followed? "dark" : "light"}  onClick={handleFollowAuthor}/>
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
                <div>
                    <div className="flex flex-row gap-7">
                        <h2>Comics</h2>
                        <h2>Shop</h2>
                    </div>
                    <div className="flex flex-col border border-black rounded-2xl p-[30px] gap-10">
                        {/* Turn this into a component later */}
                        {comicUse.map((c, index)=>(
                            <article className="flex flex-row">
                                <ComicPage comicid={c.imageId}/>
                                <div className="flex flex-col p-[30px]">
                                    <h2>{c.title}</h2>
                                    <h3 className="mb-[20px]">{`${c.volume} Volumes`}</h3>
                                    <p>{c.description}</p>
                                </div>
                        </article>
                        ) )}


                    </div>
                </div>
            </section>
        </div>
        </>
    );
}

export default Creator;