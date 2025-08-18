import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import { useState } from "react";
import { allComics } from "../../assets/AllComics";
import Input from "../Input";
const Comics = () => {

    const [genreTag, setGenreTag] = useState("")

    // const allComics = [
    //     { title: "Title 1", img: "", link: "" , tag: 'Comedy'},
    //     { title: "Title 2", img: "", link: "" , tag: 'Comedy'},
    //     { title: "Title 3", img: "", link: "" , tag: 'Drama'},
    //     { title: "Title 4", img: "", link: "" , tag: 'Action'},
    //     { title: "Title 5", img: "", link: "" , tag: 'Drama'},
    //     { title: "Title 6", img: "", link: "" , tag: 'Comedy'}
    // ];

    const links = 
    [   {name: "All", id: 0, route:""},
        {name: "Drama", id: 1, route:""},
        {name: "Comedy", id: 2, route:""},
        {name: "Action", id: 3, route:""},
        {name: "Sci-Fi", id: 4, route:""},
        {name: "Fantasy", id: 5, route:""}       
    ]

    const filteredComics = genreTag
        ? allComics.filter(comic => comic.tag === genreTag) : allComics;

    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            {/* Sidebar */}
            
                <NavBar links={links} onLinkSelect={(name) =>setGenreTag(name)}/>


            {/* Comics Grid */}
            <main className="flex flex-col flex-1 p-4">
                <section className="flex flex-row mb-[20px] gap-20">
                    <h1>{genreTag || "All"}</h1>
                    <div className="flex flex-col justify-center items-end flex-1">
                    <Input custom="w-[383px] h-[35px]"/>
                    </div>
                </section>

                {genreTag != "All"?(

                <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {filteredComics.map((comic, index) => (
                        <ComicPage key={index} comicid={comic.id}/>
                    ))}
                </section>
                ):(
                <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {allComics.map((comic, index) => (
                        <ComicPage key={index} comicid={comic.id}/>
                    ))}
                </section>
                )
                }
            </main>
        </div>
    )

};

export default Comics;
