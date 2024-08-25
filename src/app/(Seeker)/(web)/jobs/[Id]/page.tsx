import CardLayout from "@/components/share/CardLayout";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Heart, Share2 } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <CardLayout>
        <div className="mx-[-15px] flex justify-center">
          <div className="w-3/4">
            <div className="relative">
              <img
                className="h-[400px] mt-[50px] rounded-[20px] w-full"
                src="/image/banner3.png"
              />
              <div>
                <img
                  className="w-[114px] h-[114px] mx-auto mt-[-60px]"
                  src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/bb2e01ff-5e10-4ee0-8ba6-2bf377fbb865.jfif"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold mt-5 text-[34px]  tracking-[-1px]">
                Head of Operation (Operation Manager)
              </h3>
              <p>
                by First National Insurance (General) Co., Ltd in Botataung
                Township, Yangon, Myanmar
              </p>
              <div className="flex gap-4 mt-10">
                <div className="cursor-pointer border flex justify-center items-center border-widgetColor text-widgetColor text-center h-[46px] w-[46px] rounded-full text-[15px] transition-[color,background-color] duration-300 ease-in-out hover:bg-widgetColor group">
                  <Heart
                    strokeWidth={1.75}
                    className="group-hover:stroke-white"
                  />
                </div>
                <div className="cursor-pointer border flex justify-center items-center border-widgetColor text-widgetColor text-center h-[46px] w-[46px] rounded-full text-[15px] transition-[color,background-color] duration-300 ease-in-out hover:bg-widgetColor group">
                  <Share2
                    strokeWidth={1.75}
                    className="group-hover:stroke-white"
                  />
                </div>
                <PrimaryBtn text="Apply Now" />
              </div>
            </div>
            <div className="flex mt-5 justify-center">
              <p className="ml-10 text-[13px] font-light">
                Accounting, Auditing & Finance
              </p>
              <p className="ml-10 text-[13px] text-muteColor font-light">
                Date Posted At Jul 26, 2024
              </p>
            </div>
            <div className="flex flex-wrap -mx-[15px] mt-[100px]">
              <div className="grid mt-[15px]   gap-4 grid-cols-12">
                <div className="col-span-6 lg:col-span-7 xxl:col-span-8">
                  <h1 className="mb-5">Description and Requirement</h1>
                  <ul className="list-disc ml-5">
                    <li className="mb-2">
                      To assist the Audit Manager and ensure strict adherence to
                      the audit plan
                    </li>
                    <li className="mb-2">
                      To assist the Audit Manager and ensure strict adherence to
                      the audit plan
                    </li>
                    <li className="mb-2">
                      To assist the Audit Manager and ensure strict adherence to
                      the audit plan
                    </li>
                  </ul>
                </div>
                <div className="col-span-6 lg:col-span-5 xxl:col-span-4  gap-[20px] flex flex-col justify-center items-center">
                  <div className="bg-jobBg w-full p-[30px] rounded-[30px]">
                    <div>
                      <p className="opacity-70 text-[13px]">
                        Experience Length
                      </p>
                      <p className="font-[500]">2 years</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">
                        Experience Length
                      </p>
                      <p className="font-[500]">2 years</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Work Level</p>
                      <p className="font-[500]">Management Level</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Employment Type</p>
                      <p className="font-[500]">Full Time</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Qualification</p>
                      <p className="font-[500]">Degree</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Salary</p>
                      <p className="font-[500]">Negotiable</p>
                    </div>
                  </div>
                  <div className="bg-jobBg  w-full  p-[30px] rounded-[30px]">
                    <div className="flex mb-5">
                      <img
                        className="block w-[60px] h-[60px] rounded-[14px] bg-center bg-cover bg-no-repeat flex-shrink-0"
                        src="/image/banner3.png"
                      />
                      <div className="ml-5">
                        <p className="break-words">
                          First National Insurance (General) Co., Ltd
                        </p>
                        <p className="text-[#007bff] text-[13px]">
                          View Profile
                        </p>
                      </div>
                    </div>

                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Industry </p>
                      <p className="font-[500]">
                        Banking, Micro-finance & Insurance
                      </p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Company size</p>
                      <p className="font-[500]">301-600</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Founded in</p>
                      <p className="font-[500]">2013</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Location</p>
                      <p className="font-[500]">Yangon, Yangon, Myanmar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default page;
