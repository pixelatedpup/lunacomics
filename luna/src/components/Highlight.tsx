import type { ReactNode } from "react";

interface HighlightProps {
    children: ReactNode;
}

const Highlight = ({children}:HighlightProps) => {
    return(
        <>
            <div className="py-[8px] bg-[var(--accent)] text-white rounded-2xl">
                {children}
            </div>
        </>
    )
}

export default Highlight;