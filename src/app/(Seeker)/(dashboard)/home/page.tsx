import DotIcon from "@/asset/Icon/DotIcon";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CircleUser, FileText, Mail } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Welcome</h1>
      <p className="opactiy-70 mb-[30px]">
        Find your dream careers on Myjobs.com.mm
      </p>
      <div
        className="border border-[rgba(0,0,0,.125)]"
        style={{
          flex: "1 1 auto",
          padding: "1rem 1rem",
        }}
      >
        <div className=" flex justify-end">
          Last Login: <span> 25 Aug 2024</span>
          <div className="flex gap-2 ml-[20px]">
            <DotIcon /> <DotIcon /> <DotIcon />
          </div>
        </div>
        <div className="grid mt-[15px] grid-cols-12  gap-4 lg:grid-cols-12 xl:grid-cols-12">
          <div className="col-span-6 lg:col-span-5 xl:col-span-3 flex flex-col justify-center items-center">
            <img
              src="/image/no-image.png"
              className="w-[150px] h-[150px] rounded-full"
            />
            <p className="text-[1.5rem] mb-[0.5rem[">Zaio Chu</p>
          </div>
          <div className="col-span-9 flex">
            <div className="w-1/2 flex-wrap lg:flex-nowrap flex gap-[10px]  ">
              <div className="w-full lg:w-1/2">
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Eamil</p>
                  <p className="mb-1 font-[400] break-words ">
                    heinh9540@gmail.com
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Phone</p>
                  <p className="mb-1 font-[400] break-words ">+959771955315</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">
                    Date of birth
                  </p>
                  <p className="mb-1 font-[400] break-words ">
                    Please fill out your birthday{" "}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Location</p>
                  <p className="mb-1 font-[400] break-words "></p>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <p className="mb-[4px] ">Candidate Showcase </p>
                <div className="flex justify-center mb-[16px]  gap-[8px]">
                  <p className="mb-[1rem] text-[13px] font-light">
                    Enhance your professional branding to potential employers
                  </p>
                  <Switch id="airplane-mode" />
                </div>
              </div>
              <div>
                <p className="mb-[4px] ">Available to work</p>
                <div className="flex justify-center mb-[16px]  gap-[8px]">
                  <p className="mb-[1rem] text-[13px] font-light">
                    Let employers know you are actively seeking a job
                  </p>
                  <Switch id="airplane-mode" checked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-[20px] gap-[20px] lg:grid-cols-2 xl:grid-cols-12">
        <div className="pxp-dashboard-stats-card gap-[10px] bg-[#0d6dfd2a] bg-opacity-10 col-span-6 lg:col-span-4 xl:col-span-3 flex items-center rounded-[30px] p-[30px] lg:p-[20px] xs:mb-0">
          <div className="w-[70px] h-[70px] flex  items-center justify-center bg-white rounded-[10px] text-[28px]  ">
            <FileText strokeWidth={1.75} width="24px" color="#04157d" />
          </div>
          <div>
            <p className="text-[24px] font-bold">0</p>
            <p className="text-[14px] opacity-70 break-words">
              Job Application
            </p>
          </div>
        </div>
        <div className="pxp-dashboard-stats-card gap-[10px] bg-[#19875435] bg-opacity-10 col-span-6 lg:col-span-4 xl:col-span-3 flex items-center rounded-[30px] p-[30px] lg:p-[20px] xs:mb-0">
          <div className="w-[70px] h-[70px] flex  items-center justify-center bg-white rounded-[10px] text-[28px]  ">
            <FileText strokeWidth={1.75} width="24px" color="#04157d" />
          </div>
          <div>
            <p className="text-[24px] font-bold">0</p>
            <p className="text-[14px] opacity-70 break-words">Employeer View</p>
          </div>
        </div>
        <div className="pxp-dashboard-stats-card gap-[10px] bg-[#ffc10737] bg-opacity-10 col-span-6 lg:col-span-4 xl:col-span-3 flex items-center rounded-[30px] p-[30px] lg:p-[20px] xs:mb-0">
          <div className="w-[70px] h-[70px] flex  items-center justify-center bg-white rounded-[10px] text-[28px]  ">
            <CircleUser strokeWidth={1.75} width="24px" color="#ffc107" />
          </div>
          <div>
            <p className="text-[24px] font-bold">0</p>
            <p className="text-[14px] opacity-70 break-words">Messages</p>
          </div>
        </div>
        <div className="pxp-dashboard-stats-card gap-[10px] bg-[#dc354625] bg-opacity-10 col-span-6 lg:col-span-4 xl:col-span-3 flex items-center rounded-[30px] p-[30px] lg:p-[20px] xs:mb-0">
          <div className="w-[70px] h-[70px] flex  items-center justify-center bg-white rounded-[10px] text-[28px]  ">
            <Mail strokeWidth={1.75} width="24px" color="#dc3546" />
          </div>
          <div>
            <p className="text-[24px] font-bold">0</p>
            <p className="text-[14px] opacity-70 break-words">
              Uploaded Cv List{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="grid  mt-[20px] mb-[30px] gap-[20px] grid-cols-12">
        <div className="col-span-6 p-[1.5rem] min-h-full rounded-[20px] shadow-sm flex flex-col relative min-w-0 bg-white border border-[rgba(0,0,0,.125)]">
          <p className="mb-[1.5rem] text-[1.25rem]">Profile Completion</p>
          <div className="flex justify-between mb-[48px] gap-8">
            <div>
              <h1 className="text-[1.5rem] text-[700]">0 %</h1>
              <p className="break-words font-light">
                of your profile is complete
              </p>
            </div>
            <div className="w-[60%]">
              <Progress value={33} className="w-[100%]" />
              <p className="text-[1rem] font-[500]">
                Complete 100% to boost your profile!
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Personal Information</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Career Information</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Working Experiences</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Education</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Upload CV</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Languages & Skills</p>
              <p className="text-[1rem] font-[400]">0%</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 min-h-full flex flex-col relative min-w-0 ">
          <div
            className=" rounded-[20px] mb-[1.5rem] border bg-white border-[rgba(0,0,0,.125)] shadow-[rgba(0,0,0,.15)] w-full p-[1rem]"
            style={{
              boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
            }}
          >
            <h3 className="font-[400] mb-[8px] text-[1.2rem]  ">
              Your Lasted CV
            </h3>
            <p className="text-muteColor mb-[1rem] text-[13px] font-light ">
              Always keep your CV up to date to get great opportunities
            </p>
            <div className="flex justify-between items-center">
              <button className="bg-primary text-white text-[18px] font-medium px-5 py-2.5 transition-[background-color] rounded-full">
                Upload Now
              </button>
              <p className="text-[#0d6efd]">See More</p>
            </div>
          </div>
          <div
            className=" bg-[#f693225c] flex rounded-[20px] border bg-white border-[rgba(0,0,0,.125)] shadow-[rgba(0,0,0,.15)] w-full p-[1rem]"
            style={{
              flex: "1 1 auto",
            }}
          >
            <div className="w-2/3 ">
              <h3 className="text-[30px] mb-[30px] font-[500] break-words">
                Candidates Showcase{" "}
              </h3>
              <p className="text-black">
                A new feature highlighting professional profiles prominently on
                the home page, making it easier for Talent Acquisition teams to
                access your profile.
              </p>
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center gap-[10px] ">
              <img src="/image/phone.png" alt="fe" className="w-[233px]" />
              <p>Enable !!</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[24px] font-[600]">Recommended Jobs</p>
    </div>
  );
};

export default page;
