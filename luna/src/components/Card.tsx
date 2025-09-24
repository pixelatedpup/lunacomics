import { useNavigate } from "react-router-dom";
import { allImages } from "../assets/AllImages.tsx";
import { allComics } from "../assets/AllComics.tsx";
import { useEffect, useState } from "react";
import { useComics } from "../hooks/useComics.tsx";

type CardType = "icon" | "cover" | "banner";

interface CardProps {
  width?: string;     
  height?: string;    
  source?: string;
  round?: boolean;
  custom?: string;   
  id?: string;
  cardid?: number;
  link?: string;
  cardType?: CardType;
  cardIdDB?:string;
}

const Card = ({
  custom = "",
  width = "197px",
  height = "209px",
  source = "",
  round = false,
  id = "",
  link = "",
  cardid = 17,
  cardType = "icon",
  cardIdDB = ""
}: CardProps) => {
  const navigate = useNavigate();
  const {comicsDb, loading} = useComics();

    
  useEffect(() => {
    console.log(cardIdDB);
  }, [cardIdDB])

  if (loading) return <div>Loading...</div>;

  const imgSrc = (() => {
    if (cardIdDB) {
      // Use DB comic if available
      const dbComic = comicsDb?.find(c => c._id === cardIdDB); // you may need to pass comicDB down as prop
      if (dbComic) {
        const imgData = allImages.find((img) => img.id === dbComic.imageId);
        return imgData ? imgData[cardType] : "";
      }
    }

    // Fallback to local dummy data
    const comic = allComics.find(c => c.id === cardid) ?? allComics[0];
    const imgData = allImages.find((img) => img.id === (comic.imageId ?? 17));
    return imgData ? imgData[cardType] : "";
  })();


  const handleCardView = (cardid: string | "") => {

    if (!cardid) return;
    cardType !== "banner"
      ? navigate(`/preview/${encodeURIComponent(cardid)}`)
      : navigate(`/creator/${encodeURIComponent(cardid)}`);
  };

  return (
    <a className="cursor-pointer" onClick={() => handleCardView(cardIdDB || " ")}>
      <div
        className={`
          hover:scale-[108%] hover:border-[3px] hover:border-[var(--accent)] duration-[0.5s] transition-all 
          bg-[#D1E4DE] 
          ${round ? "rounded-xl" : ""} 
          ${custom}
        `}
        style={custom === "" ? { width, height } : {}}
      >
        <img
          src={imgSrc}
          className={`
            ${round ? "rounded-xl" : ""} 
            object-cover w-full h-full border-0 outline-none shadow-none
          `}
        />
      </div>
    </a>
  );
};

export default Card;
