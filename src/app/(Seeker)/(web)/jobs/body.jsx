"use client";
import SeekerSelectBox from "@/components/share/SeekerSelectBox";
import { formatDistanceToNow } from "date-fns";
import {
  BriefcaseBusiness,
  CalendarDays,
  Earth,
  Folder,
  Search,
  Volume,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import "./job.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { workTypes,chooseTime } from "@/lib/const";
import { EmployerJobPosts, EmployersConst } from "@/lib/queryConst";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import axios from "axios";
const JobPostPage = ({ data ,industries,functionalAreas}) => {
const [jobs,setJobs] = useState(data?.value)
  const [industry,setIndustry] = useState(industries?.value)
  const [functionalArea,setFuncaionalArea] = useState(functionalAreas.value)
  const [filter,setFilter] = useState(EmployerJobPosts.filter)

 const initialData = data;
 const [title, setTitle] = useState("");
 const [jobType,setJobType] = useState("")
 const [functionalAreaId,setFunctionalAreaId] = useState("")
 const [loading, setLoading] = useState(false);
 const [industrialId,setIndustrialId] = useState("")
 const [paging, setPaging] = useState({
  pageNumber: 1,
  perPage: 10,
  total: jobs?.count,
});

const searchParams = useSearchParams()

//  Search when redirected from the Home Page
const titleHome = searchParams.get('title')
const jobTypeHome = searchParams.get('jobType')
const industrialIdHome=searchParams.get('industryId')

useEffect(() => {
  const formattedJobType = jobTypeHome ? `'${jobTypeHome}'` : '';

  setFilter((prevFilter) => ({
    ...prevFilter,
    Title: {
      ...prevFilter.Title,
      value: titleHome,
    },
 
    JobType: {
      ...prevFilter.JobType,
      value: formattedJobType,
    },
    IndustryId: {
      ...prevFilter.IndustryId,
      value: industrialIdHome,
    },
  
  }));

}, []); 


  const router = useRouter();



  const fetchJobLists = useCallback(async (pageNumber, perPage) => {
    setLoading(true);
    const queryString = await apiQueryHandler(
      EmployerJobPosts,
      filter,
      EmployerJobPosts.order,
      EmployerJobPosts.fields,
      "normal",
      {
        pageNumber,
        perPage,
      }
    );

    axios
      .get(`/api/job_lists/get?${queryString}`)
      .then((res) => {
        setPaging({
          pageNumber,
          perPage,
          total: res["@odata.count"],
        });

setJobs(res.data.value);
     
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  useEffect(() => {
    fetchJobLists(paging.pageNumber, paging.perPage);
  }, [filter, fetchJobLists]);

  useEffect(()=>{
 const handlePopState =()=>{
  if (!router?.query?.title) {
    setFilter(EmployerJobPosts.filter);
    setJobs(initialData);
  }
 };
 window.addEventListener("popstate", handlePopState);

 return () => {
   window.removeEventListener("popstate", handlePopState);
 };
  },[router,initialData])


  // Search On Clik 
  const handleSearch = () => {
    const formattedJobType = jobType? `'${jobType}'` : '';
    const queryParams = new URLSearchParams({
      title: title.toLowerCase(), 
      jobType:`'${jobType}'`,
      industryId: industrialId,
      functionalAreaId: functionalAreaId,
    });
  
    setFilter((prevFilter) => ({
      ...prevFilter,
      Title: {
        ...prevFilter.Title,
        value: title.toLocaleLowerCase(),
      },
      JobType: {
        ...prevFilter.JobType,
        value: formattedJobType,
      },
      IndustryId: {
        ...prevFilter.IndustryId,
        value: industrialId,
      },
      FunctionalAreaId: {
        ...prevFilter.FunctionalAreaId,
        value: functionalAreaId,
      },
      
    }));

    router.push(`/jobs?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="bg-searchJobBg py-[60px] ">
        <div className="2xl:max-w-[1400px] xl:max-w-[1320px] w-full px-3 mx-auto ">
          <p className="font-bold text-[48px] tracking-tight">Search Jobs</p>
          <p className="text-[18px] font-light">
            Search your career opportunity through 102 jobs
          </p>
          <div className="bg-white shadow-[0px_6px_12px_rgba(0,0,0,0.05)] h-20 rounded-[40px]  pl-[20px] mt-[1.5rem]">
            <div className="h-20 flex items-center  flex-wrap ml-[20px] ">
              <div className="flex flex-col flex-1 px-[16px]   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex flex-wrap items-center w-full">
                  <Search strokeWidth={2.5} width={"16px"} />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Keyword"
                    className="relative flex flex-wrap items-stretch w-full flex-1 min-w-0  px-3 py-1.5 text-base font-light text-pxpTextColor bg-transparent border border-none outline-none appearance-none"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1   px-[16px] border-s border-[#dedede]  lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <Folder width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
                    value={industrialId}
                    onChange={(e) => setIndustrialId(e.target.value)}
                    placeholder="Select Industry"
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                      backgroundImage:
                        "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "16px 12px",
                    }}
                  >
                    <option>Select Industry</option>
                    {
                      industry?.map(work => {
                        return <option key={work.Id} value={work.Id}>{work.TitleEng}</option>
                      })
                    }
                  </select>
                  {/* <SeekerSelectBox placeholder="Select Industry" /> */}
                </div>
              </div>
              <div className="flex flex-col border-s px-[16px] border-[#dedede]  flex-1   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <BriefcaseBusiness width={"18px"} strokeWidth={1.75} />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="Select Industry"
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                      backgroundImage:
                        "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "16px 12px",
                    }}
                  >
                    <option>Select Work Type</option>
                    {
                      workTypes?.map(work => {
                        return <option key={work.label} value={work.value}>{work.label}</option>
                      })
                    }

                  </select>

                </div>
              </div>

              <div className="flex flex-col  flex-1   px-[16px] border-s border-[#dedede]   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <Folder width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
                    value={functionalAreaId}
                    onChange={(e) => setFunctionalAreaId(e.target.value)}
                    placeholder="Select Industry"
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                      backgroundImage:
                        "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "16px 12px",
                      
                    }}
                  >
                    <option>Select Functional Area</option>
                    {
                      functionalArea?.map(work => {
                        return <option key={work.Id} value={work.Id}             onChange={(e) => setSearchQuery(e.target.value)}>{work.TitleEng}</option>
                      })
                    }
                  </select>
                  {/* <SeekerSelectBox placeholder="Select Functional Area " /> */}
                </div>
              </div>
              <div className="flex flex-col  flex-1   px-[16px] border-s border-[#dedede]   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <CalendarDays width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  "
                    // onChange={orderHandler}
                    placeholder="Select Industry"
                    style={{
                      padding: "0.375rem 1.5rem 0.375rem 0.75rem",
                      // backgroundImage:
                      //   "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                      // backgroundRepeat: "no-repeat",
                      // backgroundPosition: "right 0.75rem center",
                      // backgroundSize: "16px 12px",
                    }}
                  >
                    <option>Any Time</option>
                    {
                      chooseTime?.map(work => {
                        return <option key={work.label} value={work.value}>{work.label}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div
                style={{
                  flex: "0 0 auto",
                  width: "auto",
                }}
              >
                <button className=" h-14 border-0 px-[20px] mr-[13px] rounded-[27px] text-white bg-primary transition-colors"    onClick={handleSearch}>
                  Find Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-jobBg py-10">
        <div className="2xl:max-w-[1400px] xl:max-w-[1320px] w-full px-3 mx-auto ">
          <div className=" relative">
            <Swiper
              style={{
                width: "100%",
              }}
              loop={true}
              navigation={true}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              slidesPerView={3}
              autoplay={{
                delay: 7000,
              }}
              speed={700}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {initialData?.map((str, index) => (
                <SwiperSlide>
                  <JobPostComponent job={str} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <div className="2xl:max-w-[1400px] xl:max-w-[1320px] w-full px-3 mx-auto ">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <div className="bg-widgetBgColor p-8 rounded-2xl">
                <p className="text-[18px] font-[600]">Search by Location</p>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">Country</label>
                  <select className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm">
                    <option>Myanmar</option>
                  </select>
                </div>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">State</label>
                  <select className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm">
                    <option>State</option>
                  </select>
                </div>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">City</label>
                  <select className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm">
                    <option>City</option>
                  </select>
                </div>
                <Button className="mt-4">Submit</Button>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 xl:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[22px] font-[600] text-widgetColor">
                  Showing {jobs?.length} Jobs
                </h3>
                <div className="w-[155px]">
                  <SeekerSelectBox placeholder="Most relevant" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs?.map((str, index) => (
                  <div key={index} className="col-span-1">
                    <JobPostComponent job={str} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const JobPostComponent = ({ job }) => {

  const parsedDate = new Date(job.CreatedAt);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/jobs/${id}`)}
      className="bg-white p-8 mr-5 cursor-pointer rounded-[30px] text-decoration-none flex flex-col justify-between h-full border border-[#dcdcdc]"
      style={{
        width: "100%",
      }}
    >
      <div className="flxe items-center w-fit">
        <div className="bg-widgetBgColor font-light rounded-[10px] flex items-center  p-[8px] text-[12px] leading-[14px] text-widgetColor no-underline transition-colors duration-300 hover:bg-primary hover:text-white group">
          <Volume
            color="white"
            width={"16px"}
            className="stroke-current  text-white > "
            height={"16px"}
          />
          Accounting, Auditing Finance
        </div>
      </div>
      <div className="min-h-[54px] overflow-hidden font-semibold text-[18px] mt-[30px] transition-colors duration-300 ease-in-out text-widgetColor hover:text-widgetHoverColor">
        {job?.Title}
      </div>
      <div className="mt-[25px]  flex items-center justify-between text-[14px] text-widgetColor">
        <div className=" flex  gap-1 text-sm text-widgetColor">
          <Earth width="12px" height="12px" className="mt-[3px]" />
          Hlaingthaya Township, Yangon, Myanmar
        </div>
        <p className="font-light">{job.JobType}</p>
      </div>
      <div className="flex mt-10 items-center justify-between">
        <div>
          <p className="text-[13px] ">
            {" "}
            {formatDistanceToNow(parsedDate, { addSuffix: true })}
          </p>
          <p className="block text-sm font-medium mt-2.5 text-widgetColor transition-colors duration-300 no-underline">
            {job.Employer.CompanyName}
          </p>
        </div>
        <img
          className="w-[80px] h-[80px] object-contain"
          src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/bb2e01ff-5e10-4ee0-8ba6-2bf377fbb865.jfif"
          alt="logo"
        />
      </div>
    </div>
  );
};
export default JobPostPage;
