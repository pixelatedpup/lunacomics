import Card from "../Card";
import { allAuthors } from "../../assets/AllAuthors";
import Input from "../Input";
import { allComics } from "../../assets/AllComics";
import Banner from "../Banner";

const Creators = () => {

    return (
        <>
        <section className="flex gap-20">
        <h1>Creators</h1>
        <div className="flex flex-1 flex-col items-end justify-center">
            <Input custom="w-[383px] h-[35px]"/>
        </div>
        </section>

        <section className="flex flex-row gap-20 w-full justify-evenly mt-[30px] overflow-y-auto">
            {allAuthors.map((creator) => (
                <Banner cardid={creator.id}/>
            )
            )}
        </section>

        <section className="mt-[70px]">
            <h2> Updates </h2>
            <article className="flex flex-row justify-evenly mt-[30px]">
                <Card custom="w-[454px] h-[263px]"/>
                <Card custom="w-[454px] h-[263px]"/>
            </article>
        </section>

        <section className="mt-[70px]">
            <h2>Shop</h2>
            <article className="flex flex-row justify-evenly mt-[30px]">
                <Card custom="w-[280px] h-[280px]" round={true} />
                <Card custom="w-[280px] h-[280px]" round={true}/>
                <Card custom="w-[280px] h-[280px]" round={true}/>
            </article>
        </section>
        </>
    );
}

export default Creators;