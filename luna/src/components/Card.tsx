interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
    custom?: string;
    id?:string;
}

const Card = ({custom ="", width="197px", height = "209px", source = "", round=false, id=""}: CardProps) =>{

      console.log("Custom:", {

        source,
    });

    return(
        <>
            <div className= {`hover:scale-[108%] hover:border-[3px] hover:border-[var(--accent)]  duration-[0.5s] transition-all bg-[#D1E4DE] ${round? "rounded-2xl": ""} ${custom==""?"":custom} `}
                 style={custom==""?{width, height}: {}}>
                <img src={source} className={`rounded-2xl object-cover w-full h-full border-0 outline-none shadow-none`}/>
            </div>
        </>
    );
}

export default Card;