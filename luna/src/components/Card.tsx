import { useNavigate } from "react-router-dom";
import {allImages} from "../assets/AllImages.tsx"
import { allComics } from "../assets/AllComics.tsx";

type CardType = "icon" | "cover"
interface CardProps {
    width?: string;
    height?: string;
    source?: string;
    round?: boolean;
    custom?: string;
    id?:string;
    cardid?:number;
    link?:string;
    cardType?:CardType;
}

const Card = ({custom ="", width="197px", height = "209px", source = "", round=false, id="", link="", cardid=0, cardType="icon"}: CardProps) =>{

    const navigate = useNavigate();

    const imgSrc = 
                    (()=> {
                        const imgData = allImages.find(img=> img.id === (allComics[cardid].imageId ?? 1));
                        return imgData ? imgData[cardType] : "";
                    })();
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
                    <img src={imgSrc} className={`object-cover w-full h-full border-0 outline-none shadow-none`}/>
                </div>
            </a>
        </>
    );
}

export default Card;