import NavBar from "../NavBar.tsx";
import ComicPage from "../ComicPage.tsx";
import SectionBar from "../SectionBar.tsx";
import { fetchComicByTag, type Comic, fetchUserLibrary } from "../../api/comicApi.tsx"
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser.tsx";
import Button from "../Button.tsx";
import { fetchCreators , type CreatorUse} from "../../api/authorApi.tsx";
import { data } from "framer-motion/client";
import Icon from "../Icon.tsx";
import DashModal from "../DashModal.tsx";

const Profile= () => {
        const[libraryDB, setLibraryDB] = useState<Comic[]>([])
        const[creatorsDB, setCreatorsDB] = useState<CreatorUse[]>([])
        const [isLoading, setIsLoading] = useState(true);
        const[openModal, setOpenModal] = useState(false);

        const {user, token, isLoggedIn} = useUser();
        

        useEffect(() => {
            if(!isLoggedIn || !user) return;
    
            fetchUserLibrary(user.id)
                .then(setLibraryDB)
                .catch((err)=> {
                    console.error("Failed to fetch library:", err);
                });

        //     fetchCreators()
        //     .then((data)=>{
        //         setCreatorsDB(data);
        //     }
        //     )
        //     .catch((err)=> {
        //         console.error("Failed to return all Creators", err)
        //     })
        //     .finally(()=>{
        //         console.log("Here are the following creators: ", data);
        //         setIsLoading(false)
        // })
                console.log("Current user details: ", user);
        }, [isLoggedIn, user]);

    return (
        <>

        <section>
            {openModal && (<DashModal handle={setOpenModal} value={openModal} />)}
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
                <h1> </h1>
                <SectionBar/>

                {/* Comics Grid */}
                <main className="flex flex-col gap-7 flex-1 p-4 lg:mt-0 md:mt-[40px] sm:mt-[40px]">
                    <section className="flex  w-full border-b p-[20px]">
                        <div className="flex gap-7">
                            <div className="flex justify-start h-auto w-[100px]  items-center w-full h-full">
                                <Icon iconid={Number(user?.imageId)}/>
                            </div>
                            <div className="flex justify-end h-full w-[200px]">
                                <div className="flex flex-col">
                                    <h2>{user?.name}</h2>
                                    <h3>{user?.username}</h3>
                                    <h3>{user?.dateCreated}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col  items-end w-full gap-7">
                            <div className="flex flex-col">
                                <h3>{user?.followers.length !== 0 ? user?.followers.length : "0"} Followers</h3>
                                <h3>{user?.following.length !== 0 ? user?.following.length : "0"} Following </h3>
                            </div>
                            <div className="flex flex-row">
                                <Button text="Dashboard" color="dark" bg="light" size="auto" onClick={() => setOpenModal(true)}/>
                            </div>
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

export default Profile;