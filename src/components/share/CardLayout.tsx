import React from "react";

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="2xl:max-w-[1400px] xl:max-w-[1320px] w-full px-3 mx-auto ">
      {children}
    </div>
  );
};

export default CardLayout;
