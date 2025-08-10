import Card from "./Card";
import { useWindowSize } from "../hooks/useWindowSize";

type Size = "tiny" | "sm" | "md" | "lg";

const ComicPage = ({
  source = "",
  size = "md",
}: {
  source?: string;
  size?: Size;
}) => {
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
      />
    </div>
  );
};

export default ComicPage;
