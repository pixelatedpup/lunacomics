import React from "react";
import user from "../assets/images/user.png";
import bell from "../assets/images/bell.png";
import like from "../assets/images/like.png"
import comment from "../assets/images/comment.png"
// Define allowed props
type SymbolProps = {
  symbol?: "user" | "bell" | "comment" | "like";
};

const images: Record<NonNullable<SymbolProps["symbol"]>, string> = {
  user,
  bell,
  comment,
  like
};

const Symbol: React.FC<SymbolProps> = ({ symbol = "user" }) => {
  return (
    <img
      src={images[symbol]}
      alt={symbol}
      className="lg:h-[30px] lg:w-[30px] sm:h-[25px] sm:w-[25px] hover:scale-[112%] transition-all duration-[0.3s]"
    />
  );
};

export default Symbol;
