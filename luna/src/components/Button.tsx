type Size = "sm" | "md" | "lg";
type Color = "light" | "dark" | "accent" | "primary" | "white";

const Button = ({ 
    size = "md", 
    text = "", 
    bg = "accent", 
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
        accent: "bg-[var(--accent)]",
        light: "bg-[var(--light)]",
        dark: "bg-[var(--dark)]",
        primary: "bg-[var(--primary)]",
        white: "bg-white"
    };

    const textClasses = {
        white: "text-white",
        light: "text-[var(--light)]",
        accent: "bg-[var(--accent)]",
        dark: "text-[var(--dark)]",
        primary: "text-[var(--primary)]",
    };

    return (
        <button
            className={`${sizeClasses[size]} ${bgClasses[bg]} ${textClasses[color]} p-[12px] rounded-2xl transition-all duration-[0.3s] hover:scale-[110%] hover:bg-white hover:border hover:border-black hover:text-black`}
        >
            {text}
        </button>
    );
};

export default Button;