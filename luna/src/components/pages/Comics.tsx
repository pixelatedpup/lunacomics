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
        <div className="flex lg:flex-row md:flex-row sm:flex-col">
            {/* Sidebar */}
            <aside className="sticky top-[100px] w-[250px] left-0 p-4 border-r border-gray-200">
                <NavBar>
                    <ul className="flex flex-col lg:flex-col md:flex-col sm:flex-row gap-5 items-center justify-center">
                        <li><p>New</p></li>
                        <li><p>Hot</p></li>
                        <li><p>Top</p></li>
                        <li><p>Best</p></li>
                        <li><p>Genre</p></li>
                    </ul>
                </NavBar>
            </aside>

            {/* Comics Grid */}
            <main className="flex-1 p-4">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-evenly">
                    {comics.map((comic, index) => (
                        <ComicPage key={index} {...comic} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Comics;
