import React from "react";

const PrimaryBtn = ({ text }: { text: string }) => {
  return (
    <button className="bg-primary text-white text-[18px] font-medium px-5 py-2.5 transition-[background-color] rounded-full">
      {text}
    </button>
  );
};

export default PrimaryBtn;
