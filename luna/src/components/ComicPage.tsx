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


  const currentDynamicSize = useWindowSize(size);

  return (
    <div className={`lg:w-[207px] md:w-[207px] sm:w-[162px] flex flex-col gap-[5px] h-auto` }>
      <Card
        custom={sizeClasses[currentDynamicSize]}
        cardid={comicid}
        cardType="cover"
        round={true}
      />

      {title && 
        <h3 className={`w-full whitespace-normal break-words text-center`}>{title} </h3>
      }

    </div>
  );
};

export default ComicPage;