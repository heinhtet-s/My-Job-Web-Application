"use client";
import PaginatedItems from "@/components/share/pagination";
import ApiReq from "@/lib/axiosHandler";
import { getCurrentDate } from "@/lib/globalFunctions";
import { cn } from "@/lib/utils";
import {
  GetAppliedJobPostList,
  GetEmployerJobPostList,
  UpdatApplicationList,
} from "@/modules/services/employer_jobposts";
import { getJobPost } from "@/modules/services/jobPost_service";
import { getCareefInfo } from "@/modules/services/seeker_careerInfo";
import { Button } from "flowbite-react";
import { Search } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const menuItem = ["Candidates", "Shortlisted", "Rejected"];
const page = () => {
  const { data: session } = useSession();
  const formattedDate = (CreatedAt, expireMonth) => {
    const month = {
      Onemonth: 1,
      Twomonth: 2,
      Threemonth: 3,
    };
    console.log(month[expireMonth]);
    const targetDate = moment(CreatedAt).add(month[expireMonth], "months"); // Add 2 months to the CreatedAt date

    // Format the date to "21 June 2021"
    const formattedDate = targetDate.format("DD MMMM YYYY");

    return `${formattedDate}`;
  };
  const params = useParams();
  const { id: JobId } = params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [jobInfo, setJobInfo] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
  });
  const [viewCount, setViewCount] = useState(0);
  const [applicationCount, setApplicatioinCount] = useState(0);
  const ApplicationCount = async () => {
    const ApplicationCount = await GetAppliedJobPostList(
      `/$count?$filter=JobId eq ${JobId}`
    );
    const ViewCount = await GetAppliedJobPostList(
      `/$count?$filter=JobId eq ${JobId} and IsViewed eq true`
    );
    setApplicatioinCount(ApplicationCount);
    setViewCount(ViewCount);
    console.log(ApplicationCount, ViewCount);
  };
  const [jobAppInfo, setJobAppInfo] = useState([]);
  const SubmitEmployerView = async (callback, id) => {
    try {
      await UpdatApplicationList(
        {
          IsViewed: true,
          CreatedAt: getCurrentDate(),
          UpdatedAt: getCurrentDate(),
          CreatedBy: session.user?.Id ? session.user.Id : "",
          UpdatedBy: session.user?.Id ? session.user.Id : "",
        },
        id
      );
      getJobApplicationData();
      ApplicationCount();
      callback();
    } catch (e) {}
  };

  const updateStatus = async (Status, id) => {
    try {
      await UpdatApplicationList(
        {
          Status,
          CreatedAt: getCurrentDate(),
          UpdatedAt: getCurrentDate(),
          CreatedBy: session.user?.Id ? session.user.Id : "",
          UpdatedBy: session.user?.Id ? session.user.Id : "",
        },
        id
      );
      getJobApplicationData();
      ApplicationCount();
      toast.success("updated Successfully");
    } catch (e) {
      toast.error("something wrong");
    }
  };

  const getJobData = async () => {
    try {
      const data = await getJobPost(
        `(${JobId})?$expand=Employer,FunctionalArea`
      );
      setJobInfo(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getJobApplicationData = async () => {
    let filter = `filter=JobId eq ${JobId}`;
    switch (activeIndex) {
      case 0:
        filter += " and Status eq 'None'";
        break;
      case 1:
        filter += " and Status eq 'ShortListed'";
        break;
      case 2:
        filter += " and IsExpired eq 'Rejected'";
        break;

      default:
    }
    try {
      const data = await GetAppliedJobPostList(
        `?$count=true&$expand=Seeker($expand=CVs,CareerInfos)&$${filter}&$top=${
          paging.perPage
        }&$skip=${(paging.pageNumber - 1) * paging.perPage}`
      );
      console.log(data?.value);
      setJobAppInfo(data?.value);
      setTotalPage(data?.["@odata.count"]);
    } catch (e) {
      console.log(e);
    }
  };
  const router = useRouter();
  useEffect(() => {
    getJobData();
  }, [JobId]);
  useEffect(() => {
    getJobApplicationData();
  }, [JobId, paging, activeIndex]);
  useEffect(() => {
    ApplicationCount();
  }, [JobId]);
  return (
    <div>
      <h1 className="text-primary text-[38px] font-[700]">Manage Jobs</h1>
      <p className="font-[300] text-[16px]">
        Detailed list with all your job offers.
      </p>
      <div className="flex justify-between mt-5 items-center bg-[#F5F5F5] rounded-lg px-[15px] py-[10px]">
        <div>
          <div className="flex gap-3 items-center">
            <p className="font-[500] text-[16px]">{jobInfo?.Title}</p>
            <div className="bg-[#0969C3] px-4 py-2 rounded-md text-white cursor-pointer ">
              {jobInfo?.JobUnitType}
            </div>
            <div className="bg-[#198754] px-4 py-2 rounded-md text-white cursor-pointer ">
              {jobInfo?.isExpired ? "Offline" : "Online"}
            </div>
          </div>

          <div className="flex gap-5 mt-[5px] items-center">
            <p>{jobInfo?.FunctionalArea?.TitleEng}</p>
            <div className="h-[20px] w-[1px] bg-[#000000]"></div>
            <p className="text-[#17171d8a]"> {jobInfo?.Employer?.MapAddress}</p>
          </div>
          <div className="flex gap-5  items-center">
            <div className="flex gap-3  items-center ">
              <p className="font-[500]">Posted at :</p>
              <p className="font-[300]">
                {moment(jobInfo?.CreatedAt)?.format("DD MMM YYYY")}
              </p>
            </div>
            <div className="flex gap-3  items-center ">
              <p className="font-[500]">Expired at :</p>
              <p className="font-[300]">
                {formattedDate(jobInfo?.CreatedAt, jobInfo?.Expired)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border-[#DEE2E6] border px-[15px] rounded-md py-[17px] flex items-center gap-[17px] ">
            <svg
              width="71"
              height="71"
              viewBox="0 0 71 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.5 0C55.0745 0 71 15.9255 71 35.5C71 55.0745 55.0745 71 35.5 71C15.9255 71 0 55.0745 0 35.5C0 15.9255 15.9255 0 35.5 0ZM35.5 5.13947C18.759 5.13947 5.13947 18.7625 5.13947 35.5C5.13947 52.241 18.759 65.8605 35.5 65.8605C52.241 65.8605 65.8605 52.241 65.8605 35.5C65.8605 18.7625 52.241 5.13947 35.5 5.13947ZM48.7653 22.2364C49.4403 22.9148 49.687 23.9119 49.3992 24.8198L43.9445 42.2563C43.6944 43.0615 43.0605 43.692 42.2587 43.9421L24.8222 49.4002C24.5687 49.479 24.3083 49.5167 24.0548 49.5167C23.3832 49.5167 22.7253 49.2529 22.2354 48.7663C21.5604 48.0879 21.3137 47.0909 21.6015 46.1829L27.0596 28.7464C27.3097 27.9378 27.9402 27.3108 28.7419 27.0607L46.1784 21.6025C47.0933 21.3113 48.0869 21.5614 48.7653 22.2364ZM43.0297 27.9721L31.5618 31.5628L27.9745 43.0307L39.4389 39.4399L43.0297 27.9721Z"
                fill="#17171D"
                fill-opacity="0.5"
              />
            </svg>
            <div className="flex flex-col h-full justify-around items-center">
              <p className="font-[700] text-[25px]">{viewCount}</p>
              <p>Views</p>
            </div>
          </div>
          <div className="border-[#DEE2E6] border px-[15px] rounded-md py-[17px] flex items-center gap-[17px] ">
            <svg
              width="68"
              height="74"
              viewBox="0 0 68 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.8625 0C59.5195 0 67.3501 7.98264 67.3501 19.8621V53.9579C67.3501 65.9412 59.7605 73.7347 48.0145 73.8089L19.4913 73.82C7.83434 73.82 0 65.8374 0 53.9579V19.8621C0 7.87512 7.58963 0.0852767 19.3356 0.0148307L47.8588 0H47.8625ZM47.8625 5.56153L19.3541 5.57636C10.7226 5.62826 5.56153 10.9673 5.56153 19.8621V53.9579C5.56153 62.912 10.7708 68.2585 19.4876 68.2585L47.996 68.2473C56.6275 68.1954 61.7886 62.849 61.7886 53.9579V19.8621C61.7886 10.908 56.583 5.56153 47.8625 5.56153ZM47.1473 49.9562C48.6823 49.9562 49.9281 51.202 49.9281 52.737C49.9281 54.272 48.6823 55.5178 47.1473 55.5178H20.3778C18.8428 55.5178 17.597 54.272 17.597 52.737C17.597 51.202 18.8428 49.9562 20.3778 49.9562H47.1473ZM47.1473 34.434C48.6823 34.434 49.9281 35.6798 49.9281 37.2148C49.9281 38.7498 48.6823 39.9955 47.1473 39.9955H20.3778C18.8428 39.9955 17.597 38.7498 17.597 37.2148C17.597 35.6798 18.8428 34.434 20.3778 34.434H47.1473ZM30.5914 18.9478C32.1263 18.9478 33.3721 20.1935 33.3721 21.7285C33.3721 23.2635 32.1263 24.5093 30.5914 24.5093H20.3767C18.8417 24.5093 17.5959 23.2635 17.5959 21.7285C17.5959 20.1935 18.8417 18.9478 20.3767 18.9478H30.5914Z"
                fill="#17171D"
                fill-opacity="0.5"
              />
            </svg>
            <div className="flex flex-col h-full justify-around items-center">
              <p className="font-[700] text-[25px]">{applicationCount}</p>
              <p>Total Applications </p>
            </div>
          </div>
        </div>
      </div>

      <ul
        style={{ backgroundColor: "rgb(225, 247, 254) " }}
        className="flex flex-wrap px-[50px] -mb-px justify-between  mt-10 p-2  rounded-[30px] "
      >
        <div className="flex flex-wrap gap-[20px]">
          {menuItem?.map((el, index) => {
            return (
              <li
                className="me-2 cursor-pointer"
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                <p
                  className={cn(
                    "inline-block text-[1rem] p-1 font-[400] opacity-50 border-b-2 border-transparent rounded-t-lg ",
                    activeIndex === index &&
                      "text-primary opacity-100 border-primary"
                  )}
                >
                  {el}
                </p>
              </li>
            );
          })}
        </div>
        <div className="relative h-fit">
          <input
            placeholder="search"
            className="pl-[35px] h-[30px] w-[300px] bg-white border border-[rgba(0,0,0,0.2)] font-light text-[var(--pxpTextColor)]  rounded-[30px] p-4 mr-4 outline-none focus:outline-none"
          />

          <Search
            width="16px"
            className="absolute left-[10px] top-[50%] translate-y-[-50%] "
          />
        </div>
      </ul>
      {jobAppInfo?.map((el) => {
        return (
          <div className="rounded-lg mt-[20px] overflow-hidden flex bg-[#fff2d9]">
            <div
              style={{
                writingMode: "vertical-lr",
              }}
              className={cn(
                "text-white px-3 transform rotate-180 text-center font-bold text-[20px] bg-[#7D7B7B]",
                el?.Status === "ShortListed" && "bg-primary",
                el?.Status === "Rejected" && "bg-[#ac0202]",
                el?.Status === "None" && !el?.IsViewed && "opacity-0"
              )}
            >
              {el?.Status === "None"
                ? el?.IsViewed
                  ? "Viewed"
                  : ""
                : el?.Status}
            </div>
            <div className="py-[20px] w-full  flex justify-around">
              <img
                src="/image/no-image.png"
                className="w-[150px] block h-[150px] rounded-full"
              />
              <div className="flex flex-col justify-around">
                <p className="font-[500]">
                  {el?.Seeker?.FirstName + " " + el?.Seeker?.LastName}
                </p>
                <p>
                  <span className="font-[500]">Applied date:</span>{" "}
                  <span className="font-[300]">
                    {moment(el?.CreatedAt).format("DD MMM YYYY")}
                  </span>
                </p>
                <p className="font-[300]">
                  {el?.Seeker?.CareerInfos?.CurrentPosition}
                </p>
                <p className="font-[300]">
                  {el?.Seeker?.CareerInfos?.YearsOfExperience} experiences{" "}
                  {el?.Seeker?.Address}
                </p>
              </div>
              <div className="flex flex-col justify-around">
                <div className="flex gap-[10px]">
                  {el?.Status === "None" && (
                    <button
                      onClick={() => {
                        updateStatus("ShortListed", el?.Id);
                      }}
                      className="bg-white w-[150px] h-[40px] flex items-center justify-center  text-[16px] font-medium transition-[background-color] rounded-md"
                    >
                      Make Shortlist
                    </button>
                  )}

                  {el?.Status !== "Rejected" ? (
                    <button
                      onClick={() => {
                        updateStatus("Rejected", el?.Id);
                      }}
                      className="bg-white w-[150px] h-[40px] flex items-center justify-center  text-[16px] font-medium transition-[background-color] rounded-md"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateStatus("None", el?.Id);
                      }}
                      className="bg-white w-[150px] h-[40px] flex items-center justify-center  text-[16px] font-medium transition-[background-color] rounded-md"
                    >
                      Removed Reject
                    </button>
                  )}
                </div>
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => {
                      SubmitEmployerView(() => {
                        router.push(`/job-seekers/${el?.Seeker?.Id}`);
                      }, el?.Id);
                    }}
                    className="bg-primary text-white p-[7px] flex items-center justify-center  text-[14px] font-medium transition-[background-color] rounded-md"
                  >
                    PROFILE
                  </button>
                  <button
                    onClick={() => {
                      SubmitEmployerView(() => {
                        router.push(`/job-seekers/${el?.Seeker?.Id}`);
                      }, el?.Id);
                    }}
                    className="bg-primary p-[7px] flex text-white  items-center justify-center  text-[14px] font-medium transition-[background-color] rounded-md"
                  >
                    VIEW CV
                  </button>
                  <button className="bg-primary p-[7px] text-white  flex items-center justify-center  text-[14px] font-medium transition-[background-color] rounded-md">
                    DOWNLOALD CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
  );
};

export default page;
