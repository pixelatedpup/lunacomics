import Icon from "../Icon"
import Comics from "../ComicPage"
import Highlight from "../Highlight"
import {useEffect, useState } from "react"
import { allComics } from "../../assets/AllComics"
import Card from "../Card"
// import { NavLink } from "react-router-dom"


interface LibraryData {
    id?:number,
    comicid?:number,
    title?: string,
    author?:number,
    tag?:string,
    volume?:number,
    description?: string,
    
}


const Home = () => {

    {/* NOTE: Create a seperate Library Table later on . Use AllComicsData for now*/}

    const library: LibraryData[] = [
        // {id:1, name: "Default", link : "" , description: ""},
        // {id:2, name: "Comic 1", link : "" , description: ""},
        // {id:3, name: "Comic 2", link : "" , description: ""},
        // {id:4, name: "Comic 3", link : "" , description: ""}
        {
        id:1, 
        comicid: allComics[0].id , 
        title: allComics[0].title,  
        tag: allComics[0].tag,
        volume: allComics[0].volume,
        description: allComics[0].description}, 
                {
        id:2, 
        comicid: allComics[1].id , 
        title: allComics[1].title,  
        tag: allComics[1].tag,
        volume: allComics[1].volume,
        description: allComics[1].description}, 
                        {
        id:3, 
        comicid: allComics[2].id , 
        title: allComics[2].title,  
        tag: allComics[2].tag,
        volume: allComics[2].volume,
        description: allComics[2].description}, 
                                {
        id:4, 
        comicid: allComics[3].id , 
        title: allComics[3].title,  
        tag: allComics[3].tag,
        volume: allComics[3].volume,
        description: allComics[3].description},
                                        {
        id:5, 
        comicid: allComics[4].id , 
        title: allComics[4].title,  
        tag: allComics[4].tag,
        volume: allComics[4].volume,
        description: allComics[4].description},
        
        
    ]
    

    const newComics: LibraryData[] = [
        {
        id:1, 
        comicid: allComics[8].id , 
        title: allComics[8].title,  
        tag: allComics[8].tag,
        volume: allComics[8].volume,
        description: allComics[8].description}, 
                {
        id:2, 
        comicid: allComics[9].id , 
        title: allComics[9].title,  
        tag: allComics[9].tag,
        volume: allComics[9].volume,
        description: allComics[9].description}, 
                        {
        id:3, 
        comicid: allComics[10].id , 
        title: allComics[10].title,  
        tag: allComics[10].tag,
        volume: allComics[10].volume,
        description: allComics[10].description}, 
                                {
        id:4, 
        comicid: allComics[11].id , 
        title: allComics[11].title,  
        tag: allComics[11].tag,
        volume: allComics[11].volume,
        description: allComics[11].description}, 
    ] 
    
        const hotComics: LibraryData[] = [
        {
        id:1, 
        comicid: allComics[12].id , 
        title: allComics[12].title,  
        tag: allComics[12].tag,
        volume: allComics[12].volume,
        description: allComics[12].description}, 
                {
        id:2, 
        comicid: allComics[13].id , 
        title: allComics[13].title,  
        tag: allComics[13].tag,
        volume: allComics[13].volume,
        description: allComics[13].description}, 
                        {
        id:3, 
        comicid: allComics[14].id , 
        title: allComics[14].title,  
        tag: allComics[14].tag,
        volume: allComics[14].volume,
        description: allComics[14].description}, 

                                {
        id:4, 
        comicid: allComics[15].id , 
        title: allComics[15].title,  
        tag: allComics[15].tag,
        volume: allComics[15].volume,
        description: allComics[15].description}, 
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
                        <Icon iconid={comic.comicid} />
                        
                            <p className="text-center mt-[15px]">{comic.title}</p>
                        
                    </div>
                ))}
            </div>

        </section>

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
                    <ul className="flex-1 flex flex-col gap-5 px-[75px] justify-center ">
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
                        <Card round={true} custom="w-[443px] h-[178px] border border-[var(--accent)] rounded-2xl" cardid={highlightIndex}/>
                </article>
            </div>
        </section>

        {/* New Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full">
                {newComics.map((comic)=>(
                    <Comics comicid={comic.comicid} />
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
                    <Comics comicid={comic.comicid}/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;