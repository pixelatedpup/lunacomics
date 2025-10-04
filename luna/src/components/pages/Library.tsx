import NavBar from "../NavBar";
import ComicPage from "../ComicPage";
import SectionBar from "../SectionBar";
import { fetchComicByTag, type Comic, fetchUserLibrary } from "../../api/comicApi.tsx"
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import Button from "../Button.tsx";

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

        <section>
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
                <h1> </h1>
                <SectionBar/>

                {/* Comics Grid */}
                <main className="flex flex-col gap-7 flex-1 p-4">
                    <section className="flex  w-full border-b p-[20px]">
                        <div className="flex gap-7">
                            <div className="flex justify-start h-auto w-[95px] border border-black items-center w-full h-full">
                            </div>
                            <div className="flex justify-end h-full w-[200px]">
                                <div className="flex flex-col">
                                    <h2>{user?.name}</h2>
                                    <h3>{user?.username}</h3>
                                    <h3>{user?.dateCreated}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col  items-end w-full">
                            <h3>Followers: </h3>
                            <h3>Following: </h3>
                            <Button text="Dashboard" color="dark" bg="light"/>
                        </div>
                        
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {libraryDB.map((comic, index) => (
                            <ComicPage key={index} {...comic} comicid={comic.imageId} comicIdDB={comic._id}/>
                        ))}
                    </section>
                </main>
            </div>
        </section>


        </>
    );
}

export default Library;