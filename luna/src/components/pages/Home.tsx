import Icon from "../Icon"
import Comics from "../Comics"

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
        <section className="flex flex-1 flex-col">
            <h2>Your library</h2>
            <div className="flex justify-between w-full">
                {library.map((comic) => (
                    <div className="flex flex-col">
                        <Icon/>
                        <p>{comic.name}</p>
                    </div>
                ))}
            </div>

        </section>

        {/* Hot Comics Section */}
        <section>
            <h2>Hot</h2>
            <div className="h-[255px] rounded-2xl bg-[#002C34]">

            </div>
        </section>

        {/* New Comics Section */}
        <section>
            <h2>New Comics</h2>
            <div className="flex flex-row justify-between">
                {newComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>

        {/* Top Comics Section */}
        <section>
            <h2>Top Comics</h2>
            <div className="flex flex-row justify-between">
                {hotComics.map(()=>(
                    <Comics source=""/>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;