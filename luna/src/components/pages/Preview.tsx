import Button from "../Button";
import ComicPage from "../ComicPage";
import { useParams } from "react-router-dom";

{/* Importing dummy data */}
import { allComics } from "../../assets/AllComics.tsx";
import { allAuthors } from "../../assets/AllAuthors";
import Icon from "../Icon";
import Card from "../Card";
import { useEffect, useState} from "react";

//Imports for the server
import { addToLibrary, removeFromLibrary,  fetchComics, fetchUserLibrary, type Comic} from "../../api/comicApi";
import { useUser } from "../../hooks/useUser";
import { useNotifications } from "../../context/NotificationContext.tsx";

const Preview = () => {
    const {comicId} = useParams<{comicId: string}>();
    const [comicDB, setComicDB] = useState<Comic[]>([])
    const [libraryDB, setLibraryDB] = useState<Comic[]>([]);
    const {user, token, isLoggedIn} = useUser();
    const {addNotification} = useNotifications();
    const [inLibrary, setInLibrary] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    
    // const authorUse = allAuthors.find(a => a.id === Number(comic?.author))
    
    
    useEffect(()=>{
        //gets comics and then passes them to comicDB
        fetchComics()
        .then((data) => {
            setComicDB(data);
            
    })
        .catch(console.error);

        //Checks to see if the user is logged in or not
        if(!isLoggedIn || !user) return;
        fetchUserLibrary(user.id)
        .then((data) => {
            setLibraryDB(data);
            if(data.some((c:any) => c._id === comicId)) {
                    setInLibrary(true);
                }else{
                    setInLibrary(false);
                }
            
        })
        .catch(console.error);
    },[isLoggedIn, user])

    useEffect(() => {
        console.log("InLibrary changed: ", inLibrary);
    }, [inLibrary])


    useEffect(() => {
        console.log("Fetched comics:", comicDB);
        console.log("Route comicId:", comicId);
    }, [comicDB, comicId]);

    useEffect(() => {
  if (!comicId) return;
  setInLibrary(libraryDB.some(c => c._id === comicId));
}, [libraryDB, comicId]);




    const comic = comicDB.find(c => c._id === comicId);
    const matchComics = libraryDB.find(comicDB => comicDB._id === comicId);

    const handleAddToLibrary = async() => {
        if (!comicId || !token){
            console.warn("Must be logged in to add to library");
            return;
        }
        console.log("Client-side: Sending comicId:", comicId, "with type:", typeof comicId);
        try{
            if (!inLibrary) {
                const updatedLibrary = await addToLibrary(comicId, token);
                console.log("Library updated:", updatedLibrary);
                setInLibrary(true);
                setLibraryDB(updatedLibrary);
                addNotification(`${comic?.title} added to library!`);
                // return;
            }
            else{
                const updatedLibrary = await removeFromLibrary(comicId, token);
                setLibraryDB(updatedLibrary);
                
                setInLibrary(false);
                addNotification(`${comic?.title} removed from library!`);
            }

        }catch(err){
            console.error("Error adding to library", err);
            // alert("Failed to add comic to libray")
            addNotification("Failed to add comic to libray");
        }
    }

    if (!comic){
        return <div>Comic not found</div>
    }

    return (
        <>
        <div>
            <section className="flex flex=row gap-5">
            <Card cardIdDB={comicId} custom="h-[70px] w-[70px]" round={true}/>
            {/* <h3 className="flex flex-col justify-center">{authorUse?.username?? "Default"} </h3>  */}
            </section>

            <div>

                <section className="flex flex-col items-center gap-10">
                    <div className="flex flex-row items-center  justify-center  w-auto gap-7">
                        <article><ComicPage comicIdDB={comicId} size="tiny"/></article>
                        <article> <ComicPage comicIdDB={comicId}  size="md"/></article>
                        <article><ComicPage comicIdDB={comicId}  size="tiny"/></article>
                        
                        
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button text="Start Reading" size="auto"/>
                        {isLoggedIn && (
                        <Button 
                        color="light" 
                        bg="dark" 
                        size="auto"
                        text={!inLibrary?'Add to Library': isHovering?"Remove" : "In Library"} 
                        onClick={handleAddToLibrary}
                        onMouseEnter={()=>inLibrary && setIsHovering(true)}
                        onMouseLeave={()=>inLibrary && setIsHovering(false)}/> 
                        )}
                    </div>
                </section>

                <section className="flex flex-col gap-10 mt-[40px]">
                    <article className="flex flex-col items-center">
                        <h1 className="text-center">{comic.title}</h1>
                        <h2 className="text-[var(--primary)]">VOLUME {comic.volume}</h2>
                    </article>

                    <article className="flex flex-col gap-5 p-[30px] border border-black rounded-2xl">
                        <h2>Description</h2>
                        <p>{comic.description}</p>
                    </article>
                </section>

            </div>
        </div>
        </>
    );
}

export default Preview;