interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
    custom?: string;
}

const Card = ({custom ="", width="197px", height = "209px", source = "", round=false}: CardProps) =>{

      console.log("Custom:", {

        source,
    });

    return(
        <>
            <div className= {`bg-[#D1E4DE] ${round? "rounded-2xl": ""} ${custom==""?"":custom} `}
                 style={custom==""?{width, height}: {}}>
                <img src={source} className={`rounded-2xl object-cover w-full h-full border-0 outline-none shadow-none`}/>
            </div>
        </>
    );
}

export default Card;