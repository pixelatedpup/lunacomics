type Size = "sm" | "md" | "auto";
type Color = "light" | "dark" | "accent" | "primary" | "white";
type Button = "button" | "submit" | "reset";

interface ButtonProps{
    size?: Size; 
    text?: string; 
    bg?: Color; 
    color?: Color; 
    type?:Button;
    onClick?:React.MouseEventHandler<HTMLButtonElement>;
    onMouseEnter?:React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?:React.MouseEventHandler<HTMLButtonElement>;
   
}

const Button = ({ 
    size = "md", 
    text = "", 
    bg = "accent", 
    color = "white" ,
    type="button",
    onClick,
    onMouseEnter,
    onMouseLeave
}:ButtonProps) => {
    const sizeClasses = {
        sm: "w-[80px] h-[40px]",
        md: "w-[120px] h-[35px]",
        auto: "w-auto h-auto p-[6px] px-[10px]",
    };

    const bgClasses = {
        accent: "bg-[var(--accent)]",
        light: "bg-[var(--light)] border border-[black]",
        dark: "bg-[var(--dark)]",
        primary: "bg-[var(--primary)]",
        white: "bg-white"
    };

    const textClasses = {
        white: "text-white",
        light: "text-[var(--light)]",
        accent: "text-[var(--accent)]",
        dark: "text-[var(--dark)]",
        primary: "text-[var(--primary)]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${sizeClasses[size]} ${bgClasses[bg]} ${textClasses[color]} p-[12px] rounded-2xl transition-all duration-[0.3s] hover:scale-[110%] hover:bg-white hover:border hover:border-black hover:text-black`}
        >
            {text}
        </button>
    );
};

export default Button;