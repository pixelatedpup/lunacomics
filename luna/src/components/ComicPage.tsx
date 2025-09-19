// ComicPage.tsx
import Card from "./Card";
import { useWindowSize } from "../hooks/useWindowSize";

type Size = "tiny" | "sm" | "md" | "lg";

interface ComicProps {
  // Other props
  size?: Size;
  comicid?: number;
  title?:string;
}

const ComicPage = ({ size = "md", comicid , title}: ComicProps) => {
  const sizeClasses: Record<Size, string> = {
    tiny: "w-[162px] h-[261px]",
    sm: "w-[162px] h-[261px]",
    md: "w-[207px] h-[333px]",
    lg: "w-[516px] h-[829px]",
  };

  const widthClasses: Record<Size,string> = {
    tiny: "w-[162px]",
    sm: "w-[162px]",
    md: "w-[207px]",
    lg: "w-[516px]",
  }

  const currentDynamicSize = useWindowSize(size);

  return (
    <div className={`md:${widthClasses["md"]} sm:${widthClasses["sm"]} flex flex-col gap-[5px]` }>
      <Card
        custom={sizeClasses[currentDynamicSize]}
        cardid={comicid}
        cardType="cover"
        round={true}
      />

      {title && 
      <h3 className="w-full break-words text-wrap text-center">{title}</h3>
      }

    </div>
  );
};

export default ComicPage;