import type { CSSProperties } from "react";

interface TextProps{
    id?: string;
    name?:string;
    rows?:number;
    cols?:number;
    placeholder?:string;
    style?:CSSProperties;
}


const Text = ({id = "notes", name= "notes", rows=5, cols=50,placeholder="What are you up to?",style={resize: 'none'}}:TextProps) => {
    return (
<textarea
  id={id}
  name={name}
  rows={rows}
  cols={cols}
  placeholder={placeholder}
  style={style}

  className="border border-[3px] border-[var(--primary)] w-full rounded-2xl p-[15px]"
></textarea>
    );
}

export default Text;