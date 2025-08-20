import Button from "../Button";
import Icon from "../Icon";
import ComicPage from "../ComicPage"
import { allComics } from "../../assets/AllComics";
import { allAuthors } from "../../assets/AllAuthors";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const Creator = () => {
        const {cardId} = useParams<{cardId: string}>();
        const comicUse = allComics.filter(c => c.author === Number(cardId));
        const comicIdUse = allComics.find(c => c.author === Number(cardId));
        const author = allAuthors.find(a => a.id === Number(cardId))
        
        useEffect (() => {
            (console.log(`CardID: ${cardId}`));
            (console.log(`AuthorID: ${author?.id}`));
            (console.log(`AuthorName Object: ${author?.name}`))
        },[cardId]
            
            

        )
    return (
        <>
        {/* NOTE: I'll turn this into a component later.. */}
        <div className="flex flex-col gap-10">
            <section className="flex flex-row gap-4">
                <article className="flex-[1/3]">
                    <Icon iconid={comicIdUse?.id}/>
                </article>

                <div className="flex-1 flex flex-row ">
                        <article className="flex-1 flex flex-col">
                            <h1 className="mb-[20px]">{author?.name}</h1>
                            <h2> 2 books published</h2>
                            <h2> {`Member since ${author?.dateCreated}`}</h2>
                        </article>

                    <div className="flex flex-1 flex-col items-center justify-center ">
                        <article className="flex flex-col gap-10">
                            <h2 className="text-center">{`${author?.followersCount} followers`}</h2>
                            <Button text="Follow"/>
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
                        {comicUse.map((comic, index)=>(
                            <article className="flex flex-row">
                                <ComicPage comicid={comic.id}/>
                                <div className="flex flex-col p-[30px]">
                                    <h2>{comic.title}</h2>
                                    <h3 className="mb-[20px]">{`${comic.volume} Volumes`}</h3>
                                    <p>{comic.description}</p>
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