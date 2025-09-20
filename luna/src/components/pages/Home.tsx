import Icon from "../Icon"
import Comics from "../ComicPage"
import Highlight from "../Highlight"
import {useEffect, useState, useContext } from "react"
import { allComics } from "../../assets/AllComics.tsx"
import { hotComics } from "./DataHome";
import { library } from "./DataHome"
import { newComics } from "./DataHome"
import Card from "../Card"
// import {useWindowSize} from "../../hooks/useWindowSize";

import { useUser } from "../../hooks/useUser"
// import { NavLink } from "react-router-dom"





const Home = () => {

    {/* NOTE: Create a seperate Library Table later on . Use AllComicsData for now*/}

    const {isLoggedIn} = useUser();

    const[highlightIndex, setHighlightIndex] = useState(0);
    const[resetTrigger, setResetTrigger] = useState(0);
    const[selectedCard, setSelectedCard] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setHighlightIndex((prev) => (prev + 1) % hotComics.length)
        }, 2000);
            
        return() => clearInterval(interval);

    }, [hotComics.length, resetTrigger])

    const handleHighlightClick = (index:number) => {
        setHighlightIndex(index);
        setResetTrigger((prev) => prev+1);
    }

    useEffect(() => {
        setSelectedCard(hotComics[highlightIndex].comicid);

    },[highlightIndex,hotComics])
    return (
        <>
        {/* Library Section */}

        {isLoggedIn &&         
        
        <section className="flex flex-1 flex-col pb-10 border-b ">


            <article className="mb-[15px] ">
                <h2>Your library</h2>
            </article>

            <div className="flex lg:flex-wrap justify-evenly gap-7 w-full
                             sm:w-full sm:overflow-y-auto">
                {library.map((comic) => (
                    <div className="flex flex-col">
                        <Icon iconid={comic.comicid} />
                        
                            <p className="w-[140px] truncate text-center mt-[15px] font-bold text-[var(--primary)]">{comic.title}</p>
                        
                    </div>
                ))}
            </div>

        </section>}


        {/* Hot Comics Section */}
        <section className="flex flex-1 flex-col mt-[30px]">

            <article className="mb-[15px]">
                <h2>Hot</h2>
            </article>

            <div className="flex 
                            g:flex-row md:flex-col 
                            lg:flex-row
                            sm:flex-col-reverse 
                            md:flex-col-reverse 
                            sm:items-center
                            md:items-center
                           
                            lg:h-[255px] 
                            md:h-[455px] 
                            sm:h-[455px] 

                            rounded-2xl 
                            bg-[#002C34]">
                <article className="flex flex-col flex-1 gap-15 text-white">
                    <ul className="flex-1 flex flex-col gap-5 px-[75px] justify-center 
                                   ">
                        {hotComics.map((comic, index) =>  {
                            
                            const isHighlighted = index === highlightIndex;
                            return(
                            <li className="cursor-pointer" key={index} onClick={()=> handleHighlightClick(index) }>
                                {isHighlighted ? (
                                    <Highlight>
                                        <h3 className="px-[20px] font-bold">{comic.title}</h3>
                                    </Highlight>
                                    ):(
                                    <h3 className="px-[20px]">{comic.title}</h3>
                                )}
                            </li>
                            )
                        })}
                    </ul>
                </article>

                <article className="flex-1 flex flex-col justify-center">           
                        <Card round={true} custom="w-[443px] h-[178px] sm:w-[450px] sm:h-[178px] border border-[var(--accent)] rounded-2xl" cardid={selectedCard}/>
                </article>
            </div>
        </section>

        {/* New Comics Section */}
        <section className="flex flex-col flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-wrap flex-row justify-evenly gap-7">
                {newComics.map((comic)=>(
                        <Comics comicid={comic.comicid} title={comic.title}/>
                ))}
            </div>
        </section>

        {/* Top Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>Top Comics</h2>
            </article>
            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full ">
                {hotComics.map((comic)=>(
                    <Comics comicid={comic.comicid} title={comic.title}/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;