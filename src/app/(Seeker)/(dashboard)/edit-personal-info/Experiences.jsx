import DeleteTableIcon from "@/asset/Icon/DeleteTableIcon";
import EditTableIcon from "@/asset/Icon/EditTableIcon";
import { Plus } from "lucide-react";
import React from "react";

const Experiences = () => {
  return (
    <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
      <div className="col-span-4  grid-rows-1">
        <p className="mb-[10px] text-[20px]">Work Experiences </p>
        <p className="text-primary text-[16px]">
          Describe your previous and current working experiences
        </p>
      </div>
      <div className="col-span-8  grid-rows-1">
        <div className="flex justify-end mb-8">
          <button className="flex  h-fit items-center gap-[2px] text-primary font-[500] ">
            <Plus color="#F08000" /> Add Experience
          </button>
        </div>
        <div className="flex border-b-2  pb-3 gap-2 justify-between border-gray-100">
          <p className="text-primary  ">Senior UI/UX Designer</p>
          <p className="font-[300] opacity-60 ">Myanmar Tech</p>
          <p className="font-[300] opacity-60 ">Yangon</p>
          <p className="text-primary ">2010 - 2011</p>
          <div className="flex items-center gap-2 cursor-pointer">
            <div>
              <EditTableIcon />
            </div>
            <div>
              <DeleteTableIcon />
            </div>
          </div>
        </div>
        <p className="font-[300] opacity-60 mt-[5px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
};

export default Experiences;
