import Card from "./Card";
import { useWindowSize } from "../hooks/useWindowSize";

type IconSize = "tiny" | "sm" | "md" | "lg";

interface IconProps {
  iconid?: number;
  size?: IconSize; // default size limit
}

const Icon = ({ iconid, size = "md" }: IconProps) => {
  const sizeClasses: Record<IconSize, string> = {
    tiny: "w-[70px] h-[70px]",   // optional, add a really small size
    sm: "w-[100px] h-[100px]",
    md: "w-[140px] h-[140px]",
    lg: "w-[200px] h-[200px]",
  };

  // 🔑 Get responsive size from your hook
  const currentDynamicSize = useWindowSize(size);

  console.log("Icon render:", {
    initialSize: size,
    currentDynamicSize,
    appliedClass: sizeClasses[currentDynamicSize],
  });

  return (
    <Card
      custom={sizeClasses[currentDynamicSize]} 
      source=""
      round={true}
      cardid={iconid}
      cardType="icon"
    />
  );
};

export default Icon;
