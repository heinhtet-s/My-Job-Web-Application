"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Post a Job</h1>
      <p className="opactiy-70 mb-[30px]">Add Your Job details</p>
      <div className=" grid grid-cols-12 mb-[10px] items-center gap-[15px]">
        <div className="col-span-6">
          <div className={JobPostCard}>
            <p className="text-[16px] mb-[0.5rem]">Select Job unit type </p>
            <div className="flex  items-center  gap-8  ">
              <div className="flex items-center ">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 "
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  Default radio
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  Highlight
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  Spotlight
                </label>
              </div>
            </div>
            <label className="inline-flex items-center  cursor-pointer mt-[10px]">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[30px] h-[16px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[12px] after:h-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-[300] text-gray-900 dark:text-gray-300">
                Make Anonymous
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-6">
          <div className={JobPostCard}>
            <p className="text-[16px] mb-[0.5rem]">Select Job expiry date </p>
            <div className="flex  items-center  gap-8  ">
              <div className="flex items-center ">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 "
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  1 Month
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  2 Months{" "}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-[300] text-gray-900 "
                >
                  3 Months
                </label>
              </div>
            </div>
            <label className="inline-flex items-center  cursor-pointer mt-[10px]">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[30px] h-[16px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[12px] after:h-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-[300] text-gray-900 dark:text-gray-300">
                Make Anonymous
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className={JobPostCard}>
        <p className="text-[16px] mb-[0.5rem]">Select Job unit type </p>
        <div className="flex  items-center  gap-8  ">
          <div className="flex items-center ">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-[300] text-gray-900 "
            >
              Default radio
            </label>
          </div>
          <div className="flex items-center ">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-[300] text-gray-900 "
            >
              Highlight
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-[300] text-gray-900 "
            >
              Spotlight
            </label>
          </div>
        </div>
        <label className="inline-flex items-center  cursor-pointer mt-[10px]">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-[30px] h-[16px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[12px] after:h-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          <span className="ms-3 text-sm font-[300] text-gray-900 dark:text-gray-300">
            Make Anonymous
          </span>
        </label>
      </div>
    </div>
  );
};
const JobPostCard =
  "bg-white p-[1rem] rounded-[15px] shadow-md shadow-black/5 ";
export default page;
