import React from "react";
import user from "../assets/images/user.png";
import bell from "../assets/images/bell.png";

// Define allowed props
type SymbolProps = {
  symbol?: "user" | "bell";
};

const images: Record<NonNullable<SymbolProps["symbol"]>, string> = {
  user,
  bell,
};

const Symbol: React.FC<SymbolProps> = ({ symbol = "user" }) => {
  return (
    <img
      src={images[symbol]}
      alt={symbol}
      className="h-[25px] w-[25px] sm:h-[15px] sm:w-[15px] hover:scale-[112%] transition-all duration-[0.3s]"
    />
  );
};

export default Symbol;
