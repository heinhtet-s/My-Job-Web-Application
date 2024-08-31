import { cn } from "@/lib/utils";
import React from "react";

const PrimaryBtn = ({
  text,
  handleClick,
  size = "large",
  color,
  fullWidth,
}: {
  text: string;
  handleClick?: () => void;
  size?: string;
  color?: string;
  fullWidth?: boolean;
}) => {
  return (
    <button
      onClick={handleClick ? handleClick : () => {}}
      className={cn(
        "bg-primary text-white text-[18px] font-medium transition-[background-color] rounded-full",
        size === "large" ? " px-5 py-2.5" : "  px-10 py-1.5 ",
        color ? `bg-[${color}]` : "",
        fullWidth ? "w-full" : ""
      )}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
