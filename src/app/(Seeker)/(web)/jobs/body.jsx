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
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import "../../../../components/css/job.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { workTypes, chooseTime } from "@/lib/const";
import { EmployerJobPosts, EmployersConst, StateConst } from "@/lib/queryConst";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import axios from "axios";
import { GetCountry } from "@/modules/services/master";
import { MasterdataURL } from "@/lib/apiConst";
import { getJobPost } from "@/modules/services/jobPost_service";
import PaginatedItems from "@/components/share/pagination";
import useAddViewCount from "@/lib/useAddViewCount";

const JobPostPage = ({ industries, functionalAreas }) => {
  const [jobs, setJobs] = useState([]);
  const [industry, setIndustry] = useState(industries?.value);
  const [functionalArea, setFuncaionalArea] = useState(functionalAreas?.value);
  const [filter, setFilter] = useState(EmployerJobPosts.filter);
  const [stateFilter, setStaeFilter] = useState(StateConst.filter);
  const [sportLightJob, setSportLightJob] = useState([]);
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [functionalAreaId, setFunctionalAreaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [industrialId, setIndustrialId] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");
  const [matchStates, setMatchStates] = useState([]);
  const [matchCity, setMatchCity] = useState([]);
  const [city, setCity] = useState([]);
  const [order, setOrder] = useState(EmployerJobPosts.order);

  const [cityId, setCityId] = useState("");
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });
  const [totalPage, setTotal] = useState(0);

  const [selectedTime, setSelectedTime] = useState("");
  const searchParams = useSearchParams();
  const titleHome = searchParams.get("title");
  const jobTypeHome = searchParams.get("jobType");
  const industrialIdHome = searchParams.get("industryId");
  const functionalId = searchParams.get("functionalAreaId");
  const countryID = searchParams.get("CountryId");
  const cityID = searchParams.get("CityId");
  const stateID = searchParams.get("StateId");
  const TimeHome = decodeURI(searchParams.get("selectedTime") || "");
  console.log(TimeHome);
  const formattedJobType =
    jobTypeHome?.length > 0 && jobTypeHome !== null && jobTypeHome !== "null"
      ? `'${jobTypeHome}'`
      : null;
  useEffect(() => {
    setTitle(titleHome || "");
    setJobType((prev) =>
      jobTypeHome !== "null" && jobTypeHome?.length > 0 ? jobTypeHome : ""
    );
    setSelectedTime(TimeHome);
    setIndustrialId(industrialId);
    setFunctionalAreaId(functionalId);
    setCountryId(countryID);
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
      FunctionalAreaId: {
        ...prevFilter.FunctionalAreaId,
        value: functionalId,
      },
    }));
  }, [
    titleHome,
    jobTypeHome,
    industrialIdHome,
    functionalId,
    countryID,
    cityID,
    stateID,
  ]);
  const fetchSportLightJob = async () => {
    try {
      const data = await getJobPost(
        "?$filter=isExpired eq false and JobStatus eq 'Active' and JobUnitType eq 'Spotlight'&$top=100&$skip=0&$expand=Employer,FunctionalArea"
      );
      setSportLightJob(data?.value);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSportLightJob();
  }, []);
  // useEffect(() => {
  //   setFilter((prevFilter) => ({
  //     ...prevFilter, // keep the rest of the filter object
  //     JobType: {
  //       ...prevFilter.JobType,
  //       value: jobTypeHome?.length > 0 ? jobTypeHome : null,
  //     },
  //   }));
  // }, [jobTypeHome]);

  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/api/master/get_country");
        setCountries(res.data.value);
      } catch (err) {}
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get("/api/master/get_state");
        setStates(res.data.value);
      } catch (err) {}
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("/api/master/get_city");
        setCity(res.data.value);
      } catch (err) {}
    };

    fetchCities();
  }, []);
  const calculateDateRange = (selectedTime) => {
    const currentDate = moment();
    switch (selectedTime) {
      case "Last 3 days":
        return currentDate.subtract(3, "days").toISOString();
      case "Last 7 days":
        return currentDate.subtract(7, "days").toISOString();
      case "Last 24 days":
        return currentDate.subtract(24, "days").toISOString();
      case "Last 30 days":
        return currentDate.subtract(30, "days").toISOString();
      default:
        return null;
    }
  };
  const fetchJobLists = async (pageNumber, perPage) => {
    setLoading(true);

    const createdAtFilter = calculateDateRange(TimeHome);
    console.log(createdAtFilter, EmployerJobPosts.filter);
    const queryString = await apiQueryHandler(
      EmployerJobPosts,
      {
        ...EmployerJobPosts.filter,
        Title: {
          ...EmployerJobPosts.filter.Title,
          value: titleHome,
        },
        JobType: {
          ...EmployerJobPosts.filter.JobType,
          value: formattedJobType,
        },
        IndustryId: {
          ...EmployerJobPosts.filter.IndustryId,
          value: industrialIdHome,
        },
        FunctionalAreaId: {
          ...EmployerJobPosts.filter.FunctionalAreaId,
          value: functionalId,
        },
        CreatedAt: {
          ...EmployerJobPosts.filter.CreatedAt,
          value: createdAtFilter,
        },
        CountryId: {
          ...EmployerJobPosts.filter.CountryId,
          value: countryID,
        },
        StateId: {
          ...EmployerJobPosts.filter.StateId,
          value: stateID,
        },
        CityId: {
          ...EmployerJobPosts.filter.CityId,
          value: cityID,
        },
      },
      order,
      EmployerJobPosts.fields,
      "normal",
      {
        pageNumber,
        perPage,
      }
    );
    console.log(queryString);
    axios
      .get(`/api/job_lists/get?${queryString}`)
      .then((res) => {
        setTotal(res?.data?.["@odata.count"]);
        setJobs(res.data.value);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobLists(paging.pageNumber, paging.perPage);
  }, [
    paging,
    titleHome,
    jobTypeHome,
    industrialIdHome,
    functionalId,
    TimeHome,
    countryID,
    order,
  ]);

  const handleSubmit = () => {
    const formattedJobType = jobType ? `'${jobType}'` : "";

    const queryParams = new URLSearchParams({
      title: title.toLowerCase(),
      jobType: jobType?.length > 0 ? `'${jobType}'` : null,
      industryId: industrialId,
      functionalAreaId: functionalAreaId,
      selectedTime,
      CountryId: countryId,
      StateId: stateId,
      CityId: cityId,
    });

    router.push(`/jobs?${queryParams.toString()}`, {
      scroll: false,
    });
  };

  // useEffect(() => {
  //   const handlePopState = () => {
  //     if (!router?.query?.title) {
  //       setFilter(EmployerJobPosts.filter);
  //       // setJobs(initialData);
  //     }
  //   };
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [router, initialData]);

  // Search On Clik

  const handleSearch = () => {
    const formattedJobType = jobType ? `'${jobType}'` : "";
    const queryParams = new URLSearchParams({
      title: title.toLowerCase(),
      jobType: `${jobType?.length > 0 ? jobType : null}`,
      industryId: industrialId,
      functionalAreaId: functionalAreaId,
      selectedTime,
    });

    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   Title: {
    //     ...prevFilter.Title,
    //     value: title.toLocaleLowerCase(),
    //   },
    //   JobType: {
    //     ...prevFilter.JobType,
    //     value: formattedJobType,
    //   },
    //   IndustryId: {
    //     ...prevFilter.IndustryId,
    //     value: industrialId,
    //   },
    //   FunctionalAreaId: {
    //     ...prevFilter.FunctionalAreaId,
    //     value: functionalAreaId,
    //   },
    // }));

    router.push(`/jobs?${queryParams.toString()}`);
  };
  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder?.length < 1) {
      setOrder(EmployerJobPosts.order);
      return;
    }
    setOrder({ Title: selectedOrder });
  };
  return (
    <>
      <div className="bg-searchJobBg py-[60px]  ">
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
                    className="relative flex flex-wrap items-stretch w-full flex-1 min-w-0  px-3 py-1.5 text-base font-light text-pxpTextColor bg-transparent border border-none outline-none focus:ring-0  focus:outline-none appearance-none"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1   px-[16px] border-s border-[#dedede]  lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <Folder width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  border-0 focus:ring-0   "
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
                    <option value="">Select Industry</option>
                    {industry?.map((work) => {
                      return (
                        <option key={work.Id} value={work.Id}>
                          {work.TitleEng}
                        </option>
                      );
                    })}
                  </select>
                  {/* <SeekerSelectBox placeholder="Select Industry" /> */}
                </div>
              </div>
              <div className="flex flex-col border-s px-[16px] border-[#dedede]  flex-1   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <BriefcaseBusiness width={"18px"} strokeWidth={1.75} />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  border-0 focus:ring-0   "
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
                    <option value="">Select Work Type</option>
                    {workTypes?.map((work) => {
                      return (
                        <option key={work.label} value={work.value}>
                          {work.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex flex-col  flex-1   px-[16px] border-s border-[#dedede]   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <Folder width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  border-0 focus:ring-0  "
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
                    <option value="">Select Functional Area</option>
                    {functionalArea?.map((work) => {
                      return (
                        <option
                          key={work.Id}
                          value={work.Id}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        >
                          {work.TitleEng}
                        </option>
                      );
                    })}
                  </select>
                  {/* <SeekerSelectBox placeholder="Select Functional Area " /> */}
                </div>
              </div>
              <div className="flex flex-col  flex-1   px-[16px] border-s border-[#dedede]   lg:flex-row lg:flex-grow col-full row">
                <div className="relative flex  items-center w-full">
                  <CalendarDays width={"18px"} strokeWidth="1.5" />
                  <select
                    className="block w-full py-1 px-3  placeholder:font-bold text-[16px] text-gray-800 font-light bg-transparent outline-none border-none rounded-md appearance-none  border-0 focus:ring-0  "
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                    }}
                    value={selectedTime}
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
                    <option value="">Any Time</option>
                    {chooseTime?.map((work) => {
                      return (
                        <option key={work.label} value={work.value}>
                          {work.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div
                style={{
                  flex: "0 0 auto",
                  width: "auto",
                }}
              >
                <button
                  className=" h-14 border-0 px-[20px] mr-[13px] rounded-[27px] text-white bg-primary transition-colors"
                  onClick={handleSearch}
                >
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
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                  slidesPerGroup: 1,
                },
                600: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                  slidesPerGroup: 1,
                },
                960: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                  slidesPerGroup: 2,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  slidesPerGroup: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView={3}
              autoplay={{
                delay: 7000,
              }}
              speed={700}
              modules={[Autoplay, Navigation]}
              className="jobSwiper"
            >
              {sportLightJob?.map((str, index) => (
                <SwiperSlide>
                  <JobPostComponent job={str} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="mt-[100px] pb-10">
        <div className="2xl:max-w-[1400px] xl:max-w-[1320px] w-full px-3 mx-auto ">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <div className="bg-widgetBgColor p-8 rounded-2xl">
                <p className="text-[18px] font-[600]">Search by Location</p>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">Country</label>
                  <select
                    className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm"
                    onChange={(e) => setCountryId(e.target.value)}
                    value={countryId}
                  >
                    <option value="">Select Country</option>
                    {countries?.map((country) => (
                      <option key={country.Id} value={country.Id}>
                        {country.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">State</label>
                  <select
                    className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm"
                    onChange={(e) => setStateId(e.target.value)}
                    value={stateId}
                  >
                    <option value="">Select State</option>
                    {states
                      ?.filter((el) => {
                        return el?.CountryId === countryId;
                      })
                      .map((state) => (
                        <option key={state.Id} value={state.Id}>
                          {state.Name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mt-2 lg:mt-3">
                  <label className="font-light block mb-2">City</label>
                  <select
                    className="border-0 block w-full font-light text-[var(--pxpTextColor)] bg-white rounded-r-[30px] px-3 py-4 appearance-none border-none outline-none rounded-sm"
                    onChange={(e) => setCityId(e.target.value)}
                    value={cityId}
                  >
                    <option value="">Select City</option>
                    {city
                      ?.filter((el) => {
                        return el?.CountryId === countryId;
                      })
                      .map((city) => (
                        <option key={city.Id} value={city.Id}>
                          {city.Name}
                        </option>
                      ))}
                  </select>
                </div>
                <Button className="mt-4" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 xl:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[22px] font-[600] text-widgetColor">
                  Showing {jobs?.length} Jobs
                </h3>
                <div className="w-[155px]">
                  <SeekerSelectBox
                    placeholder="Most relevant"
                    orderHandler={handleOrderChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs?.map((str, index) => (
                  <div key={index} className="col-span-1">
                    <JobPostComponent job={str} />
                  </div>
                ))}
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
const JobPostComponent = ({ job }) => {
  const parsedDate = new Date(job.CreatedAt);
  const router = useRouter();
  const { handleAddJobCount } = useAddViewCount();

  return (
    <div
      onClick={() => {
        handleAddJobCount(job?.Id);
      }}
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
          {job?.FunctionalArea?.TitleEng}
        </div>
      </div>
      <div className="min-h-[54px] overflow-hidden font-semibold text-[18px] mt-[30px] transition-colors duration-300 ease-in-out text-widgetColor hover:text-widgetHoverColor">
        {job?.Title}
      </div>
      <div className="mt-[25px]  flex items-center justify-between text-[14px] text-widgetColor">
        <div className=" flex  gap-1 text-sm text-widgetColor">
          <Earth width="12px" height="12px" className="mt-[3px]" />
          {job?.Employer?.MapAddress}
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
          src={
            job.Employer?.CompanyLogo
              ? job.Employer?.CompanyLogo
              : "/image/no-image.png"
          }
          alt="logo"
        />
      </div>
    </div>
  );
};
export default JobPostPage;
