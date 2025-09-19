import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import { useState } from "react";
import { allComics } from "../../assets/AllComics";
import Input from "../Input";
const Comics = () => {

    const [genreTag, setGenreTag] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const links = 
    [   {name: "All", id: 0, route:""},
        {name: "Drama", id: 1, route:""},
        {name: "Comedy", id: 2, route:""},
        {name: "Action", id: 3, route:""},
        {name: "Sci-Fi", id: 4, route:""},
        {name: "Fantasy", id: 5, route:""}       
    ]

    // const filteredComics = genreTag
    //     ? allComics.filter(comic => comic.tag === genreTag) : allComics;
      // Filter by genre AND search term
    const filteredComics = allComics.filter((comic) => {
        const matchesGenre = genreTag && genreTag !== "All" ? comic.tag === genreTag : true;
        const matchesSearch = searchTerm
        ? comic.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
        return matchesGenre && matchesSearch;
    });

    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            {/* Sidebar */}
            
                <NavBar links={links} onLinkSelect={(name) =>setGenreTag(name)}/>


            {/* Comics Grid */}
            <main className="flex flex-col flex-1 p-4">
                <section className="flex  lg:flex-row md:flex-col sm:flex-col mb-[20px] gap-5">
                    <h1 className="sm:text-center md:text-center">{genreTag || "All"}</h1>
                    <div className="flex flex-col justify-center md:items-center sm:items-center items-end flex-1">
                    <Input custom="w-[383px] h-[35px] sm:w-full md:w-full"
                            typeUse="text"
                            label=""
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            value={searchTerm}/>

                    </div>
                </section>

                {genreTag != "All"?(

                <div className="flex justify-center">
                    <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
                        {filteredComics.map((comic, index) => (
                            <ComicPage key={index} comicid={comic.id} title={comic.title}/>
                        ))}
                    </section>
                </div>
                ):(
                
                <div className="flex justify-center">
                    <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {allComics.map((comic, index) => (
                            <ComicPage key={index} comicid={comic.id} title={comic.title}/>
                        ))}
                    </section>
                </div>
                )
                }
            </main>
        </div>
    )

};

export default Comics;
