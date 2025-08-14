import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import { useState } from "react";

const Comics = () => {

    const [genreTag, setGenreTag] = useState("")

    const allComics = [
        { title: "Title 1", img: "", link: "" , tag: 'Comedy'},
        { title: "Title 2", img: "", link: "" , tag: 'Comedy'},
        { title: "Title 3", img: "", link: "" , tag: 'Drama'},
        { title: "Title 4", img: "", link: "" , tag: 'Action'},
        { title: "Title 5", img: "", link: "" , tag: 'Drama'},
        { title: "Title 6", img: "", link: "" , tag: 'Comedy'}
    ];

    const links = 
    [   
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
                <section className="flex mb-[20px]">
                    <h1>{genreTag || "Name"}</h1>
                </section>
                <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {filteredComics.map((comic, index) => (
                        <ComicPage key={index} {...comic} />
                    ))}
                </section>
            </main>
        </div>
    )

};

export default Comics;
