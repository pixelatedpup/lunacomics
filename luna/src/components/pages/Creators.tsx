import Card from "../Card";

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
                <Card custom="h-[431px] w-[166px]"/>
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