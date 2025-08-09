
import ComicPage from "../ComicPage"
const Reading = () => {
    return (
        <>
            <div className="flex flex-col gap-10">
                <section className=" flex-1 flex flex-col items-center">
                    <h1>Title</h1>
                    <h2>VOLUME N</h2>

                    <ComicPage size="lg"/>
                </section>

                <section className="flex-1 flex flex-row justify-center gap-5">
                    <ComicPage size="tiny"/>
                    <ComicPage size="tiny"/>
                    <ComicPage size="tiny"/>
                    <ComicPage size="tiny"/>
                    <ComicPage size="tiny"/>
                </section>
            </div>
        </>
    );
}

export default Reading;