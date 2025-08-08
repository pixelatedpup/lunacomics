interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
}

const Card = ({width="197px", height = "209px", source = "", round=false}: CardProps) =>{
    return(
        <>
            <div className= {`bg-[#D1E4DE] ${round? "rounded-2xl": ""}`}
                 style={{width, height}}>
                <img src={source} className="rounded-2xl object-cover w-full h-full border-0 outline-none shadow-none"/>
            </div>
        </>
    );
}

export default Card;