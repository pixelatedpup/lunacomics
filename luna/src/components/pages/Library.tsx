import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import SectionBar from "../SectionBar";
import { fetchComicByTag, type Comic, fetchUserLibrary } from "../../api/comicApi.tsx"
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

const Library= () => {
        const[libraryDB, setLibraryDB] = useState<Comic[]>([])
        const {user, token, isLoggedIn} = useUser();

        useEffect(() => {
            if(!isLoggedIn || !user) return;
    
            fetchUserLibrary(user.id)
                .then(setLibraryDB)
                .catch((err)=> {
                    console.error("Failed to fetch library:", err);
                });
        }, [isLoggedIn, user]);
    const comics = [
        { title: "Title 1", img: "", link: "" },
        { title: "Title 2", img: "", link: "" },
        { title: "Title 3", img: "", link: "" },
        { title: "Title 4", img: "", link: "" },
        { title: "Title 5", img: "", link: "" },
        { title: "Title 6", img: "", link: "" }
    ];
    return (
        <>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            <h1> </h1>
            <SectionBar/>



                        {/* Comics Grid */}
            <main className="flex flex-1 p-4">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {libraryDB.map((comic, index) => (
                        <ComicPage key={index} {...comic} comicid={comic.imageId} comicIdDB={comic._id}/>
                    ))}
                </section>
            </main>
        </div>


        </>
    );
}

export default Library;