import { Plus } from "lucide-react";
import React from "react";

const LanguageSkill = () => {
  return (
    <>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Languages </p>
        </div>
        <div className="col-span-5 grid-rows-1    ">
          <div className="bg-[#E6F0F9] flex  px-[4px] rounded-[30px] py-[5px]">
            <p className="flex-1 text-center">Chinese</p>
            <p className="flex-1 text-center">Intermediate</p>
            <p className="flex-1 text-center">
              <span>Edit </span>|<span> Delete</span>
            </p>
          </div>
        </div>
        <div className="col-span-3  grid-rows-1 flex justify-center">
          <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
            <Plus color="#F08000" />
            Add Language
          </button>
        </div>
      </div>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Skills </p>
        </div>
        <div className="col-span-5 grid-rows-1   ">
          <div className="bg-[#E6F0F9]  px-[4px]  my-3 flex  rounded-[30px] py-[5px]">
            <p className="flex-1 text-center">Management</p>
            <p className="flex-1 text-center">1 Year</p>
            <p className="flex-1 text-center">
              <span>Edit </span>|<span> Delete</span>
            </p>
          </div>
        </div>
        <div className="col-span-3  grid-rows-1 flex justify-center">
          <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
            <Plus color="#F08000" />
            Add Skill
          </button>
        </div>
      </div>
    </>
  );
};

export default LanguageSkill;
