"use client";
import CardLayout from "@/components/share/CardLayout";
import PaginatedItems from "@/components/share/pagination";
import { workTypes } from "@/lib/const";
import { GetSeekerList } from "@/modules/services/seeker_service";
import axios from "axios";
import { ChevronRight, Earth, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CandidatePage = ({ data, functionalAreas }) => {
  console.log(functionalAreas);
  const [jobType, setJobType] = useState("");
  const [candidates, setCandidates] = useState();
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });
  const [totalPage, setTotal] = useState(0);

  const handleSubmitApi = async () => {
    try {
      let filter = "&$filter=IsPublic eq true";
      if (jobType?.length > 0) {
        filter = `&$expand=CareerInfos($filter=JobType eq '${jobType}')&$filter=IsPublic eq true and CareerInfos/any(c: c/JobType eq '${jobType}')`;
      }
      const data = await GetSeekerList(`?$count=true${filter}`);
      setTotal(data?.["@odata.count"]);
      setCandidates(data?.value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleSubmitApi();
  }, []);
  const router = useRouter();
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
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="block w-full py-1 px-3   text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  border-0 focus:ring-0  "
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                    }}
                  >
                    <option value="">All</option>
                    {workTypes.map((el) => (
                      <option value={el?.value}>{el?.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:flex-none lg:w-auto w-full">
                <button
                  onClick={() => {
                    handleSubmitApi();
                  }}
                  className=" h-14 border-0 px-[20px] mr-[13px] rounded-[27px] text-white bg-primary transition-colors"
                >
                  Find Candidates
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
          <div className="grid grid-cols-1 pb-[30px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {candidates?.map((str, index) => (
              <div className="col-span-1 min-h-[300px]" key={index}>
                <div className="border border-borderColor bg-white p-7 rounded-[30px] flex flex-col justify-between h-full no-underline">
                  <div className="text-center">
                    <img
                      className="w-[100px] mx-auto h-[100px] rounded-[50%] object-cover"
                      src={str.ImageUrl ? str.ImageUrl : "/image/no-image.png"}
                      alt="Profile"
                    />
                    <p className="block text-widgetColor mt-[30px] cursor-pointer text-[18px] font-semibold">
                      {str.FirstName} {str.LastName}
                    </p>
                    <p className="block text-widgetColor  cursor-pointer text-[15px] font-light">
                      {
                        functionalAreas?.find(
                          (el) =>
                            el?.Id ===
                            str?.CareerInfos?.[0]?.CurrentFunctionalArea
                        )?.TitleEng
                      }
                    </p>
                    <p className="block text-widgetColor  cursor-pointer text-[15px] font-light">
                      {str?.CareerInfos?.[0]?.JobType}
                    </p>
                    <div>
                      {str?.Address?.length > 0 && (
                        <div className=" flex cursor-pointer justify-center   gap-1 mt-[30px] text-sm text-widgetColor">
                          <Earth
                            width="14px"
                            className="mt-[3px]"
                            height="14px"
                          />
                          {str?.Address}
                        </div>
                      )}

                      <div
                        onClick={() => {
                          router.push(`/job-seekers/${str?.Id}`);
                        }}
                        className="text-primary justify-center mt-[30px] flex items-center gap-2"
                      >
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
          <div className="mb-[20px]">
            <PaginatedItems
              itemsPerPage={paging.perPage}
              totalPage={Math.ceil(totalPage / paging.perPage)}
              currentPage={paging.pageNumber}
              setCurrentPage={(el) => {
                setPaging((prev) => {
                  return {
                    ...prev,
                    pageNumber: el,
                  };
                });
              }}
            />
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default CandidatePage;
