import Card from "./Card";

    const community = [
        {name: "Creator Name",
        image:"",
         likes:"2",
          comments: [{text:""}]
        },

        {name: "Creator Name",
        image:"",
         likes:"2",
          comments: [{text:""}]
        }

    ]

interface PostItems {
    name?:string;
    image?:string;
    likes?:number;
    comments?:string[]
}

const Post = ({name="Default"}:PostItems) =>{
    return(
        <>
            <section>
                {community.map((com) => (
                    <div className="mt-[70px] mb-[100px] border-b border-b-[2px] pb-[40px]">

                        {/* Top section with icon and creator name*/}
                        <article className="flex flex-row gap-10 w-[308px]">
                            <div className="flex-1 ">
                                <Card custom="h-[100px] w-[100px]" round={true} cardType="banner" cardid={1}/>
                            </div>
                            <h2 className="flex flex-col justify-center">{com.name}</h2>
                        </article>

                        {/* actual post image*/}
                        <article className="mt-[30px]">

                            <Card custom="h-[459px] w-[867px] sm:w-full border border-black " round={true} cardid={1}/>
                        </article>

                        {/* Like and comment buttons*/}
                        <article className="flex flex-row gap-5 mt-[30px]">
                            <Card custom="h-[48px] w-[48px]" round={true} cardid={1}/>
                            <Card custom="h-[48px] w-[48px]" round={true} cardid={1}/>
                        </article>
                        
                    </div>

                ))}
                
            </section>
        </>
    )
}

export default Post;