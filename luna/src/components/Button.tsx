type Size = "sm" | "md" | "lg";
type Color = "white" | "black" | "red" | "blue";

const Button = ({ 
    size = "md", 
    text = "", 
    bg = "black", 
    color = "white" 
}: { 
    size?: Size; 
    text?: string; 
    bg?: Color; 
    color?: Color; 
}) => {
    const sizeClasses = {
        sm: "w-[80px] h-[40px]",
        md: "w-[235px] h-[58px]",
        lg: "w-[160px] h-[60px]",
    };

    const bgClasses = {
        black: "bg-black",
        white: "bg-white",
        red: "bg-red-500",
        blue: "bg-blue-500"
    };

    const textClasses = {
        white: "text-white",
        black: "text-black",
        red: "text-red-500",
        blue: "text-blue-500"
    };

    return (
        <button
            className={`${sizeClasses[size]} ${bgClasses[bg]} ${textClasses[color]} p-[12px] rounded-2xl transition-all duration-[0.5s] hover:scale-[110%] hover:bg-[var(--primary)]`}
        >
            {text}
        </button>
    );
};

export default Button;