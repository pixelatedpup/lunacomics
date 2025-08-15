import { useNavigate } from "react-router-dom";

interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
    custom?: string;
    id?:string;
    cardid?:number;
    link?:string;
}

const Card = ({custom ="", width="197px", height = "209px", source = "", round=false, id="", link="", cardid}: CardProps) =>{

    const navigate = useNavigate();

      console.log("Custom:", {

        source,
    });

    const handleCardView=(cardid:number) =>{
        navigate(`/preview/${encodeURIComponent(cardid)}`)
    }
    return(
        <>
            <a className="cursor-pointer" onClick={() => handleCardView(cardid || 0)}>
                <div
                    className= {`hover:scale-[108%] hover:border-[3px] hover:border-[var(--accent)]  duration-[0.5s] transition-all bg-[#D1E4DE] ${round? "rounded-2xl": ""} ${custom==""?"":custom} `}
                    style={custom==""?{width, height}: {}}>
                    <img src={source} className={`rounded-2xl object-cover w-full h-full border-0 outline-none shadow-none`}/>
                </div>
            </a>
        </>
    );
}

export default Card;