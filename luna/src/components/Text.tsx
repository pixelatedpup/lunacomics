import type { CSSProperties } from "react";
import { useState } from "react";

interface TextProps {
  id?: string;
  name?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  style?: CSSProperties;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Text = ({
  id = "notes",
  name = "notes",
  rows = 5,
  cols = 50,
  placeholder = "What are you up to?",
  style = { resize: "none" },
  value,
  onChange,
}: TextProps) => {
  const [message, setMessage] = useState("");

  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      style={style}
      value={value}
      onChange={onChange}
      className="border border-[3px] border-[var(--primary)] w-full rounded-2xl p-[15px]"
    />
  );
};

export default Text;
