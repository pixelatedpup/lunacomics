import Icon from "../Icon"
import Comics from "../ComicPage"
import Highlight from "../Highlight"
import {useEffect, useState } from "react"
// import { NavLink } from "react-router-dom"


interface LibraryData {
    name: string,
    link: string,
    description: string,
    id:number;
}


const Home = () => {
    const library: LibraryData[] = [
        {id:1, name: "Default", link : "" , description: ""},
        {id:2, name: "Comic 1", link : "" , description: ""},
        {id:3, name: "Comic 2", link : "" , description: ""},
        {id:4, name: "Comic 3", link : "" , description: ""}
    ]

    const newComics: LibraryData[] = [
        {id:1, name: "Comic 1", link : "" , description: ""},
        {id:2, name: "Comic 2", link : "" , description: ""},
        {id:3, name: "Comic 3", link : "" , description: ""},
        {id:4, name: "Comic 4", link : "" , description: ""}
    ] 
    
        const hotComics: LibraryData[] = [
        {id:1, name: "Comic 1", link : "" , description: ""},
        {id:2, name: "Comic 2", link : "" , description: ""},
        {id:3, name: "Comic 3", link : "" , description: ""},
        {id:4, name: "Comic 4", link : "" , description: ""}
    ]   

    const[highlightIndex, setHighlightIndex] = useState(0);
    const[resetTrigger, setResetTrigger] = useState(0);

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
    return (
        <>
        {/* Library Section */}
        <section className="flex flex-1 flex-col pb-10 border-b ">

            {/* Temporary to check links */}
            {/* <article>
                <ul>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                    <li><NavLink to="/creator">Creator</NavLink></li>
                    <li><NavLink to="/reading">Reading</NavLink></li>
                    <li><NavLink to="/preview">Preview</NavLink></li>
                    <li><NavLink to="/library">Library</NavLink></li>
                    <li><NavLink to="/notifications">Notifications</NavLink></li>
                </ul>
            </article> */}

            <article className="mb-[15px] ">
                <h2>Your library</h2>
            </article>

            <div className="flex flex-wrap justify-evenly gap-7 w-full">
                {library.map((comic) => (
                    <div className="flex flex-col">
                        <Icon/>
                        
                            <p className="text-center mt-[15px]">{comic.name}</p>
                        
                    </div>
                ))}
            </div>

        </section>

        {/* Hot Comics Section */}
        <section className="flex flex-1 flex-col mt-[70px]">

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
                    <ul className="flex-1 flex flex-col gap-5 px-[75px] justify-center ">
                        {hotComics.map((comic, index) =>  {
                            const isHighlighted = index === highlightIndex;
                            return(
                            <li className="cursor-pointer" key={index} onClick={()=> handleHighlightClick(index) }>
                                {isHighlighted ? (
                                    <Highlight>
                                        <h3 className="px-[20px]">{comic.name}</h3>
                                    </Highlight>
                                    ):(
                                    <h3>{comic.name}</h3>
                                )}
                            </li>
                            )
                        })}
                    </ul>
                </article>

                <article className="flex-1 flex flex-col justify-center">
                    <div className="w-[443px] h-[178px] border border-[var(--black) bg-[white] rounded-2xl">
                        <h1 className="flex flex-col justify-center text-center">{hotComics[highlightIndex]?.name}</h1> 
                        
                    </div>
                </article>
            </div>
        </section>

        {/* New Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full">
                {newComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>

        {/* Top Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>Top Comics</h2>
            </article>
            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full ">
                {hotComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;