// ComicPage.tsx
import Card from "./Card";
// import { useWindowSize } from "../hooks/useWindowSize";


type Size = "tiny" | "sm" | "md" | "lg";

interface ComicProps {
  // Other props
  size?: Size;
  comicid?: number;
  comicIdDB?:string;
  title?:string;
}

const ComicPage = ({ size = "md", comicid ,comicIdDB="", title}: ComicProps) => {


const sizeClasses: Record<Size, string> = {
  tiny: "w-[108px] h-[174px]",
  sm: "w-[162px] h-[261px]",
  md: "w-[162px] h-[261px]",
  lg: "w-[516px] h-[829px]",
};


  // const currentDynamicSize = useWindowSize(size);

  return (
    <div className={`
                    ${size == "sm" && 'w-[207px] h-[333px]'}
                    ${size == "md" && 'w-[162px] h-[261px]'}
                    ${size == "lg" && 'w-[516px] h-[829px]'}
                    ${size == "tiny" && 'w-[108px] h-[174px]'}
                    flex flex-col gap-[5px] h-auto` }>
      <Card
        custom={sizeClasses[size]}
        cardid={comicid}
        cardType="cover"
        round={true}
        cardIdDB={comicIdDB}
      />

      {title && 
        <h3 className={`w-full whitespace-normal break-words text-center`}>{title} </h3>
      }

    </div>
  );
};

export default ComicPage;