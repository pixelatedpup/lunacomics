import Icon from "../Icon"
import Comics from "../ComicPage"
import Highlight from "../Highlight"
import {useEffect, useState, useContext } from "react"
// import { allComics } from "../../assets/AllComics.tsx"
import { hotComics } from "./DataHome";
import { library } from "./DataHome"
// import { newComics } from "./DataHome"
import Card from "../Card"
import { fetchComicByTag, type Comic, fetchUserLibrary } from "../../api/comicApi.tsx"
import { useNavigate } from "react-router-dom";

// import {useWindowSize} from "../../hooks/useWindowSize";

import { useUser } from "../../hooks/useUser"
// import { NavLink } from "react-router-dom"





const Home = () => {

    {/* NOTE: Create a seperate Library Table later on . Use AllComicsData for now*/}

    const {isLoggedIn,user} = useUser();

    const[highlightIndex, setHighlightIndex] = useState(0);
    const[resetTrigger, setResetTrigger] = useState(0);
    const[selectedCard, setSelectedCard] = useState(0);
    const [newComicsDB, setNewComicsDB] = useState<Comic[]>([])
    const [hotComicsDB, setHotComicsDB] = useState<Comic[]>([])
    const [topComicsDB, setTopComicsDB] = useState<Comic[]>([])
    const[libraryDB, setLibraryDB] = useState<Comic[]>([])

    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn || !user) return;

        fetchUserLibrary(user.id)
            .then(setLibraryDB)
            .catch((err)=> {
                console.error("Failed to fetch library:", err);
            });
    }, [isLoggedIn, user]);

    useEffect(()=>{
        fetchComicByTag("New").then(setNewComicsDB).catch(console.error);
        fetchComicByTag("Top").then(setTopComicsDB).catch(console.error);
        fetchComicByTag("Hot").then(setHotComicsDB).catch(console.error);
        //console.log(hotComicsNew);
    },[])

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

            <div className="flex flex-row items-center overflow-x-auto w-full gap-5 
                            lg:h-[200px] md:h-[200px] sm:h-[150px] 
                            lg:p-[20px] sm:p-[3px]">

                <div className="flex flex-col  gap-2 h-full justify-center">
                    {/* <Icon iconid={16} link={true} source="comics" size="sm" /> */}
                    <div className="flex items-center justify-center w-[100px] h-[100px] bg-[var(--light)] rounded-2xl border text-[var(--primary)] 
                                    hover:scale-[110%] transition-all duration-[350ms] hover:bg-[var(--primary)] hover:text-[var(--light)] ">
                        <button onClick={()=> navigate("/comics")}><p className="text-center font-bold text-[50px] ">+</p></button>
                    </div>
                </div>
                {libraryDB.map((comic) => (
                    <div className="flex flex-col items-center">
                            
                            <Icon iconid={comic.imageId} comicId={comic._id}/>
                            <p className="w-[140px] truncate text-center font-bold text-[var(--primary)]">{comic.title}</p>
                        
                    </div>
                ))}
            </div>

        </section>}


        {/* Hot Comics Section */}
        <section className={`flex flex-1 flex-col ${isLoggedIn && 'mt-[30px]'}`}>

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
                            bg-[black]">
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

                <article className="flex-1 flex flex-col justify-start p-[10px] lg:justify-center sm:w-full  sm:h-full lg:h-full">           
                        <Card round={true} custom=" w-[443px]   sm:w-full sm:h-[220.33px] border border-[var(--accent)] rounded-2xl" cardid={selectedCard}/>
                </article>
            </div>
        </section>

        {/* New Comics Section */}
        <section className="flex flex-col flex-wrap flex-1 flex-col mt-[70px] w-full">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-row items-center gap-5 overflow-x-auto justify-evenly gap-7 w-full">
                {newComicsDB.map((comic)=>(
                        <Comics comicid={comic.imageId} title={comic.title} comicIdDB={comic._id}/>
                ))}
            </div>
        </section>

        {/* Top Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>Top Comics</h2>
            </article>
            <div className="flex flex-row items-center gap-5 overflow-x-auto justify-evenly gap-7 w-full">
                {topComicsDB.map((comic)=>(
                    <Comics comicid={comic.imageId} title={comic.title} comicIdDB={comic._id}/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;