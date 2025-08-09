interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
    custom?: string;
}

const Card = ({custom ="", width="197px", height = "209px", source = "", round=false}: CardProps) =>{
    return(
        <>
            <div className= {`bg-[#D1E4DE] ${round? "rounded-2xl": ""}`}
                 style={custom==""?{width, height}: {}}>
                <img src={source} className={`${custom==""?"":custom} rounded-2xl object-cover w-full h-full border-0 outline-none shadow-none`}/>
            </div>
        </>
    );
}

export default Card;