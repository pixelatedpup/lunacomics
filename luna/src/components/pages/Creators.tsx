import Card from "../Card";
import { allAuthors } from "../../assets/AllAuthors";
import Input from "../Input";
import { allComics } from "../../assets/AllComics.tsx";
import Banner from "../Banner";

const Creators = () => {

    return (
        <>
        <section className="flex lg:flex-row flex-col gap-20 md:gap-5 sm:gap-5 ">
            <h1 className="sm:text-center md:text-center sm:text-start md:text-start ">Creators</h1>
            <div className="flex flex-1 flex-col lg:items-end lg:justify-center sm:items-center md:items-center ">
                <Input custom="w-[383px] h-[35px]"/>
            </div>
        </section>

        <section className="flex flex-row gap-20 w-full justify-evenly mt-[30px] overflow-y-auto">
            {allAuthors.map((creator) => (
                <Banner key={creator.id} cardid={creator.id}/>
            ))}

        </section>

        <section className="mt-[70px]">
            <h2> Updates </h2>
            <article className="flex flex-col sm:gap-10 md:gap-10 mt-[30px] border">
 
                <div className="w-full h-[263px] border border-[3px] border-red" ></div>
                <div className="w-full h-[263px]"></div>

            </article>
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