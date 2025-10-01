import Card from "../Card";
import { allAuthors } from "../../assets/AllAuthors";
import Input from "../Input";
import { allComics } from "../../assets/AllComics.tsx";
import Banner from "../Banner";
import { fetchCreators, followAuthor, type Creator } from "../../api/authorApi.tsx";
import { useState,useEffect } from "react";
import { useUser } from "../../hooks/useUser.tsx";
const Creators = () => {

    

    const [creators, setCreators] = useState<Creator[]>([]);
    
    const updates= [
        {title: "New Upload",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         author:""
        },
        {title: "New Upload",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         author:""
        },

    ]
    useEffect(()=>{


        fetchCreators()
        .then(setCreators)
        .catch((err) => {
            console.error("Failed to get and store creators", err)
        })
    },[])

    return (
        <>
            <section >
                <h2> Updates </h2>
                <article className="flex flex-col sm:gap-10 lg:gap-10 md:gap-10 mt-[30px] ">
    
                    <div className="flex flex-row gap-[10px] overflow-x-auto w-full">
                        {updates.map ((update, index) => (
                                <div className="flex flex-col gap-5">
                                    <div className="w-[350px] h-[170px] p-[15px] border border-[var(--dark)] rounded-2xl">
                                        <p>{update.message}</p>
                                    </div>
                                    <div className="h-[40px] w-[40px] bg-[black]"></div>
                                </div>
                            
                        ))}
                    </div>
                    

                </article>
            </section>

        <section className="flex lg:flex-row md:flex-row flex-col gap-20 md:gap-5 sm:gap-5 mt-[50px]">
            <h2 className="sm:text-center md:text-center sm:text-start md:text-start ">Creators</h2>
            <div className="flex flex-1 flex-col lg:items-end lg:justify-center sm:items-center md:items-center ">
                <Input custom="w-[383px] h-[35px]"/>
            </div>
        </section>

        <section className="flex flex-row gap-20 w-full justify-evenly mt-[30px] overflow-y-auto">
            {creators.map((creator,index) => (
                <div className="flex flex-col gap-[8px]">
                <Banner key={index} cardid={creator.imageId} otherId={creator._id}/>

                <h2 className="text-center font-bold">{creator.name}</h2>
                <h3 className="text-center text-[var(--primary)]">@{creator.username}</h3>
                </div>
            ))}

        </section>



        <section className="mt-[70px]">
            <h2>Shop</h2>
            <article className="flex flex-row sm:flex-wrap md:flex-wrapsm:gap-10 md:gap-10 sm:items-center md:items-center justify-evenly mt-[30px]">
                <div className="w-[280px] h-[280px] sm:w-[120px] sm:h-[120px] border" ></div>
                <div className="w-[280px] h-[280px] sm:w-[120px] sm:h-[120px] border"></div>
                <div className="w-[280px] h-[280px] sm:w-[120px] sm:h-[120px] border"></div>
            </article>
        </section>
        </>
    );
}

export default Creators;