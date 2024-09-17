"use client";
import { inputStyle, labelStyle } from "@/components/ui/form";
import { watch } from "fs";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-[38px] font-[700]"> Jobs Report</h1>
      <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className={labelStyle}>
            To<span className="text-red-800">*</span>
          </label>
          <input type="date" className={inputStyle} />
        </div>
      </div>
    </div>
  );
};

export default page;
