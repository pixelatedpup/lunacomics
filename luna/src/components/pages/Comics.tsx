import NavBar from "../NavBar";
import ComicPage from "../ComicPage";

const Comics = () => {
    const comics = [
        { title: "Title 1", img: "", link: "" },
        { title: "Title 2", img: "", link: "" },
        { title: "Title 3", img: "", link: "" },
        { title: "Title 4", img: "", link: "" },
        { title: "Title 5", img: "", link: "" },
        { title: "Title 6", img: "", link: "" }
    ];

    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            {/* Sidebar */}
            
                <NavBar>
                        <li><p>New</p></li>
                        <li><p>Hot</p></li>
                        <li><p>Top</p></li>
                        <li><p>Best</p></li>
                        <li><p>Genre</p></li>
                </NavBar>


            {/* Comics Grid */}
            <main className="flex flex-1 p-4">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {comics.map((comic, index) => (
                        <ComicPage key={index} {...comic} />
                    ))}
                </section>
            </main>
        </div>
    )

};

export default Comics;
