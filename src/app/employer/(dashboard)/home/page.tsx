"use client";
import DotIcon from "@/asset/Icon/DotIcon";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CircleUser, FileText, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession() as any;
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Welcome</h1>
      <p className="opactiy-70 mb-[30px]">
        Find your dream careers on Myjobs.com.mm
      </p>
      <div
        className="border bg-[#002745] rounded-[20px]"
        style={{
          flex: "1 1 auto",
          padding: "1rem 1rem",
        }}
      >
        <div className=" flex float-right text-white text-[13px] justify-end">
          Last Login: <span className="text-white"> 25 Aug 2024</span>
        </div>
        <div className="grid  grid-cols-12 items-center  gap-4 lg:grid-cols-12 xl:grid-cols-12">
          <div className="col-span-6 lg:col-span-5 xl:col-span-3 flex flex-col justify-center items-center">
            <img
              src="/image/no-image.png"
              className="w-[150px] h-[150px]  rounded-[20px] "
            />
            {/* <p className="text-[1.5rem] mb-[0.5rem[">
              {session?.user?.FirstName
                ? session?.user?.FirstName + "  " + session?.user?.LastName
                : session?.user?.email}
            </p> */}
          </div>
          <div className="col-span-9 flex items-center gap-8">
            <div className=" flex-wrap lg:flex-nowrap flex gap-[10px] ">
              <div>
                <div className="mb-2">
                  <p className="mb-1 text-white text-[25px] font-[600]  break-words ">
                    {session?.user?.CompanyName}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 font-[300]  text-white break-words ">
                    {session?.user?.MapAddress}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "1 1 300px",
              }}
            >
              <PrimaryBtn text="Public Profile" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-[24px] font-[600] mt-[20px] ">Recent Notifications</p>
    </div>
  );
};

export default page;
