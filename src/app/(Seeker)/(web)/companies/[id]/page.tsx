"use client";
import CardLayout from "@/components/share/CardLayout";
import { Earth } from "lucide-react";
import React from "react";

const page = () => {
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
                src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/bb2e01ff-5e10-4ee0-8ba6-2bf377fbb865.jfif"
                className="w-[120px] h-[120px]"
              />
              <div className="ml-[20px]">
                <p className="text-[34px] font-[700] text-white">AA Medical</p>
                <div className="flex items-center">
                  <Earth
                    width="12px"
                    color="white"
                    height="12px"
                    className="mt-[3px] ml-[5px]"
                  />
                  <p className="text-white font-light">, Yangon, Myanmar</p>
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
                <p className="font-light leading-[1.7rem]">
                  Established in 1996, AA Medical Products Ltd. has been making
                  healthcare available across Myanmar for more than two decades.
                  The company is delivering top medical healthcare products and
                  services to millions of people every day. It has established a
                  strong network across the country with 15 distribution
                  facilities within all states and fleet of more than 150
                  vehicles. Its network servicing 19,000 hospitals, clinics,
                  pharmacies and drug stores and allow AA Medical to reach every
                  customers in every area of the country making AA Medical one
                  of the largest pharmaceutical company in Myanmar.
                </p>
                <p></p>
              </div>
            </div>
            <div className=" lg:col-span-6 xl:col-span-4">
              <div className="p-[30px] rounded-[30px] bg-[#f7e2cb] ">
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Industry </p>
                  <p className="font-[500]">
                    Banking, Micro-finance & Insurance
                  </p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Company size</p>
                  <p className="font-[500]">8</p>
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
                  <p className="font-[500]">hr@pacific-aa.com</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Location </p>
                  <p className="font-[500]">, Yangon, Myanmar</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Website</p>
                  <p className="font-[500]">https://pacific-aa.com.mm/</p>
                </div>
              </div>
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

export default page;
