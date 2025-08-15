import Button from "../Button";
import ComicPage from "../ComicPage";
import { useParams } from "react-router-dom";

{/* Importing dummy data */}
import { allComics } from "../../assets/AllComics";
import { allAuthors } from "../../assets/AllAuthors";

const Preview = () => {
    const {comicId} = useParams<{comicId: string}>();
    const comic = allComics.find(c => c.id === Number(comicId));

    if (!comic){
        return <div>Comic not found</div>
    }
    return (
        <>
        <div>
            <section className="flex flex=row gap-5">
            <div className="w-[57px] h-[57px] bg-black rounded-3xl"></div>
            <h2 className="flex flex-col justify-center">{allAuthors[comic.author].username} </h2>
            </section>

            <div>

                <section className="flex flex-col items-center gap-10">
                    <div className="flex flex-row items-center gap-10 justify-center">
                        <article><ComicPage size="sm"/></article>
                        <article> <ComicPage size="md"/></article>
                        <article><ComicPage size="sm"/></article>
                    </div>
                    <Button text="Start Reading"/>
                </section>

                <section className="flex flex-col gap-10">
                    <article className="flex flex-col items-center">
                        <h1>{comic.title}</h1>
                        <h2>VOLUME {comic.volume}</h2>
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