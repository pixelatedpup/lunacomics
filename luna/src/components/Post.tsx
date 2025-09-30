import Card from "./Card";
import Symbol from "./Symbol";

    const community = [
        {title: "Creator Name",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         likes:"2",
          comments: [{text:""}]
        },
        {title: "Creator Name",
         message: "I really like the new comics by James, it really got me back into comics",
         images:[{}, {}],
         likes:"2",
          comments: [{text:""}]
        },

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
                        <article className="flex flex-row gap-[8px] w-[308px] ">
                            <Card custom="h-[42px] w-[42px]" round={true} cardType="banner" cardid={1}/>
                            <h3 className="flex flex-col justify-center ">{com.name}</h3>
                        </article>

                        {/* Posts*/}
                        <article className="mt-[30px]">
                            <div className="w-full h-[250px] border border-[1px] border-[var(--dark)] rounded-2xl p-[15px] bg-[var(--light)]">
                                    <p className="text-[var(--dark)]">{com.message}</p>
                            </div>
                            {/* <Card custom="h-[459px] w-[867px] sm:w-full border border-black " round={true} cardid={1}/> */}
                        </article>

                        {/* Like and comment buttons*/}
                        <article className="flex flex-row gap-5 mt-[30px]">
                            <div className="flex flex-row gap-[8px]">
                                <Symbol symbol="like" />
                                <p className="flex items-center">{com.likes}</p>
                            </div>
                            <div className="flex flex-row gap-[8px]">
                                <Symbol symbol="comment" />
                                <p className="flex items-center">{com.likes}</p>
                            </div>
                        </article>
                        
                    </div>

                ))}
                
            </section>
        </>
    )
}

export default Post;