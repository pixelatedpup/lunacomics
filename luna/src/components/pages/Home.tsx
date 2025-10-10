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
import Modal from "../Modal.tsx";
import AlertModal from "../AlertModal.tsx";
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
      const [openModal, setOpenModal] = useState(true);
      const [highlightID, setHighlightID] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        console.log("Fetched hotComicsDB: ", hotComicsDB);
    }, [hotComicsDB])
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
        if(hotComicsDB.length === 0) return; //wait until data loads

        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % hotComicsDB.length);
        }, 2000);
            
        return() => clearInterval(interval);

    }, [hotComicsDB.length, resetTrigger])

    const handleHighlightClick = (index:number) => {
        setHighlightIndex(index);
        setResetTrigger((prev) => prev+1);
    }

    useEffect(() => {
        // setSelectedCard(hotComics[highlightIndex].comicid);
        if(hotComicsDB.length > 0){
            const comic = hotComicsDB[highlightIndex];
            if (comic) {
                setSelectedCard(comic.imageId)
                setHighlightID(comic._id);
            }
        }

    },[highlightIndex,hotComicsDB])

    useEffect(()=>{
        console.log("Highlight Index", highlightIndex);
        console.log("Selected Card: ", selectedCard)
    },[selectedCard, highlightIndex])

  
    return (
        <>
        {(!isLoggedIn && openModal )&& 
        (<AlertModal value={openModal}    handle={setOpenModal} title="Welcome to Luna Comics" content="The website is still in it's early development stage. To access all current features, please Log in or Register an account. "/>)}
        
        {/* Library Section */}

        {isLoggedIn &&         
        
        <section className="flex flex-1 flex-col pb-10 border-b ">


            <article className="mb-[15px] ">
                <h2>Your library</h2>
            </article>

            <div className="flex flex-row items-center overflow-x-auto w-full gap-5 
                            lg:h-[200px] md:h-[200px] sm:h-[150px] 
                            lg:p-[20px] sm:p-[3px] hide-scrollbar">

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

  <div className="flex flex-col md:flex-row sm:items-center rounded-2xl bg-black 
                  lg:h-[255px] md:h-[455px] sm:h-[455px] ">
        <article className="flex flex-col flex-1 text-white">
        <ul className="flex-1 flex flex-col gap-5 px-[75px] justify-center">
            {hotComicsDB.map((comic, index) => {
            const isHighlighted = index === highlightIndex;
            return (
                <li
                key={comic._id || index}
                onClick={() => handleHighlightClick(index)}
                className={`cursor-pointer transition-all duration-300 ${
                    isHighlighted
                    ? "text-[var(--accent)] font-bold"
                    : "text-white/70 hover:text-[var(--accent)]"
                }`}
                >
                {comic.title}
                </li>
            );
            })}
        </ul>
        </article>

        <article className="flex-1 flex justify-center items-center h-full  overflow-hidden">
        <Card
            key={selectedCard}
            round
            custom="border border-[var(--accent)] rounded-2xl 
                    w-full  h-full max-h-full overflow-hidden"
            cardid={selectedCard}
            cardIdDB={highlightID}
        />
        </article>
  </div>
</section>


        {/* New Comics Section */}
        <section className="flex flex-col flex-wrap flex-1 flex-col mt-[70px] w-full">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-row items-center gap-5 overflow-x-auto hide-scrollbar justify-evenly gap-7 w-full">
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
            <div className="flex flex-row items-start gap-5 overflow-x-auto justify-evenly gap-7 w-full">
                {topComicsDB.map((comic)=>(
                    <Comics comicid={comic.imageId} title={comic.title} comicIdDB={comic._id}/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;