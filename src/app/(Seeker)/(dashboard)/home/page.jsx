"use client";
import DotIcon from "@/asset/Icon/DotIcon";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import ApiReq from "@/lib/axiosHandler";
import { AppliedJobPostConst, GeneratedCvConst } from "@/lib/queryConst";
import {
  GetSeekerProfilePercentage,
  UpdateSeekerList,
} from "@/modules/services/seeker_service";
import axios from "axios";
import { CircleUser, Eye, FileText, Mail } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data: session } = useSession();
  const [cvcount, setCvcount] = useState(0);
  const [lastestCv, setLastestCv] = useState({});
  const [loading, setLoading] = useState(false);
  const [applicationcount, setApplicationCount] = useState(0);
  const [filter, setFilter] = useState(GeneratedCvConst.filter);
  const [ProfilePercentages, setProfilePercentage] = useState({});
  const [recJobs, setRecJobs] = useState([]);
  const [applicationFilter, setApplicationFilter] = useState(
    AppliedJobPostConst.filter
  );
  const SEEKERID = session?.user?.Id;
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 100,
    total: 0,
  });
  useEffect(() => {
    if (SEEKERID) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        SeekerId: {
          ...prevFilter.SeekerId,
          value: SEEKERID,
        },
      }));
    }
  }, [SEEKERID]);
  useEffect(() => {
    if (SEEKERID) {
      setApplicationFilter((prevFilter) => ({
        ...prevFilter,
        SeekerId: {
          ...prevFilter.SeekerId,
          value: SEEKERID,
        },
      }));
    }
  }, [SEEKERID]);

  async function getCvs(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/generate_cv/get?${await apiQueryHandler(
          GeneratedCvConst,
          filter,
          GeneratedCvConst.order,
          GeneratedCvConst.fields,
          "no_child",
          {
            pageNumber,
            perPage,
          }
        )}`
      );
      setPaging((prev) => ({
        ...prev,
        total: result.data["@odata.count"],
      }));
      console.log(result);
      setLastestCv(result?.data?.value?.[0]);
      setCvcount(result.data["@odata.count"]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function getRecJobs() {
    try {
      const data = await ApiReq.get("/api/recommand-job/get");
      setRecJobs(data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  // async function getProfilePercentage() {
  //   try {
  //     const data = await GetSeekerProfilePercentage(
  //       `ProfilePercentages?&$filter=SeekerId eq ${session?.user?.Id}`
  //     );
  //     console.log(data);
  //     setProfilePercentage(data?.data?.value);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const [infoData, setInfoData] = useState({});
  const router = useRouter();
  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const personalData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/seekers/getSeekerById?id=${session?.user?.Id}`
      );
      console.log(personalData.data);
      setInfoData(personalData.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchInfoData();
    getRecJobs();
    // getProfilePercentage();
    if (filter.SeekerId.value) {
      getCvs(paging.pageNumber, paging.perPage);
    }
  }, [paging.pageNumber, paging.perPage, filter]);
  async function getApplications(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/appliedJobpost/get?${await apiQueryHandler(
          AppliedJobPostConst,
          applicationFilter,
          AppliedJobPostConst.order,
          AppliedJobPostConst.fields,
          "no_child",
          {
            pageNumber,
            perPage,
          }
        )}`
      );
      setPaging((prev) => ({
        ...prev,
        total: result.data["@odata.count"],
      }));

      setApplicationCount(result?.data?.length);
    } catch (error) {
      // errorMessage(error);
    } finally {
      setLoading(false);
    }
  }
  const getTotalPercentage =
    Number(infoData?.ProfilePercentage?.SeekerCompletion) +
    Number(infoData?.ProfilePercentage?.CareerCompletion) +
    Number(infoData?.ProfilePercentage?.JobExperienceCompletion) +
    Number(infoData?.ProfilePercentage?.EducationCompletion) +
    Number(infoData?.ProfilePercentage?.CVCompletion) +
    Number(infoData?.ProfilePercentage?.SkillCompletion) +
    Number(infoData?.ProfilePercentage?.LanguageCompletion);
  const handleShowcase = async () => {
    try {
      if (getTotalPercentage < 80) {
        toast.error("please fill personal info");
        return;
      }
      await UpdateSeekerList(
        {
          IsPublic: !infoData?.IsPublic,
        },
        session?.user?.Id
      );
      toast.success("successfully updated");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (filter.SeekerId.value) {
      getApplications(paging.pageNumber, paging.perPage);
    }
  }, [paging.pageNumber, paging.perPage, filter]);

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
          Last Login:{"    "}
          <span>
            {infoData?.LastLogin
              ? moment(infoData?.LastLogin).format("DD MMM YYYY")
              : moment().format("DD MMM YYYY")}
          </span>
          <div className="flex gap-2 ml-[20px]">
            <DotIcon /> <DotIcon /> <DotIcon />
          </div>
        </div>
        <div className="grid mt-[15px] grid-cols-12  gap-4 lg:grid-cols-12 xl:grid-cols-12">
          <div className="col-span-6 lg:col-span-5 xl:col-span-3 flex flex-col justify-center items-center">
            <img
              src={
                infoData?.ImageUrl ? infoData?.ImageUrl : "/image/no-image.png"
              }
              className="w-[150px] h-[150px] rounded-full"
            />
            <p
              className="text-[1.5rem] mb-[0.5rem]"
              style={{
                whiteSpace: "normal", // Allow text to wrap
                wordBreak: "break-word", // Break words if needed
              }}
            >
              {infoData?.FirstName
                ? infoData?.FirstName + "  " + infoData?.LastName
                : infoData?.email}
            </p>
          </div>
          <div className="col-span-9 flex">
            <div className="w-1/2 flex-wrap lg:flex-nowrap flex gap-[10px]  ">
              <div className="w-full lg:w-1/2">
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Eamil</p>
                  <p className="mb-1 font-[400] break-words ">
                    {infoData?.Email}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Phone</p>
                  <p className="mb-1 font-[400] break-words ">
                    {infoData?.PhoneNum}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">
                    Date of birth
                  </p>
                  <p className="mb-1 font-[400] break-words ">
                    {infoData?.DateOfBirth
                      ? infoData?.DateOfBirth
                      : "Please fill out your birthday"}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 text-muteColor font-[400]">Location</p>
                  <p className="mb-1 font-[400] break-words ">
                    {infoData?.Address}
                  </p>
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
                  <div className="w-[100px]" onClick={handleShowcase}>
                    <IconSwitcher defaultValue={infoData?.IsPublic} />
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-[4px] ">Available to work</p>
                <div className="flex justify-center mb-[16px]  gap-[8px]">
                  <p className="mb-[1rem] text-[13px] font-light">
                    Let employers know you are actively seeking a job
                  </p>
                  <div className="w-[100px]">
                    <IconSwitcher2 defaultValue={infoData?.AvailableJob} />
                  </div>
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
            <p className="text-[24px] font-bold">{applicationcount}</p>
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
            <p className="text-[24px] font-bold">{cvcount}</p>
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
              <h1 className="text-[1.5rem] text-[700]">
                {getTotalPercentage} %
              </h1>
              <p className="break-words font-light">
                of your profile is complete
              </p>
            </div>
            <div className="w-[60%]">
              <Progress value={getTotalPercentage} className="w-[100%]" />
              <p className="text-[1rem] font-[500]">
                Complete 100% to boost your profile!
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Personal Information</p>
              <p className="text-[1rem] font-[400]">
                {infoData?.ProfilePercentage?.SeekerCompletion || 0}%
              </p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Career Information</p>
              <p className="text-[1rem] font-[400]">
                {infoData?.ProfilePercentage?.CareerCompletion || 0}%
              </p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Working Experiences</p>
              <p className="text-[1rem] font-[400]">
                {infoData?.ProfilePercentage?.JobExperienceCompletion || 0}%
              </p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Education</p>
              <p className="text-[1rem] font-[400]">
                {infoData?.ProfilePercentage?.EducationCompletion || 0}%
              </p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Upload CV</p>
              <p className="text-[1rem] font-[400]">
                {infoData?.ProfilePercentage?.CVCompletion || 0}%
              </p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-[1rem] font-[400]">Languages & Skills</p>
              <p className="text-[1rem] font-[400]">
                {Number(infoData?.ProfilePercentage?.SkillCompletion ?? 0) +
                  Number(
                    infoData?.ProfilePercentage?.LanguageCompletion ?? 0
                  )}{" "}
                %
              </p>
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
            {lastestCv?.CVFileName && (
              <Table className="border ">
                <TableBody>
                  <TableRow>
                    <TableCell className="border ">
                      <p className="text-primary font-[500]">
                        {lastestCv?.CVFileName}
                      </p>
                    </TableCell>
                    <TableCell className="border ">
                      <p className="text-primary font-[500]">
                        {moment(lastestCv?.CreatedAt).format("DD MMM YYYY")}
                      </p>
                    </TableCell>
                    <TableCell className="border ">
                      <p className="text-primary font-[500]">
                        {lastestCv?.Active ? "Not Default" : "Default"}
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            <div className="flex justify-between items-center mt-[20px]">
              <button
                onClick={() => {
                  router.push("/manage-cvs");
                }}
                className="bg-primary text-white text-[18px] font-medium px-5 py-2.5 transition-[background-color] rounded-full"
              >
                Upload Now
              </button>
              <p
                className="text-[#0d6efd]"
                onClick={() => {
                  router.push("/manage-cvs");
                }}
              >
                See More
              </p>
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
      <Table>
        <TableBody>
          {recJobs?.map((el, key) => (
            <TableRow
              className="border-b cursor-pointer"
              key={key}
              onClick={() => {
                router.push(`/jobs/${el?.Id}`);
              }}
            >
              <TableCell>
                <div className="flex gap-3 items-center">
                  <img
                    className="block w-[40px] h-[40px] rounded-[10px] object-cover object-center"
                    src={
                      el?.Employer?.CompanyLogo
                        ? el?.Employer?.CompanyLogo
                        : "/image/no-image.png"
                    }
                  />
                  <div>
                    <p className="text-primary font-[500] text-[16px]">
                      {el?.Title}
                    </p>
                    <p className="text-[14px]">{el?.Employer?.CompanyName}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <Eye color="#F08000" width="14px" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const IconSwitcher = ({ defaultValue = false }) => {
  const [isSwitched, setIsSwitched] = useState(false);
  useEffect(() => {
    setIsSwitched(defaultValue);
  }, [defaultValue]);
  return (
    <div
      className="relative w-[82px] h-[32px] cursor-pointer"
      onClick={() => setIsSwitched(!isSwitched)}
    >
      {/* First Icon */}
      <svg
        className={`absolute transition-opacity duration-300 ease-in-out ${
          !isSwitched ? "opacity-0" : "opacity-100"
        }`}
        width="82"
        height="32"
        viewBox="0 0 82 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H40.625V31.625H5C2.44568 31.625 0.375 29.5543 0.375 27V5Z"
          stroke="#F08000"
          strokeWidth="0.75"
        />
        <path
          d="M41 0H77C79.7614 0 82 2.23858 82 5V27C82 29.7614 79.7614 32 77 32H41V0Z"
          fill="#F08000"
        />
        <line x1="22" y1="9" x2="22" y2="22" stroke="#F08000" strokeWidth="2" />
        <circle cx="61.5" cy="15.5" r="5.5" stroke="white" strokeWidth="2" />
      </svg>

      {/* Second Icon */}
      <svg
        className={`absolute transition-opacity duration-300 ease-in-out ${
          !isSwitched ? "opacity-100" : "opacity-0"
        }`}
        width="82"
        height="32"
        viewBox="0 0 82 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H40.625V31.625H5C2.44568 31.625 0.375 29.5543 0.375 27V5Z"
          fill="#F08000"
        />
        <path
          d="M41 0H77C79.7614 0 82 2.23858 82 5V27C82 29.7614 79.7614 32 77 32H41V0Z"
          stroke="#F08000"
          strokeWidth="0.75"
        />
        <line x1="22" y1="9" x2="22" y2="22" stroke="white" strokeWidth="2" />
        <circle
          cx="61.5"
          cy="15.5"
          r="5.5"
          stroke="#F08000"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
const IconSwitcher2 = ({ defaultValue = false }) => {
  const [isSwitched, setIsSwitched] = useState(false);
  useEffect(() => {
    setIsSwitched(defaultValue);
  }, [defaultValue]);
  console.log(isSwitched, "Switch");
  return (
    <div
      className="relative w-[82px] h-[32px] cursor-pointer"
      onClick={() => setIsSwitched(!isSwitched)}
    >
      <svg
        className={`absolute transition-opacity duration-300 ease-in-out ${
          !isSwitched ? "opacity-0" : "opacity-100"
        }`}
        width="82"
        height="32"
        viewBox="0 0 75 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H36.7812V28.625H5C2.44568 28.625 0.375 26.5543 0.375 24V5Z"
          stroke="#6C757D"
          strokeWidth="0.75"
        />
        <path
          d="M37.1562 0H69.3125C72.0739 0 74.3125 2.23858 74.3125 5V24C74.3125 26.7614 72.0739 29 69.3125 29H37.1562V0Z"
          fill="#6C757D"
        />
        <line
          x1="20.0312"
          y1="8.15625"
          x2="20.0312"
          y2="19.9375"
          stroke="#6C757D"
          strokeWidth="2"
        />
        <circle
          cx="55.7344"
          cy="14.0469"
          r="4.89062"
          stroke="white"
          strokeWidth="2"
        />
      </svg>

      <svg
        className={`absolute transition-opacity duration-300 ease-in-out ${
          !isSwitched ? "opacity-100" : "opacity-0"
        }`}
        width="82"
        height="32"
        viewBox="0 0 75 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H36.7812V28.625H5C2.44568 28.625 0.375 26.5543 0.375 24V5Z"
          fill="#6C757D"
        />
        <path
          d="M37.1562 0H69.3125C72.0739 0 74.3125 2.23858 74.3125 5V24C74.3125 26.7614 72.0739 29 69.3125 29H37.1562V0Z"
          stroke="#6C757D"
          strokeWidth="0.75"
        />
        <line
          x1="20.0312"
          y1="8.15625"
          x2="20.0312"
          y2="19.9375"
          stroke="white"
          strokeWidth="2"
        />
        <circle
          cx="55.7344"
          cy="14.0469"
          r="4.89062"
          stroke="#6C757D"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
  // return (
  //   <div
  //     className="relative w-[82px] h-[32px] cursor-pointer"
  //     onClick={() => setIsSwitched(!isSwitched)}
  //   >
  //     {/* First Icon */}
  //     <svg
  //       className={`absolute transition-opacity duration-300 ease-in-out ${
  //         isSwitched ? "opacity-0" : "opacity-100"
  //       }`}
  //       width="82"
  //       height="32"
  //       viewBox="0 0 82 32"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H40.625V31.625H5C2.44568 31.625 0.375 29.5543 0.375 27V5Z"
  //         fill="#ABA9A9"
  //         stroke="#ABA9A9"
  //         strokeWidth="0.75"
  //       />
  //       <path
  //         d="M41.375 0.375H77C79.5543 0.375 81.625 2.44568 81.625 5V27C81.625 29.5543 79.5543 31.625 77 31.625H41.375V0.375Z"
  //         stroke="#ABA9A9"
  //         strokeWidth="0.75"
  //       />
  //       <line x1="22" y1="9" x2="22" y2="22" stroke="white" strokeWidth="2" />
  //       <circle cx="61.5" cy="15.5" r="5.5" stroke="#ABA9A9" strokeWidth="2" />
  //     </svg>

  //     {/* Second Icon */}
  //     <svg
  //       className={`absolute transition-opacity duration-300 ease-in-out ${
  //         isSwitched ? "opacity-100" : "opacity-0"
  //       }`}
  //       width="82"
  //       height="32"
  //       viewBox="0 0 82 32"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M0.375 5C0.375 2.44568 2.44568 0.375 5 0.375H40.625V31.625H5C2.44568 31.625 0.375 29.5543 0.375 27V5Z"
  //         fill="#ABA9A9"
  //         stroke="#ABA9A9"
  //         strokeWidth="0.75"
  //       />
  //       <path
  //         d="M41.375 0.375H77C79.5543 0.375 81.625 2.44568 81.625 5V27C81.625 29.5543 79.5543 31.625 77 31.625H41.375V0.375Z"
  //         stroke="#ABA9A9"
  //         strokeWidth="0.75"
  //       />
  //       <line x1="22" y1="9" x2="22" y2="22" stroke="white" strokeWidth="2" />
  //       <circle
  //         cx="61.5"
  //         cy="15.5"
  //         r="5.5"
  //         stroke="#ABA9A9"
  //         strokeWidth="2"
  //         fill="none"
  //       />
  //     </svg>
  //   </div>
  // );
};

export default page;
