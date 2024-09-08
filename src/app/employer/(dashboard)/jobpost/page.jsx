"use client";
import { inputStyle } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
const menuItem = [
  "All Job Listings",
  "Active Jobs",
  "Offline jobs",
  "Anonymous jobs",
  "Pending jobs",
];

const page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading,setLoading] = useState(false)
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countData,setCountData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/employer_lists/jobposts`);
        console.log(res.data);
        setCountData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const summarizeJobs = (jobs) => {
    const totalCount = jobs?.length;
    const onlineCount = jobs?.filter(job => job.Active && job.Online).length;
    const offlineCount = jobs?.filter(job => !job.Active).length;
  
    return {
      totalCount,
      onlineCount,
      offlineCount
    };
  };
  
  const result = summarizeJobs(countData?.jobs);
 
  const fetchJobs = async (menuIndex, pageNumber) => {
    setLoading(true);
    let filter = '';
    switch (menuIndex) {
      case 0:
        filter = '';
        break;
      case 1:
        filter = 'Active eq true';
        break;
      case 2:
        filter = 'Active eq false';
        break;
      case 3:
        filter = 'Anonymous eq true';
        break;
      case 4:
        filter = "JobStatus eq 'Active'";
        break;
      default:
        filter = '';
    }
  
    try {
    
      const url = filter
        ? `/api/employer_lists/jobposts?$filter=${encodeURIComponent(filter)}&page=${pageNumber}`
        : `/api/employer_lists/jobposts?page=${pageNumber}`;
  
      const res = await axios.get(url);
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching job posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchJobs(activeIndex, page);
  }, [activeIndex, page]);
  

  useEffect(() => {
    fetchJobs(activeIndex, page);
  }, [activeIndex, page]);


  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h1 className="text-primary text-[38px] font-[700]">Manage Jobs</h1>
      <p>Detailed list with all your job offers.</p>
      <div className="flex justify-between mt-[20px] items-center">
        <div className="relative h-fit">
          <input
            placeholder="search"
            className="pl-[35px] h-[50px] border border-[rgba(0,0,0,0.2)] font-light text-[var(--pxpTextColor)] bg-white rounded-[30px] p-4 mr-4 outline-none focus:outline-none"
          />

          <Search
            width="16px"
            className="absolute left-[10px] top-[50%] translate-y-[-50%] "
          />
        </div>
      </div>
      <div className="flex mt-[30px] items-center gap-[30px]">
        <div className="w-[220.35px] gap-[20px] flex items-center justify-center h-[112px] relative rounded-[10px] overflow-hidden border border-[#DEE2E6]">
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
              d="M48.3024 0C59.9594 0 67.79 7.98264 67.79 19.8621V53.9579C67.79 65.9412 60.2004 73.7347 48.4545 73.8089L19.9312 73.82C8.27428 73.82 0.439941 65.8374 0.439941 53.9579V19.8621C0.439941 7.87512 8.02957 0.0852767 19.7755 0.0148307L48.2987 0H48.3024ZM48.3024 5.56153L19.7941 5.57636C11.1626 5.62826 6.00147 10.9673 6.00147 19.8621V53.9579C6.00147 62.912 11.2108 68.2585 19.9275 68.2585L48.4359 68.2473C57.0674 68.1954 62.2285 62.849 62.2285 53.9579V19.8621C62.2285 10.908 57.0229 5.56153 48.3024 5.56153ZM47.5872 49.9562C49.1222 49.9562 50.368 51.202 50.368 52.737C50.368 54.272 49.1222 55.5178 47.5872 55.5178H20.8177C19.2828 55.5178 18.037 54.272 18.037 52.737C18.037 51.202 19.2828 49.9562 20.8177 49.9562H47.5872ZM47.5872 34.434C49.1222 34.434 50.368 35.6798 50.368 37.2148C50.368 38.7498 49.1222 39.9955 47.5872 39.9955H20.8177C19.2828 39.9955 18.037 38.7498 18.037 37.2148C18.037 35.6798 19.2828 34.434 20.8177 34.434H47.5872ZM31.0313 18.9478C32.5663 18.9478 33.8121 20.1935 33.8121 21.7285C33.8121 23.2635 32.5663 24.5093 31.0313 24.5093H20.8166C19.2817 24.5093 18.0359 23.2635 18.0359 21.7285C18.0359 20.1935 19.2817 18.9478 20.8166 18.9478H31.0313Z"
              fill="#F08000"
            />
          </svg>
          <div>
            <p className="text-[36px] font-bold">{result?.totalCount}</p>
            <p className="text-[16px] font-[300]">Total Jobs</p>
          </div>
        </div>
        <div className="w-[220.35px] gap-[20px] flex items-center justify-center h-[112px] relative rounded-[10px] overflow-hidden border border-[#DEE2E6]">
          <svg
            width="69"
            height="74"
            viewBox="0 0 69 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M44.1383 0C44.3083 0 44.4749 0.0134921 44.6371 0.0393995L45.1708 0.0423625C45.9766 0.0423625 46.7468 0.350791 47.3077 0.897044L67.3177 20.5064C67.843 21.0229 68.1397 21.7178 68.1397 22.435V56.5851C68.2025 65.9086 60.4765 73.4856 50.5505 73.82H18.3986C8.75998 73.6251 1.02981 66.2975 0.791483 57.3218L0.790039 16.6864C1.02308 7.46695 9.11242 0.0423625 18.837 0.0423625L43.6395 0.0393995C43.8016 0.0134921 43.9683 0 44.1383 0ZM41.1735 5.61489L18.8488 5.61638C12.3039 5.61638 6.86889 10.6033 6.71484 16.7533V56.5851C6.57265 62.9061 11.8655 68.1085 18.521 68.246H50.4478C57.0401 68.023 62.2579 62.9061 62.2147 56.6037L62.2145 25.9489L54.2815 25.9526C47.0493 25.934 41.1759 20.3897 41.1759 13.5969L41.1735 5.61489ZM32.9436 26.6025C33.7612 26.6025 34.5018 26.9147 35.038 27.4191L35.0421 27.4215L44.3085 36.1765C45.4619 37.269 45.4579 39.0304 44.3006 40.1154C43.1394 41.2005 41.2632 41.2005 40.1098 40.108L35.9044 36.1345L35.906 51.8379C35.906 53.3764 34.5788 54.625 32.9436 54.625C31.3083 54.625 29.9812 53.3764 29.9812 51.8379L29.9796 36.1345L25.7797 40.108C25.203 40.658 24.4407 40.9292 23.6823 40.9292C22.9279 40.9292 22.1695 40.658 21.5928 40.1154C20.4355 39.0304 20.4276 37.269 21.5849 36.1765L30.8434 27.4215L30.9755 27.3069C31.0327 27.2591 31.0918 27.2133 31.1528 27.1697L30.8434 27.4215C30.9536 27.3175 31.0722 27.2238 31.1975 27.1404C31.6853 26.8021 32.2898 26.6025 32.9436 26.6025ZM47.0983 8.74005L47.1007 13.5969C47.1007 17.3277 50.3238 20.3674 54.2895 20.3786L58.9677 20.3749L47.0983 8.74005Z"
              fill="#198754"
            />
          </svg>

          <div>
            <p className="text-[36px] font-bold">{result?.onlineCount}</p>
            <p className="text-[16px] font-[300]">Online Jobs </p>
          </div>
        </div>
        <div className="w-[220.35px] gap-[20px] flex items-center justify-center h-[112px] relative rounded-[10px] overflow-hidden border border-[#DEE2E6]">
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
              d="M43.4855 0C43.6555 0 43.8221 0.0134915 43.9843 0.0393977L44.5227 0.041989C45.3284 0.041989 46.0986 0.350404 46.6595 0.896632L66.6646 20.5126C67.1938 21.0291 67.4901 21.7239 67.4901 22.4411V56.9984C67.5098 66.1728 59.5868 73.7197 49.831 73.8163L18.1981 73.82H18.0835C13.3439 73.82 8.86103 72.0921 5.47615 68.9411C2.06363 65.7678 0.167784 61.5317 0.140137 57.0133V16.6852C0.140137 7.51083 8.07504 0.041989 17.8307 0.041989L42.9867 0.0393977C43.1489 0.0134915 43.3155 0 43.4855 0ZM40.5217 5.61464L17.8307 5.61575C11.3414 5.61575 6.06466 10.5838 6.06466 16.6852V56.9984C6.0844 60.0119 7.3562 62.8508 9.64306 64.98C11.926 67.1018 15.0739 68.3206 18.1783 68.2462C18.1921 68.2462 18.3077 68.2453 18.4227 68.2444L49.7994 68.2425C56.2848 68.1756 61.5774 63.1332 61.5656 57.0021L61.5655 25.9477L53.6243 25.9514C46.3964 25.9328 40.5232 20.3888 40.5232 13.5963L40.5217 5.61464ZM28.3397 32.1498L33.0923 36.6233L37.8473 32.1498C39.0046 31.0611 40.8767 31.0611 42.034 32.1498C43.1912 33.2386 43.1912 34.9999 42.034 36.0886L37.279 40.5621L42.0292 45.0289C43.1865 46.1177 43.1865 47.879 42.0292 48.9677C41.4526 49.514 40.6943 49.7852 39.9359 49.7852C39.1776 49.7852 38.4192 49.514 37.8426 48.9677L33.0923 44.5009L28.3444 48.9677C27.7677 49.514 27.0094 49.7852 26.2511 49.7852C25.4927 49.7852 24.7344 49.514 24.1577 48.9677C23.0005 47.879 23.0005 46.1177 24.1577 45.0289L28.9056 40.5621L24.153 36.0886C22.9957 34.9999 22.9957 33.2386 24.153 32.1498C25.3103 31.0611 27.1824 31.0611 28.3397 32.1498ZM46.4462 8.73966L46.4478 13.5963C46.4478 17.327 49.6707 20.3665 53.6322 20.3777L58.315 20.374L46.4462 8.73966Z"
              fill="#DC3545"
            />
          </svg>

          <div>
            <p className="text-[36px] font-bold">{result?.offlineCount}</p>
            <p className="text-[16px] font-[300]">Offline Jobs </p>
          </div>
        </div>
      </div>

      <ul
        style={{ backgroundColor: "rgb(225, 247, 254) " }}
        className="flex flex-wrap -mb-px justify-evenly mt-10 p-2  rounded-[30px] "
      >
        {menuItem?.map((el, index) => {
          return (
            <li
              className="me-2 cursor-pointer"
              onClick={() => {
                setActiveIndex(index);
                setPage(1); 
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
      </ul>
{
  jobs?.map(job=>{

  return  <div className="relative mt-[20px]   flex flex-col min-w-0 break-words bg-white border border-gray-200 rounded-md">
    <div className="flex justify-between p-2.5 mb-0 bg-gray-100 border-b border-gray-200">
    <div className="flex items-center">
  <button
    className={`inline-block me-4 font-normal text-center text-white py-2 px-3 text-base leading-6 rounded-lg cursor-default ${
      job?.Active ? 'bg-green-700 border-green-700' : 'bg-red-700 border-red-700'
    }`}
  >
    {job?.Active ? "Online" : "Offline"}
  </button>
  <p className="font-[500]">{job.JobUnitType}</p>
</div>
      <div className="flex items-center gap-2">
        <Switch />
        <p>{job?.Active===true?"Expire Job":"Clone Job"}</p>
      </div>
    </div>
    <div className="flex flex-wrap justify-between px-[32px] py-[15px]">
      <div className="w-[50%]">
        <p className="font-[600] mb-[10px]">{job?.Title}</p>
        <p className=" mb-[10px]">{job?.FunctionalArea?.TitleEng}</p>
        <p className=" mb-[10px]">Location : Yangon, Myanmar</p>
        <p className=" mb-[10px]">Expires : 21 June 2021 (in 5 days)</p>
      </div>
      <div className="w-[50%]">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
            <div className="bg-[#7D7B7B] text-white  px-2 py-1 rounded-lg">
              120
            </div>
            <p>Views</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#7D7B7B] text-white  px-2 py-1 rounded-lg">
              120
            </div>
            <p>Applications</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#7D7B7B] text-white  px-2 py-1 rounded-lg">
              120
            </div>
            <p>Shortlisted</p>
          </div>
        </div>
        <div className="flex  mt-[20px] gap-[10px] items-center">
          <button className="inline-block  me-4 font-normal text-center text-white bg-primary border-primary py-2 px-3 text-base leading-6 rounded-lg cursor-default">
            View Applications
          </button>
          <button className="inline-block  me-4 font-normal text-center text-white bg-[#7D7B7B] border-[#7D7B7B] py-2 px-3 text-base leading-6 rounded-lg cursor-default">
            Edit Job
          </button>
        </div>
      </div>
    </div>
  </div>
  })
}
    </div>
  );
};

const Switch = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  return (
    <div
      className="relative w-[75px] h-[29px] cursor-pointer"
      onClick={() => setIsSwitched(!isSwitched)}
    >
      <svg
        className={`absolute transition-opacity duration-300 ease-in-out ${
          isSwitched ? "opacity-0" : "opacity-100"
        }`}
        width="75"
        height="29"
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
          isSwitched ? "opacity-100" : "opacity-0"
        }`}
        width="75"
        height="29"
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
};

export default page;
