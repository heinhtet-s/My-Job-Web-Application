import DeleteTableIcon from "@/asset/Icon/DeleteTableIcon";
import EditTableIcon from "@/asset/Icon/EditTableIcon";
import { Plus } from "lucide-react";
import React from "react";

const Education = () => {
  return (
    <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
      <div className="col-span-4  grid-rows-1">
        <p className="mb-[10px] text-[20px]">Education </p>
        <p className="text-primary text-[16px]">
          Describe your education background
        </p>
      </div>
      <div className="col-span-8  grid-rows-1">
        <div className="flex justify-end mb-8">
          <button className="flex  h-fit items-center gap-[2px] text-primary font-[500] ">
            <Plus color="#F08000" /> Add Education
          </button>
        </div>
        <div className="flex border-b-2  pb-3 gap-2 justify-between border-gray-100">
          <p className="text-primary  h-fit  ">Build Responsive Real World</p>
          <p className="font-[300] opacity-60 h-fit  ">Udacity Nanodegree</p>
          <p className="text-primary min-w-[80px] h-fit ">2020 - 2020</p>
          <div className="flex items-center gap-2 h-fit cursor-pointer">
            <div>
              <EditTableIcon />
            </div>
            <div>
              <DeleteTableIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
