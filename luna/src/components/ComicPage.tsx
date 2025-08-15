import Card from "./Card";
import { useWindowSize } from "../hooks/useWindowSize";

type Size = "tiny" | "sm" | "md" | "lg";

interface ComicProps{ 
  source?: string;
  size?: Size;
  description?:string;
  title?:string;
  volume?:number;
  author?:number;
  id?:number;
  comicid?:number;
}

const ComicPage = ({
  source = "",
  size = "md",
  comicid,
  description = "Default",
  title = "Default",
  volume = 0,
  author = 0,
  id = 0
}: ComicProps
) => {
  const sizeClasses: Record<Size, string> = {
    tiny: "w-[162px] h-[261px]",
    sm: "w-[162px] h-[261px]",
    md: "w-[207px] h-[333px]",
    lg: "w-[516px] h-[829px]",
  };

  // Get dynamic size from hook
  const currentDynamicSize = useWindowSize(size);

  // Debug logs
  console.log("ComicPage render:", {
    initialSize: size,
    currentDynamicSize,
    appliedClass: sizeClasses[currentDynamicSize],
    source,
  });

  return (
    <div>
      <Card
        // Pass the Tailwind class directly
        custom={sizeClasses[currentDynamicSize]}
        // Removed fixed width/height to let Tailwind control it
        source={source || "/placeholder.png"} // test placeholder if empty
        cardid = {comicid}
        cardType="cover"
        round={true}
      />
    </div>
  );
};

export default ComicPage;
