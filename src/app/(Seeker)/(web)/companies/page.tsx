"use client";
import CardLayout from "@/components/share/CardLayout";
import SeekerSelectBox from "@/components/share/SeekerSelectBox";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="py-[60px]">
        <CardLayout>
          <p className="font-bold text-[48px] tracking-[-2px]">
            Search Companies
          </p>
          <p className="text-[18px]">
            Work for the best companies in the world
          </p>
          <div className=" border flex items-center border-[#dedede] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.05)] h-[80px] rounded-[40px] pl-[20px] mt-3 lg:mt-6 lg:flex-none lg:w-[41.66666667%]">
            <div className="lg:flex-1 lg:w-auto w-full">
              <div className="relative flex flex-wrap items-center w-full">
                <Search strokeWidth={2.5} width={"16px"} />
                <input
                  type="text"
                  placeholder="Enter Keyword"
                  className="relative flex flex-wrap items-stretch w-full flex-1 min-w-0  px-3 py-1.5 text-base font-light text-pxpTextColor bg-transparent border border-none outline-none appearance-none"
                />
              </div>
            </div>
            <div className="lg:flex-none lg:w-auto w-full">
              <button className=" h-14 border-0 px-[20px] mr-[13px] rounded-[27px] text-white bg-primary transition-colors">
                Find Companies
              </button>
            </div>
          </div>
        </CardLayout>
      </div>
      <div className="bg-searchJobBg py-[100px]">
        <CardLayout>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[22px] font-[600] text-widgetColor">
              Showing 9 Jobs
            </h3>
            <div className="w-[155px]">
              <SeekerSelectBox placeholder="Most relevant" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {Array(5)
              .fill("")
              .map((str: string, index: number) => (
                <div
                  className="col-span-1 min-h-[300px]"
                  onClick={() => router.push("/companies/id")}
                  key={index}
                >
                  <div className="shadow-[0_10px_20px_rgba(0,0,0,0.04)] bg-white p-[30px] rounded-[30px] flex flex-col justify-between h-full no-underline">
                    <img
                      className="w-[80px] h-[80px] object-contain"
                      src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/bb2e01ff-5e10-4ee0-8ba6-2bf377fbb865.jfif"
                      alt="logo"
                    />
                    <p className="block cursor-pointer text-[18px] font-semibold mt-[10px] text-w transition-[color] duration-0.5 no-underline hover:text-primary">
                      AA Medical
                    </p>
                    <div>
                      <div className="text-[14px] font-light mt-[20px] h-[5em] overflow-y-hidden text-ellipsis leading-[1.5rem] opacity-70">
                        Established in 1996, AA Medical Products Ltd. has been
                        making
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

export default page;
