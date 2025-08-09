const Creators = () => {
    const creators = [
        {name: "Name",
        user:"Username",
        img:""
        },

        {name: "Name",
        user:"Username",
        img:""
        }
        ,

        {name: "Name",
        user:"Username",
        img:""
        },

        {name: "Name",
        user:"Username",
        img:""
        }
        
    ]
    return (
        <>
        <h1>Creators</h1>

        <section className="flex flex-row w-full justify-evenly mt-[30px]">
            {creators.map((creator) => (
                <div className="border bg-black h-[431px] w-[166px]">
                    <h2>{creator.name}</h2>
                    <h4>{creator.user}</h4>
                </div>
            )
            )}
        </section>

        <section className="mt-[70px]">
            <h2> Updates </h2>
            <article className="flex flex-row justify-evenly mt-[30px]">
                <div className="w-[454px] h-[263px] border bg-black">

                </div>
                <div className="w-[454px] h-[263px] border bg-black">

                </div>
            </article>
        </section>

        <section className="mt-[70px]">
            <h2>Shop</h2>
            <article className="flex flex-row justify-evenly mt-[30px]">
                <div className="rounded-2xl h-[280px] w-[280px] bg-black"></div>
                <div className="rounded-2xl h-[280px] w-[280px] bg-black"></div>
                <div className="rounded-2xl h-[280px] w-[280px] bg-black"></div>
            </article>
        </section>
        </>
    );
}

export default Creators;