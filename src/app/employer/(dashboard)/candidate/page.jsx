"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/stripedTable";
import PrimaryBtn from "@/components/ui/primaryBtn";
import PaginatedItems from "@/components/share/pagination";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { AppliedJobPostConst } from "@/lib/queryConst";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { getFavJob } from "@/modules/services/jobFav_service";
import { GetCandidateList } from "@/modules/services/employer_jobposts";
import moment from "moment";
import { Earth } from "lucide-react";
import { inputStyle, labelStyle, selectStyle } from "@/components/ui/form";
import { CareerLevel, EXPCONST, HighestQua, JobType } from "@/lib/const";
import { getJobPost } from "@/modules/services/jobPost_service";
import ApiReq from "@/lib/axiosHandler";

const Page = () => {
  const [functionalArea, setFuncaionalArea] = useState([]);
  const getFunctionalArea = async () => {
    try {
      const data = await ApiReq.get("api/functional_area/get");

      setFuncaionalArea(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFunctionalArea();
  }, []);
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedHighestQualification, setSelectedHighestQualification] =
    useState("");
  const [selectedExperienceLength, setSelectedExperienceLength] = useState("");
  const [selectedCareerLevel, setSelectedCareerLevel] = useState("");

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [filter, setFilter] = useState(AppliedJobPostConst.filter);
  const SEEKERID = session?.user?.Id;
  const [data, setData] = useState([]);
  const [totalPage, setTotal] = useState(0);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });
  const [countData, setCountData] = useState([]);
  console.log(countData);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getJobPost(
  //         `?$filter=EmployerId eq ${session?.user?.Id}&$top=100&$expand=FunctionalArea`
  //       );

  //       setCountData(res?.value);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   if (session?.user?.Id) fetchData();
  // }, [session?.user?.Id]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const getFavJobList = async () => {
    setLoading(true);
    try {
      let filterQuery = `&$filter=EmployerId eq ${session?.user?.Id}`;

      if (selectedFunctionalArea) {
        filterQuery += ` and Seeker/CareerInfos/any(c: c/CurrentFunctionalArea eq '${selectedFunctionalArea}')`;
      }
      if (selectedJobType) {
        filterQuery += ` and Seeker/CareerInfos/any(c: c/JobType eq '${selectedJobType}')`;
      }
      if (selectedHighestQualification) {
        filterQuery += ` and Seeker/CareerInfos/any(c: c/HighQualification eq '${selectedHighestQualification}')`;
      }
      if (selectedExperienceLength) {
        filterQuery += ` and Seeker/CareerInfos/any(c: c/YearsOfExperience eq '${selectedExperienceLength}')`;
      }
      if (selectedCareerLevel) {
        filterQuery += ` and Seeker/CareerInfos/any(c: c/CareerLevel eq '${selectedCareerLevel}')`;
      }

      const data = await GetCandidateList(
        `${filterQuery}&$orderby=CreatedAt desc&$top=${paging?.perPage}&$skip=${
          (paging?.pageNumber - 1) * paging?.perPage
        }`
      );
      setTotal(data?.["@odata.count"]);
      setData(data?.value);

      const res = await getJobPost(
        `?$filter=EmployerId eq ${session?.user?.Id} and Id in (${data?.value
          ?.map((el) => el?.JobId)
          .join(",")})&$expand=FunctionalArea`
      );

      setCountData(res?.value);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.Id) {
      getFavJobList();
    }
  }, [session?.user?.Id, paging]);

  return (
    <div>
      <h1 className="text-[38px] font-[700]">Candidate</h1>
      <p className="opacity-60 mb-[40px]">Detailed list of your Candidate</p>

      <div className="grid grid-rows-1 grid-cols-12 gap-8 mb-[40px]">
        <div className="col-span-4">
          <label className={labelStyle}>Current Functional Area</label>
          <select
            className={selectStyle}
            value={selectedFunctionalArea}
            onChange={(e) => setSelectedFunctionalArea(e.target.value)}
          >
            <option value="">Select Functional Area</option>
            {functionalArea?.map((el) => (
              <option value={el?.Id} key={el?.Id}>
                {el?.TitleEng}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div className="col-span-4">
          <label className={labelStyle}>Preferred Job Type</label>
          <select
            className={selectStyle}
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
          >
            <option value="">Select Preferred Job Type</option>
            {JobType?.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Highest Qualification */}
        <div className="col-span-4">
          <label className={labelStyle}>
            Education Level <span className="text-red-800">*</span>
          </label>
          <select
            className={selectStyle}
            value={selectedHighestQualification}
            onChange={(e) => setSelectedHighestQualification(e.target.value)}
          >
            <option value="">Select</option>
            {HighestQua.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Length */}
        <div className="col-span-4">
          <label className={labelStyle}>Experience Length</label>
          <select
            className={selectStyle}
            value={selectedExperienceLength}
            onChange={(e) => setSelectedExperienceLength(e.target.value)}
          >
            <option value="">Select</option>
            {EXPCONST?.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Career Level */}
        <div className="col-span-4">
          <label className={labelStyle}>Career Level</label>
          <select
            className={selectStyle}
            value={selectedCareerLevel}
            onChange={(e) => setSelectedCareerLevel(e.target.value)}
          >
            <option value="">Select Career Level</option>
            {CareerLevel?.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Buttons */}
        <div className="col-span-4 flex items-center gap-2">
          <PrimaryBtn text="Search" handleClick={getFavJobList} />
          <button
            className="text-base border-0 outline-none p-2.5 text-[#pxpMainColor] bg-white underline"
            onClick={() => {
              setSelectedFunctionalArea("");
              setSelectedJobType("");
              setSelectedHighestQualification("");
              setSelectedExperienceLength("");
              setSelectedCareerLevel("");
              getFavJobList();
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Applied For</TableHead>
            <TableHead> Current Functional Area</TableHead>
            <TableHead> Work Type</TableHead>
            <TableHead> Education Level</TableHead>
            <TableHead> Experiences Length</TableHead>
            <TableHead>Career Level </TableHead>
            <TableHead>Apply Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan="5">Loading...</TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {/* <p className="text-primary font-[500]"> */}
                    {item?.Seeker?.FirstName + " " + item?.Seeker?.LastName}
                    {/* </p> */}
                    {/* <p className="flex gap-1 items-center">
                      <Earth width={"12px"} />
                      {item?.Seeker?.Address}
                    </p> */}
                  </TableCell>
                  <TableCell>
                    {
                      countData?.filter((el) => el?.Id === item?.JobId)?.[0]
                        ?.Title
                    }
                  </TableCell>
                  <TableCell>
                    {
                      functionalArea?.find(
                        (el) =>
                          el?.Id ===
                          item?.Seeker?.CareerInfos?.[0]?.CurrentFunctionalArea
                      )?.TitleEng
                    }
                  </TableCell>
                  <TableCell>
                    {item?.Seeker?.CareerInfos?.[0]?.JobType}
                  </TableCell>
                  <TableCell>
                    {item?.Seeker?.CareerInfos?.[0]?.HighQualification}
                  </TableCell>
                  <TableCell>
                    {item?.Seeker?.CareerInfos?.[0]?.YearsOfExperience}
                  </TableCell>
                  <TableCell>
                    {item?.Seeker?.CareerInfos?.[0]?.CareerLevel}
                  </TableCell>
                  <TableCell>
                    {moment(item?.CreatedAt).format("DD MMM YYYY")}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="5">No Candidate found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default Page;
