import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import { useState , useEffect} from "react";
import { allComics } from "../../assets/AllComics.tsx";
import Input from "../Input";
import { fetchComics, type Comic} from "../../api/comicApi.tsx"
import Loading from "../Loading.tsx";
const Comics = () => {

    const [genreTag, setGenreTag] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [comicDB, setComicDB] = useState<Comic[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
            //gets comics and then passes them to comicDB
            fetchComics()
            .then(setComicDB)
            .catch(console.error)
            .finally(()=>setLoading(false));

            console.log("Gotten comics: ", comicDB)
            console.log("Selected genre:", genreTag);
        },[])

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
    const filteredComics = comicDB.filter((comic) => {
        // Genre filtering
        const matchesGenre =
            genreTag && genreTag !== "All"
            ? comic.genre.some((g: any) => g.name === genreTag)
            : true;

        // Search filtering
        const matchesSearch = searchTerm
            ? comic.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        return matchesGenre && matchesSearch;
    });


    return (

        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            {loading && (
                <Loading/>
            )}
            {/* Sidebar */}
            
                <NavBar links={links} onLinkSelect={(name) =>setGenreTag(name)}/>


            {/* Comics Grid */}
            <main className="flex flex-col flex-1 p-4 ">
                <section className="flex  lg:flex-row md:flex-col sm:flex-col 
                                    mb-[20px] sm:mt-[50px] md:mt-[50px] gap-5 w-full ">

                    <div className="w-[300px] ">
                        <h1 className="sm:text-center md:text-center">{genreTag || "All"}</h1>
                    </div>
                    <div className="flex flex-col  w-full  md:items-center 
                                     lg:items-end 
                                    justify-center ">
                        <Input custom="lg:w-[350px] h-[15px] sm:w-full md:w-full "
                                typeUse="text"
                                label=""
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                value={searchTerm}/>

                    </div>
                </section>

                {genreTag != "All"?(

                <div className="flex justify-center ">
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7 ">
                        {filteredComics.map((comic, index) => (
                            <ComicPage key={index} comicid={comic.imageId} comicIdDB={comic._id} title={comic.title}/>
                        ))}
                    </section>
                </div>
                ):(
                
                <div className="flex justify-center">
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7 ">
                        {filteredComics.map((comic, index) => (
                            <ComicPage key={index} comicid={comic.imageId} comicIdDB={comic._id} title={comic.title}/>
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
