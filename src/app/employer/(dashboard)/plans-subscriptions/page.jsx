"use client";
import axios from "axios";
import { Check, CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GetPackageList } from "../../../../modules/services/package_service";
import "./style.css";
import { useRouter } from "next/navigation";
const page = () => {
  const [packageList, setPackageList] = useState([]);
  const fetchPackageList = async () => {
    try {
      const data = await GetPackageList();
      console.log(data);
      setPackageList(data?.value);
    } catch (e) {
      console.log(e);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchPackageList();
  }, []);
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-[38px] font-bold">Buy Packages</h1>
        <p className="opacity-60 mb-[40px]">
          {" "}
          Our Best recruitment plus employer branding packages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
        {packageList?.map((str, index) => (
          <div
            key={index}
            className="max-w-sm rounded-xl overflow-hidden shadow-xl border border-black-1"
          >
            <div className="px-[30px] py-[80px]">
              <div className="mb-5 ">
                <h3 className="font-semibold text-[22px]  text-start leading-6">
                  {str?.Title}
                </h3>
                <span className="text-[14px] text-start font-light">
                  {str?.Category}
                </span>
              </div>
              <div className="mt-8 mb-3 text-center">
                <span className="font-bold text-3xl">
                  {str?.Currency + str?.Price + "+"}
                </span>
              </div>
              <div className=" mb-3 text-center">
                <span className="font-medium text-center text-sm">
                  {str?.Description}
                </span>
              </div>
              <div className="mb-4 flex justify-center justify-items-center">
                <button className="bg-[#F69322] text-white px-10 py-2  font-bold text-2xl rounded w-[15rem] ">
                  Order
                </button>
              </div>
              <div className="mb-4 mt-8">
                <p
                  onClick={() => {
                    router.push("/employer/plans-subscriptions-details");
                  }}
                  className="underline text-center cursor-pointer text-[20px] py-[20px] text-[#F59321] font-semibold"
                >
                  Package Detail
                </p>
              </div>
              <div
                className="text-gray-600 text-sm text-start customlist"
                dangerouslySetInnerHTML={{ __html: str?.Features }}
              ></div>
              {/* <ul className="text-left">
                <li className="flex my-5 text-gray-600 text-sm  items-center">
                  {" "}
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  Sutable for Small Business and Micro Enterprises
                </li>
                <li className="flex my-5 text-gray-600 text-sm  items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  Limited Access to the quilified applicants
                </li>
                <li className="flex my-5 text-gray-600 text-sm  items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  Basic Applicant Tracking System
                </li>
                <li className="flex my-5 text-gray-600 text-sm items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  CV download
                </li>
                <li className="flex  my-5 text-gray-600 text-sm items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  Database Management
                </li>
                <li className="flex my-5  text-gray-600 text-sm  items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  User friendly job posting
                </li>
                <li className="flex my-5  text-gray-600 text-sm items-center">
                  <span>
                    <CircleCheck className="text-gray-600 mx-2" />
                  </span>
                  Job reports
                </li>
              </ul> */}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-100 mt-4 px-[100px] py-[10px] rounded-md flex  justify-between mx-auto">
        <div className="flex justify-center flex-col ">
          <h3 className="mb-4 font-semibold text-2xl">
            Contact our sale team for more info
          </h3>
          <p>Our team is happy to answer your questions.</p>
          <p className="mb-8">Let's explore how MyJobs can work for you.</p>
          <button className="bg-[#F69322] text-white px-4 py-2 w-[15rem] text-xl rounded  ">
            Contact Us
          </button>
        </div>
        <div>
          <img
            src="https://www.myjobscom.com/update_theme/images/_4141232-1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default page;
