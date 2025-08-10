import { useState, useEffect } from "react";

export type Breakpoint = "tiny" | "sm" | "md" | "lg";

// Match Tailwind's breakpoints
const breakpoints: Record<Exclude<Breakpoint, "tiny">, number> = {
    sm: 480,  // same as tailwind.config.js
    md: 768,
    lg: 1024,
};

const order: Breakpoint[] = ["tiny", "sm", "md", "lg"];

export const useWindowSize = (initialSize: Breakpoint): Breakpoint => {
    const [size, setSize] = useState<Breakpoint>(initialSize);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Figure out screen-based size using Tailwind breakpoints
            let screenSize: Breakpoint = "tiny";
            if (width >= breakpoints.lg) screenSize = "lg";
            else if (width >= breakpoints.md) screenSize = "md";
            else if (width >= breakpoints.sm) screenSize = "sm";

            // Clamp final size to never exceed initialSize
            const initialIndex = order.indexOf(initialSize);
            const screenIndex = order.indexOf(screenSize);
            const finalIndex = Math.min(initialIndex, screenIndex);

            setSize(order[finalIndex]);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [initialSize]);

    return size;
};
