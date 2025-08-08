import Icon from "../Icon"
import Comics from "../ComicPage"


interface LibraryData {
    name: string,
    link: string,
    description: string
}


const Home = () => {
    const library: LibraryData[] = [
        {name: "Default", link : "" , description: ""},
        {name: "Comic 1", link : "" , description: ""},
        {name: "Comic 2", link : "" , description: ""},
        {name: "Comic 3", link : "" , description: ""}
    ]

    const newComics: LibraryData[] = [
        {name: "Comic 1", link : "" , description: ""},
        {name: "Comic 2", link : "" , description: ""},
        {name: "Comic 3", link : "" , description: ""},
        {name: "Comic 4", link : "" , description: ""}
    ] 
    
        const hotComics: LibraryData[] = [
        {name: "Comic 1", link : "" , description: ""},
        {name: "Comic 2", link : "" , description: ""},
        {name: "Comic 3", link : "" , description: ""},
        {name: "Comic 4", link : "" , description: ""}
    ]   
    return (
        <>
        {/* Library Section */}
        <section className="flex flex-1 flex-col pb-10 border-b ">

            <article className="mb-[15px] ">
                <h2>Your library</h2>
            </article>

            <div className="flex flex-wrap justify-evenly gap-7 w-full">
                {library.map((comic) => (
                    <div className="flex flex-col">
                        <Icon/>
                        <p className="text-center mt-[15px]">{comic.name}</p>
                    </div>
                ))}
            </div>

        </section>

        {/* Hot Comics Section */}
        <section className="flex flex-1 flex-col mt-[70px]">

            <article className="mb-[15px]">
                <h2>Hot</h2>
            </article>

            <div className="flex flex-row h-[255px] rounded-2xl bg-[#002C34]">
                <article className="flex flex-col flex-1 gap-15 text-white">
                    <ul className="flex-1 flex flex-col gap-5 px-[75px] justify-center ">
                        <li><h3>1. Issue Name</h3></li>
                        <li><h3>2. Issue Name</h3></li>
                        <li><h3>3. Issue Name</h3></li>
                        <li><h3>4. Issue Name</h3></li>
                    </ul>
                </article>

                <article className="flex-1 flex flex-col justify-center">
                    <div className="w-[443px] h-[178px] border border-[var(--black) bg-[white] rounded-2xl">

                    </div>
                </article>
            </div>
        </section>

        {/* New Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>New Comics</h2>
            </article>

            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full">
                {newComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>

        {/* Top Comics Section */}
        <section className="flex flex-wrap flex-1 flex-col mt-[70px]">
            <article className="mb-[15px]">
                <h2>Top Comics</h2>
            </article>
            <div className="flex flex-wrap flex-row justify-evenly gap-7 w-full ">
                {hotComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;