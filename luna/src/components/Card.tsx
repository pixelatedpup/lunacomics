interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
}

const Card = ({width="197px", height = "209px", source = "", round=false}: CardProps) =>{
    return(
        <>
            <div className= {`border border-[1px]  bg-[#D1E4DE] ${round? "rounded-2xl": ""}`}
                 style={{width, height}}>
                <img src={source} className="object-cover w-full h-full"/>
            </div>
        </>
    );
}

export default Card;