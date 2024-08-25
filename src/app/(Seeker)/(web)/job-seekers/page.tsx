import CardLayout from "@/components/share/CardLayout";
import { ChevronRight, Earth, Search } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="bg-[#ffe5b4] py-[60px]">
        <div className="flex justify-between items-center">
          <div className="w-1/2 flex flex-col	 items-center justify-center">
            <div>
              <p className="text-[48px] font-[700] text-[#000849]">
                Search Candidates
              </p>
              <p className="text-[18px] font-light">
                Work for the best companies in the world
              </p>
            </div>
          </div>
          <div>
            <p className="text-[1.8rem] font-[700] text-[#000849]">
              Hire the most{" "}
              <span className="text-primary">talented candidate</span> in
              Myanmar
            </p>
            <p className="text-[#000849] font-bold">
              Please register as an employer to hire the relevant{" "}
            </p>
            <p className="text-[#000849] font-bold">
              professional candidates directly{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-jobBg pt-[20px] pb-[40px]">
        <CardLayout>
          <div className="flex items-center justify-between">
            <div className=" border flex items-center border-[#dedede] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.05)] h-[80px] rounded-[40px] pl-[20px]  lg:mt-6 lg:flex-none lg:w-[41.66666667%]">
              <div className="lg:flex-1 lg:w-auto w-full">
                <div className="relative flex  items-center w-full">
                  <Search strokeWidth={2.5} width={"16px"} />
                  <select
                    className="block w-full py-1 px-3   text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                    }}
                  >
                    <option>All</option>
                  </select>
                </div>
              </div>
              <div className="lg:flex-none lg:w-auto w-full">
                <button className=" h-14 border-0 px-[20px] mr-[13px] rounded-[27px] text-white bg-primary transition-colors">
                  Find Companies
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="capitalize font-bold rounded-md overflow-hidden text-white p-[1rem] bg-[#000849] border-[#000849]">
                100% Free
              </button>
              <button className="capitalize font-bold rounded-md overflow-hidden text-white p-[1rem] bg-primary border-primary">
                Get Full Profile
              </button>
            </div>
          </div>
        </CardLayout>
      </div>
      <div className="mt-[100px]">
        <CardLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {Array(5)
              .fill("")
              .map((str: string, index: number) => (
                <div className="col-span-1 min-h-[300px]" key={index}>
                  <div className="border border-borderColor bg-white p-7 rounded-[30px] flex flex-col justify-between h-full no-underline">
                    <div className="text-center">
                      <img
                        className="w-[100px] mx-auto h-[100px] rounded-[50%] object-contain"
                        src="https://myjobs-user-image.s3.ap-south-1.amazonaws.com/7addaa62-cf67-469e-be40-6134671e8eed.jpg"
                        alt="logo"
                      />
                      <p className="block text-widgetColor mt-[30px] cursor-pointer text-[18px] font-semibold">
                        Ko Ko Winn Htut
                      </p>
                      <p className="block text-widgetColor  cursor-pointer text-[15px] font-light">
                        Business Development & Management
                      </p>
                      <p className="block text-widgetColor  cursor-pointer text-[15px] font-light">
                        Full Time
                      </p>
                      <div>
                        <div className=" flex  gap-1 mt-[30px] text-sm text-widgetColor">
                          <Earth
                            width="14px"
                            height="14px"
                            className="mt-[3px]"
                          />
                          Hlaingthaya Township, Yangon, Myanmar
                        </div>
                        <div className="text-primary justify-center mt-[30px] flex items-center gap-2">
                          View Profile
                          <ChevronRight
                            width={16}
                            color="#F08000"
                            strokeWidth={1.75}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default page;
