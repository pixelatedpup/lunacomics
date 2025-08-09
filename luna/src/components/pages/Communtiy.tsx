const Community = () => {
    const community = [
        {name: "Creator Name",
         likes:"2",
          comments:"4"
        },
        {name: "Creator Name",
         likes:"2",
          comments:"4"
        }

    ]

    return (
        <>
            <h1>Community</h1>
            <article>
                {community.map((com) => (
                    <div className="mt-[70px] mb-[100px] border-b border-b-[2px] pb-[40px]">
                        <div className="flex flex-row gap-5 w-[368px]">
                            <div className="flex-1 h-[100px] w-[100px] bg-black rounded-3xl"></div>
                            <h2 className="flex flex-col justify-center">{com.name}</h2>
                        </div>
                        <div className="w-[867px] h-[459px] bg-black rounded-2xl mt-[30px]"></div>

                        <div className="flex flex-row gap-5 mt-[30px]">
                            <div className="h-[48px] w-[48px] bg-black"> </div>
                            <div className="h-[48px] w-[48px] bg-black"> </div>
                        </div>
                    </div>

                ))}
                
            </article>
        </>
    );
}

export default Community;