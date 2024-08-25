import React from "react";

const SeekerSelectBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <select
      className="block w-full py-1 px-3   text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
      style={{
        padding: "0.375rem 1.5rem 0.375rem 0.75rem",
        backgroundImage:
          "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "16px 12px",
      }}
    >
      <option>{placeholder}</option>
    </select>
  );
};

export default SeekerSelectBox;
