"use client";
import CardLayout from "@/components/share/CardLayout";
import { QrCode } from "lucide-react";
import React from "react";
const page = () => {
  return (
    <CardLayout>
      <div className="grid pt-[15px]   gap-8 grid-cols-12">
        <div className="col-span-9 relative">
          <div
            className=" bg-cover bg-center bg-no-repeat rounded-[30px] h-[460px] w-full relative "
            style={{
              backgroundImage: "url('/image/banner3.png')",
            }}
          >
            <div className="bg-[rgba(0,0,0,0.3)] absolute inset-0 z-10 rounded-[60px]"></div>
            <div className="left-[30px] bottom-[30px] z-10 absolute flex items-center   ">
              <div
                className="w-[120px] h-[120px] overflow-hidden  rounded-[60px] bg-center bg-contain bg-no-repeat flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://myjobs-user-image.s3.ap-south-1.amazonaws.com/7addaa62-cf67-469e-be40-6134671e8eed.jpg'  )",
                }}
              />
              <div className="ml-[20px]">
                <div className="font-bold text-[34px] flex gap-2 items-center tracking-[-1px] text-white">
                  Ko Ko Winn Htut
                  <button className="w-[50px] bg-white flex justify-center items-center h-[50px] rounded-[10px] p-0 cursor-pointer outline-offset-4 text-black border border-primary">
                    <QrCode />
                  </button>
                </div>
                <p className="text-white font-thin">
                  Business Development & Management
                </p>
              </div>
            </div>
          </div>
          <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
            About Ko Ko Winn Htut
          </p>
          <p className="mb-[1rem] opacity-60">
            I have spent the last five years working in the business management
            field. At local business companies, I handled and maintained the
            progress of daily operations, human resources, sales & marketing
            processes. Providing monthly reports to the CEO and critical urgent
            issues helped me to have strong communication skills and
            presentation. I gained well understanding of business management
            processes and public relationships. I am also comfortable working
            under pressure because of my experiences as a General Manager.
          </p>
          <div className="mt-[48px]">
            <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
              Skills & Languages{" "}
            </p>
            <div className="flex  gap-4">
              <div className="text-[13px] inline-block rounded-[50px] px-[17px] py-[7px] no-underline mr-[5px] mb-[10px] bg-[rgb(238,249,255)] text-black">
                Business Management Skills - 10 years
              </div>
              <div className="text-[13px] inline-block rounded-[50px] px-[17px] py-[7px] no-underline mr-[5px] mb-[10px] bg-[rgb(238,249,255)] text-black">
                English - Intermediate
              </div>
            </div>
          </div>
          <div></div>
          <div>
            <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
              Education & Training
            </p>
            <ol className="relative border-s mb-[20px] border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 broder  rounded-full  -start-1.5 border-[4px] border-blue-800 dark:border-gray-900 dark:bg-gray-700"></div>

                <time className="text-[13px] inline-block rounded-[50px] px-[10px] py-[2px] no-underline  bg-[rgb(238,249,255)] text-black">
                  2019 - 2022
                </time>
                <h3 className="text-[16px]  font-[600] text-gray-900 dark:text-white">
                  Assistant Center Manager
                </h3>
                <h3 className="text-[14px] font-[500] opacity-70 ">
                  Chindwin Technological University
                </h3>
                <p className="mb-4 text-[14px]  text-gray-500 font-[300] ">
                  1. Assist and work closely with Regional Director for all
                  operations and day to day management of Mandalay Campus. 2.
                  Develops center operational procedures, strategies and
                  institutes that reflect the organizations goals. 3.
                  Coordination with Chindwin College partner education
                  institutions. 4. Responsible for supervising operation team
                  and subordinate staff in the day to day performance of their
                  jobs. 5. Take a lead role in developing and implementing the
                  college's marketing and student recruitment strategy to
                  support overall College's strategic objectives with emphasis
                  on developing the use of web, social media and new media
                  aligned with the College's marketing strategies.
                </p>
              </li>
            </ol>
          </div>

          <ol className="relative border-s mb-[20px] border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 broder  rounded-full  -start-1.5 border-[4px] border-blue-800 dark:border-gray-900 dark:bg-gray-700"></div>

              <time className="text-[13px] inline-block rounded-[50px] px-[10px] py-[2px] no-underline  bg-[rgb(238,249,255)] text-black">
                2021
              </time>
              <h3 className="text-[16px]  font-[600] text-gray-900 dark:text-white">
                B.E (Electrical Power)
              </h3>
              <h3 className="text-[14px] font-[500] opacity-70 ">
                TU (Mandalay) : Bachelor Degree
              </h3>
            </li>
          </ol>
        </div>
        <div className="col-span-3">
          <div className="bg-jobBg w-full p-[30px] mb-[10px] rounded-[30px]">
            <p className="text-primary font-[600] mb-[20px]">
              Personal Information
            </p>
            <div>
              <p className="opacity-70 text-[13px]">Date of Birth</p>
              <p className="font-[500]">locked</p>
            </div>

            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Email</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Location</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Phone</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Mobile Phone</p>
              <p className="font-[500]">locked</p>
            </div>
          </div>
          <div className="bg-jobBg w-full p-[30px] mb-[10px] rounded-[30px]">
            <p className="text-primary font-[600] mb-[20px]">
              Career Information
            </p>
            <div>
              <p className="opacity-70 text-[13px]">Professional Headline</p>
              <p className="font-[500]">Junior Web Developer</p>
            </div>

            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Years of Experience</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Career Level</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">
                Preferred Functional Area
              </p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]">Preferred Job Type</p>
              <p className="font-[500]">locked</p>
            </div>
            <div className="mt-[1.5rem]">
              <p className="opacity-70 text-[13px]"> Expected Salary</p>
              <p className="font-[500]">locked</p>
            </div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
};

export default page;
