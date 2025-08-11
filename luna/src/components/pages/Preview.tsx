import Button from "../Button";
import ComicPage from "../ComicPage";

const Preview = () => {
    return (
        <>
        <div>
            <section className="flex flex=row gap-5">
            <div className="w-[57px] h-[57px] bg-black rounded-3xl"></div>
            <h2 className="flex flex-col justify-center">Username </h2>
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
                        <h1>TITLE</h1>
                        <h2>VOLUME 1</h2>
                    </article>

                    <article className="flex flex-col gap-5 p-[30px] border border-black rounded-2xl">
                        <h2>Description</h2>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis vehicula porttitor. Vivamus blandit tincidunt mauris, at tempor felis euismod vel. Sed venenatis mattis gravida. Etiam sit amet ultricies eros. Nam ullamcorper velit quis tellus scelerisque hendrerit. Maecenas nibh leo, maximus eu fermentum sit amet, luctus at arcu. Nulla eu elit rutrum, fringilla purus et, ullamcorper ipsum. Vivamus feugiat id magna vitae efficitur.</p>
                    </article>
                </section>

            </div>
        </div>
        </>
    );
}

export default Preview;