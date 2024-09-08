"use client";
import CardLayout from "@/components/share/CardLayout";
import { Earth } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const CompanyDetail = ({ companyLists }) => {
  const params = useParams();
  const { id: JobId } = params;
  const data = companyLists?.value?.filter((el) => el?.Id === JobId)?.[0];
 
  return (
    <div>
      <div
        className=" bg-cover bg-center bg-no-repeat h-[460px] relative "
        style={{
          backgroundImage: "url('/image/banner3.png')",
        }}
      >
        <div className="bg-[rgba(0,0,0,0.3)] absolute inset-0 z-10"></div>
        <div className="absolute left-0 right-0 bottom-[60px] z-20">
          <CardLayout>
            <div className="flex  items-center">
              <img
                src={
                  data?.CompanyLogo ? data.CompanyLogo : "/image/no-image.png"
                }
                className="w-[120px] h-[120px]"
              />
              <div className="ml-[20px]">
                <p className="text-[34px] font-[700] text-white">
                  {data?.CompanyName}
                </p>
                <div className="flex items-center">
                  <Earth
                    width="12px"
                    color="white"
                    height="12px"
                    className="mt-[3px] ml-[5px]"
                  />
                  <p className="text-white font-light">{data?.MapAddress}</p>
                </div>
              </div>
            </div>
          </CardLayout>
        </div>
      </div>
      <div className="mt-100">
        <CardLayout>
          <div className="grid mt-[15px]   gap-8 grid-cols-12">
            <div className=" lg:col-span-7 xl:col-span-8">
              <div>
                <h1 className="font-bold text-[28px] tracking-[-1px] mb-[30px]">
                  About Me
                </h1>
                <p className="font-light leading-[1.7rem]">{data?.About}</p>
                <p></p>
              </div>
            </div>
            <div className=" lg:col-span-6 xl:col-span-4">
              <div className="p-[30px] rounded-[30px] bg-[#f7e2cb] ">
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Industry </p>
                  <p className="font-[500]">{data?.Industry?.TitleEng}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Company size</p>
                  <p className="font-[500]">{data?.NumberOfEmployee}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Founded in</p>
                  <p className="font-[500]">1996</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Phone </p>
                  <p className="font-[500]">09.........</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Email </p>
                  <p className="font-[500]">{data?.Email}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Location </p>
                  <p className="font-[500]">{data?.MapAddress}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Website</p>
                  <p className="font-[500]">{data?.WebsiteAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

export default CompanyDetail;
