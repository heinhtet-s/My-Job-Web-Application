"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SearchIcon from "@/asset/Icon/SearchIcon";
import FilterIcon from "@/asset/Icon/FilterIcon";
import { cn } from "@/lib/utils";
import LocationIcon from "@/asset/Icon/LocationIcon";
import "../../../components/css/home.css";
import SportLightIcon from "@/asset/Icon/SportLightIcon";
import HilightIcon from "@/asset/Icon/HilightIcon";
import ArrowLeft from "@/asset/Icon/ArrowLeft";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import PaginatedItems from "@/components/share/pagination";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { chooseTime, workTypes } from "@/lib/const";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";
import { comma } from "postcss/lib/list";

const HomePage = ({ candidates, industries, jobPosts, functionalAreas }) => {
  console.log(jobPosts, "jobPosts");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(EmployersConst.filter);
  const [companies, setCompnanies] = useState([]);
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 100,
    total: 0,
  });
  const router = useRouter();

  async function getEmployers(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/employer_lists/getOpenPostion?${await apiQueryHandler(
          EmployersConst,
          {
            isFeatured: { value: "true", type: "boolean", label: "isFeatured" },
          },

          EmployersConst.order,
          EmployersConst.fields,
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
      setCompnanies(result.data);
    } catch (error) {
      // errorMessage(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getEmployers(paging.pageNumber, paging.perPage);
  }, []);

  return (
    <>
      <BannerComponent />
      <FilterJobComponent
        industries={industries}
        functionalAreas={functionalAreas}
      />
      <FeatureCampanyComponent companies={companies} />
      <FeatureJobPostComponent jobPosts={jobPosts} />
      <SubBannerComponent />

      <div className="w-full py-10 bg-[#ffefdc]">
        <p className="text-[#111] text-4xl font-poppins font-semibold leading-normal text-center">
          Candidates Showcase for Organizations
        </p>
        <p className="text-[#666] text-sm font-normal leading-normal mt-2 text-center">
          Discover top candidates who perfectly match your company's success.
        </p>
        <div className="max-w-[1250px] mx-auto my-8 grid grid-cols-6 gap-4">
          {candidates?.map((str, index) => (
            <div className="rounded-lg cursor-pointer  bg-white flex p-4 flex-col items-center gap-4 relative overflow-hidden w-[195px] h-[240px] transition-all duration-300 ease hover:bg-[#eee]">
              <img
                src={str.ImageUrl ? str.ImageUrl : "/image/no-image.png"}
                alt="description"
                className="w-[81px] h-[81px] object-cover rounded-full"
              />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="text-black mb-[1rem] text-sm font-semibold leading-normal">
                    {str?.FirstName?.charAt(0).toUpperCase() +
                      str?.FirstName?.slice(1)}{" "}
                    {str?.LastName?.charAt(0)?.toUpperCase() +
                      str?.LastName?.slice(1)}
                  </p>
                  <p className="text-white text-center font-normal text-[10px] leading-normal flex items-center gap-2 p-[4px_6px_4px_8px] rounded-br-[12px] bg-[#F47920] absolute top-0 left-0">
                    full time
                  </p>
                </div>
              </div>
              <div>
                <div className="text-left text-[#666] text-[12px] font-normal leading-normal flex justify-start items-center gap-2">
                  <BriefcaseBusiness width={"12px"} />
                  Information Technology
                </div>
                <div className="text-left text-[#666] text-[12px] font-normal leading-normal flex justify-start items-center gap-2">
                  <MapPin width={"12px"} />
                  {str?.Address}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ViewMoreBtn text={"View All Candidates"} />
      </div>
    </>
  );
};
// const FeatureJobPostComponent = ({ jobPosts }) => {
//   const router = useRouter();

//   return (
//     <div className="bg-jobBg">
//       <div className="max-w-[1280px] mx-auto p-8 px-4">
//         <p className="text-[#111] text-4xl font-poppins font-semibold leading-normal text-center">
//           Featured Jobs Offer
//         </p>
//         <p className="text-[#666] text-sm font-normal leading-normal mt-2 text-center">
//           Search your career opportunity through 103 jobs
//         </p>

//         <div className="mt-[32px] relative">
//           <div className="flex items-center mb-[8px]">
//             <SportLightIcon />
//             <p className="text-secondary text-[18px] font-[600] mb-[8px]">
//               Spotlight Jobs
//             </p>
//           </div>
//           <div className=" relative">
//             <Swiper
//               style={{
//                 width: "100%",
//               }}
//               loop={true}
//               navigation={true}
//               spaceBetween={15}
//               pagination={{
//                 clickable: true,
//               }}
//               slidesPerView={3}
//               autoplay={{
//                 delay: 7000,
//               }}
//               speed={700}
//               modules={[Autoplay, Navigation]}
//               className="mySwiper"
//             >
//               {jobPosts?.map((str, index) => (
//                 <SwiperSlide>
//                   <JobCardComponent isFeatureCard={true} jobPost={str} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//         <div className="mt-[32px] relative">
//           <div className="flex items-center mb-[8px]">
//             <HilightIcon />
//             <p className="text-[#666] text-[18px] font-[600] ">
//               Highlight Jobs
//             </p>
//           </div>
//           <div className="relative flex-wrap	 flex justify-start items-center max-w-[1440px] mx-auto overflow-hidden  gap-4 my-2 mb-6">
//             {jobPosts?.map((str, index) => (
//               <JobCardComponent isFeatureCard={false} jobPost={str} />
//             ))}
//           </div>
//         </div>
//         <ViewMoreBtn text={"View All Job"} />
//       </div>
//     </div>
//   );
// };

const FeatureJobPostComponent = ({ jobPosts }) => {
  const router = useRouter();

  // Separate jobs into Spotlight and Highlight
  const spotlightJobs = jobPosts?.filter(
    (job) => job.JobUnitType === "Spotlight"
  );
  const highlightJobs = jobPosts?.filter(
    (job) => job.JobUnitType === "Highlight"
  );

  return (
    <div className="bg-jobBg">
      <div className="max-w-[1280px] mx-auto p-8 px-4">
        <p className="text-[#111] text-4xl font-poppins font-semibold leading-normal text-center">
          Featured Jobs Offer
        </p>
        <p className="text-[#666] text-sm font-normal leading-normal mt-2 text-center">
          Search your career opportunity through {jobPosts?.length || 0} jobs
        </p>

        {/* Spotlight Jobs Section */}
        {spotlightJobs?.length > 0 && (
          <div className="mt-[32px] relative">
            <div className="flex items-center mb-[8px]">
              <SportLightIcon />
              <p className="text-secondary text-[18px] font-[600] mb-[8px]">
                Spotlight Jobs
              </p>
            </div>
            <div className="relative">
              <Swiper
                style={{ width: "100%" }}
                loop={true}
                navigation={true}
                spaceBetween={15}
                pagination={{ clickable: true }}
                slidesPerView={3}
                autoplay={{ delay: 7000 }}
                speed={700}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
              >
                {spotlightJobs?.map((job, index) => (
                  <SwiperSlide key={job.Id || index}>
                    <JobCardComponent isFeatureCard={true} jobPost={job} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        {/* Highlight Jobs Section */}
        {highlightJobs?.length > 0 && (
          <div className="mt-[32px] relative">
            <div className="flex items-center mb-[8px]">
              <HilightIcon />
              <p className="text-[#666] text-[18px] font-[600]">
                Highlight Jobs
              </p>
            </div>
            <div className="relative flex-wrap flex justify-start items-center max-w-[1440px] mx-auto overflow-hidden gap-4 my-2 mb-6">
              {highlightJobs?.map((job, index) => (
                <JobCardComponent
                  key={job.Id || index}
                  isFeatureCard={false}
                  jobPost={job}
                />
              ))}
            </div>
          </div>
        )}

        <ViewMoreBtn text={"View All Job"} />
      </div>
    </div>
  );
};

const ViewMoreBtn = ({ text }) => {
  return (
    <div className="flex w-fit cursor-pointer px-5 py-2 justify-center items-center gap-2 rounded-full bg-[#f47920] text-white font-poppins text-[14px] font-medium leading-normal mx-auto mt-8 border-none">
      {text}
      <ArrowLeft />
    </div>
  );
};
const FeatureCampanyComponent = ({ companies }) => {
  const router = useRouter();
  return (
    <div
      className="w-full  bg-cover bg-no-repeat pt-[40px] overflow-x-hidden  "
      style={{
        backgroundImage: "url('/image/jobBanner.jpg')",
        backgroundPosition: "50%",
      }}
    >
      <p className="text-white font-poppins text-[32px] font-semibold leading-normal text-center mb-2">
        Featured companies
      </p>
      <p className="text-[#f2f2f2] font-poppins text-[14px] text-sm font-normal leading-normal text-center">
        Work for the best companies in Myanmar
      </p>
      <div className="w-full flex  mx-auto overflow-x-scroll scrollable-no-scrollbar pr-10">
        <div className="flex gap-4 cursor-pointer my-10 mr-10  ">
          {companies?.map((str, index) => (
            <div
              onClick={() => router.push(`/companies/${str.Id}`)}
              className={cn(
                "cursor-pointer hover:translate-y-[-10px] relative flex flex-col min-w-0 break-words flex-none basis-[200px] h-[260px] p-4 pt-2 items-center rounded-md bg-white border border-[rgba(0,0,0,0.125)] gap-1 transition-all duration-500 ease-in-out",
                index === 0 ? "ml-[8rem]" : ""
              )}
            >
              <div>
                <img
                  className="w-[120px] h-[120px] object-contain"
                  src={
                    str.companyLogo ? str.companyLogo : "/image/no-image.png"
                  }
                  alt="logo"
                />
              </div>
              <p className="text-[#111] mb-[16px] text-center font-poppins text-sm font-medium leading-normal">
                {str?.CompanyName}
              </p>
              <p className="text-[#f47920] text-center font-poppins text-xs font-normal leading-normal">
                {str?.OpenPositionCount} Open Positions
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterJobComponent = ({ industries, functionalAreas }) => {
  const [showFilter, setShowFilter] = useState(false);
  const FilterFunction = () => {
    setShowFilter((prev) => !prev);
  };
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [industrialId, setIndustrialId] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [functionalId, setFunctionalId] = useState("");
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      title: title.toLowerCase(),
      jobType: jobType,
      industryId: industrialId,
      countryId: countryId,
      selectedTime,
      functionalAreaId: functionalId,
    });
    router.push(`/jobs?${queryParams.toString()}`);
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/api/master/get_country");
        setCountries(res.data.value);
      } catch (err) {}
    };

    fetchCountries();
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(0deg, #ffd5a5 0%, #ffd5a5 100%), lightgray 50% / cover no-repeat",
      }}
      className="w-full  bg-cover bg-no-repeat relative flex flex-col items-center justify-center gap-2.5 py-10 flex-col"
    >
      <div className="flex justify-center gap-4 items-center">
        <div className="flex items-center justify-center gap-4 p-2 rounded-[8px] border-2 border-[#f47920] bg-white">
          <div className="flex justify-center items-center gap-4 mx-4">
            <SearchIcon />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title or Keyword"
              className="text-[#666] font-poppins border-none outline-none  text-base font-normal leading-normal border-0 focus:ring-0 "
            />
          </div>
          <div className="h-12 w-px bg-[#ccc]" />
          <div className="w-[223px] h-auto box-border relative mx-4 flex justify-center items-center gap-1.5">
            <select
              className="block w-full py-1 px-3  font-normal text-[14px] text-gray-800 bg-white outline-none border-none rounded-md appearance-none focus:ring-0  "
              value={industrialId}
              onChange={(e) => setIndustrialId(e.target.value)}
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
              }}
            >
              <option>Select Industry</option>
              {industries?.map((industry) => (
                <option key={industry.Id} value={industry.Id}>
                  {industry.TitleEng}
                </option>
              ))}
            </select>
          </div>
          <div className="h-12 w-px bg-[#ccc]" />

          <div className="w-[223px] h-auto box-border relative mx-4 flex justify-center items-center gap-1.5">
            <select
              className="block font w-full text-[14px] py-1 px-3  font-normal text-gray-800 bg-white  border-none rounded-md appearance-none outline-none focus:ring-0 "
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              style={{
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
          <div onClick={FilterFunction} className="cursor-pointer">
            <FilterIcon />
          </div>
        </div>
        <div
          style={{
            flex: "0 0 auto",
            width: "auto",
          }}
        >
          <button
            className=" h-[56px] border-0 px-[20px] mr-[13px] rounded-[8px] text-white bg-primary transition-colors"
            onClick={handleSearch}
          >
            Find Jobs
          </button>
        </div>
      </div>
      {showFilter && (
        <div className="flex">
          <div className="w-[223px] h-auto box-border relative mx-4 flex justify-center items-center gap-1.5">
            <select
              className="block w-full py-2 px-3  font-normal text-[14px] text-gray-800 bg-white outline-none border-none rounded-md appearance-none focus:ring-0  "
              value={functionalId}
              onChange={(e) => setFunctionalId(e.target.value)}
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
              }}
            >
              <option>Select Functional</option>
              {functionalAreas?.map((industry) => (
                <option key={industry.Id} value={industry.Id}>
                  {industry.TitleEng}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[223px] h-auto box-border relative mx-4 flex justify-center items-center gap-1.5">
            <select
              className="block w-full py-2 px-3  font-normal text-[14px] text-gray-800 bg-white outline-none border-none rounded-md appearance-none focus:ring-0  "
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
              }}
            >
              <option>Select Country</option>
              {countries?.map((industry) => (
                <option key={industry.Id} value={industry.Id}>
                  {industry.NameEng}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[223px] h-auto box-border relative mx-4 flex justify-center items-center gap-1.5">
            <select
              className="block w-full py-2 px-3  font-normal text-[14px] text-gray-800 bg-white outline-none border-none rounded-md appearance-none focus:ring-0  "
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
              }}
            >
              <option>Any Time</option>
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
      )}
    </div>
  );
};
const JobCardComponent = ({ isFeatureCard, jobPost }) => {
  let parsedDate;
  try {
    if (jobPost?.CreatedAt) {
      parsedDate = new Date(jobPost.CreatedAt);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }
    }
  } catch (error) {
    parsedDate = null;
  }
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/jobs/${jobPost?.Id}`)}
      className={cn(
        "flex  h-[230px] p-4 flex-col items-start gap-3 rounded-lg flex-nowrap transition-all duration-300 ease-in-out ",
        isFeatureCard
          ? "bg-secondary hover:bg-secondaryHover w-[405px] text-white "
          : "bg-white hover:bg-[#f2f2f2] text-textBlack flex-none basis-[405px]  "
      )}
    >
      <div className=" flex  mb-[1rem] justify-between items-center w-full min-h-[58px]">
        <p
          className={cn(
            "text-[18px] font-[600]",
            isFeatureCard && "text-white"
          )}
        >
          {jobPost?.Title}
        </p>
        <p
          className={cn(
            " text-xs font-poppins font-normal leading-normal min-w-[60px] text-right",
            isFeatureCard && "text-white"
          )}
        >
          {parsedDate
            ? formatDistanceToNow(parsedDate, { addSuffix: true })
            : "Date not available"}
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <LocationIcon />
        <p
          className={cn(
            " text-xs font-poppins font-normal leading-normal",
            isFeatureCard && "text-white"
          )}
        >
          {jobPost?.Employer?.MapAddress}
        </p>
        <div className="flex items-center gap-2 p-1 px-2 text-[#f69322] text-[10px] font-poppins font-normal leading-normal rounded-md bg-[#ffefdc] text-center">
          {jobPost?.JobType}
        </div>
      </div>
      <div className="flex justify-between items-end gap-6">
        <div className="flex justify-center items-center gap-2">
          <div className="flex w-[72px] h-[72px] p-[15.434px] justify-center items-center shrink-0 bg-white rounded-lg overflow-hidden">
            <img
              src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/433edc96-31d5-405b-ae81-db56f281c463.PNG"
              alt="ff"
              className="w-full"
            />
          </div>
          <p
            className={cn(
              "text-[16px]  font-semibold leading-normal",

              isFeatureCard && "text-white"
            )}
          >
            {jobPost.Employer.CompanyName}
          </p>
        </div>
        <button
          className={cn(
            "flex p-2 px-4 justify-center items-center gap-2 rounded-md border  font-poppins text-xs font-medium leading-normal bg-transparent cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out",
            isFeatureCard ? "border-[#fff] text-white" : "border-black "
          )}
        >
          Apply Now{" "}
        </button>
      </div>
    </div>
  );
};
const BannerComponent = () => {
  return (
    <div className="relative">
      <Swiper
        style={{
          width: "100%",
        }}
        loop={true}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        speed={700}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img
            src="/image/banner2.png"
            alt="banner"
            className="w-full h-[530px] object-cover object-center"
          />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide>
<SwiperSlide>Slide 3</SwiperSlide>
<SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
      <div className="max-w-[1250px] z-10 mx-auto absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="flex items-center mb-[16px] gap-2 bg-black bg-opacity-80 text-[#f2f2f2] text-sm font-medium leading-normal max-w-[162px] whitespace-nowrap p-1">
          Most Recent Searches
        </p>
        <div className=" flex gap-[16px] mt-[4px]">
          <div className="flex items-center justify-center p-4 gap-2  cursor-pointer rounded-lg bg-black bg-opacity-60 backdrop-blur-sm text-white transition-all duration-300 ease-linear hover:bg-white hover:text-black group">
            <div className="flex w-10 h-10 justify-center items-center gap-2 rounded bg-white">
              <img
                src="https://myjobs.com.mm/home_page_theme/images/Design.svg"
                className="w-full"
              />
            </div>
            <div className="flex justify-between  items-center text-sm gap-[13px]">
              <p className="text-white">Adminstrative</p>
              <p className="text-right text-bannerText font-bold text-xs">
                7{" "}
                <span className="text-right text-[#f2f2f2] text-[10px] font-bold transition-all duration-300 ease-linear group-hover:text-[#666]">
                  Open positions
                </span>
              </p>
            </div>
          </div>
          <div className="flex h-fit items-center justify-center p-4 gap-2  cursor-pointer rounded-lg bg-black bg-opacity-60 backdrop-blur-sm text-white transition-all duration-300 ease-linear hover:bg-white hover:text-black group">
            <div className="flex w-10 h-10 justify-center items-center gap-2 rounded bg-white">
              <img
                src="https://myjobs.com.mm/home_page_theme/images/view_more.svg"
                className="w-full"
              />
            </div>
            <div>
              <p className="font-thin text-[14px] text-white">View More</p>
              <p className="font-thin  text-[14px] text-white ">Industries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SubBannerComponent = () => {
  return (
    <div className="relative">
      <Swiper
        style={{
          width: "100%",
        }}
        loop={true}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        speed={700}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img
            src="/image/banner2.png"
            alt="banner"
            className="w-full  object-cover object-center"
          />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide>
<SwiperSlide>Slide 3</SwiperSlide>
<SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default HomePage;
