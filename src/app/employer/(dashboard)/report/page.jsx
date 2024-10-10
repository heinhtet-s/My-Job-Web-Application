"use client";
import PaginatedItems from "@/components/share/pagination";
import { inputStyle, labelStyle } from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetAppliedJobPostList,
  GetEmployerJobPostList,
} from "@/modules/services/employer_jobposts";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [totalPage, setTotal] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ApplicationCount, setApplicationCount] = useState({});
  const [ApplicationList, setApplicationList] = useState([]);
  const { data: session } = useSession();

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });
  const getApplicationCount = async () => {
    try {
      const data = await GetAppliedJobPostList(
        `?$apply=filter(EmployerId eq ${session?.user?.Id})/groupby((JobId), aggregate($count as ApplicationCount))`
      );

      setApplicationCount(data?.value);
    } catch (e) {
      console.log(e);
    }
  };
  const getJobPostList = async () => {
    let filterQuery = `$count=true&$filter=EmployerId eq ${session?.user?.Id}`;

    if (fromDate && toDate) {
      filterQuery += ` and CreatedAt ge ${moment(
        fromDate
      ).toISOString()} and CreatedAt le ${moment(toDate).toISOString()}`;
    }
    try {
      const data = await GetEmployerJobPostList(
        `?${filterQuery}&$expand=Employer&$orderby=CreatedAt desc&$top=${
          paging?.perPage
        }&$skip=${(paging?.pageNumber - 1) * paging?.perPage}`
      );
      setTotal(data?.["@odata.count"]);
      setApplicationList(data?.value);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(ApplicationCount, ApplicationList);
  useEffect(() => {
    if (session?.user?.Id) {
      getApplicationCount();
    }
  }, [session?.user?.Id]);

  useEffect(() => {
    if (session?.user?.Id) {
      getJobPostList();
    }
  }, [session?.user?.Id, paging]);

  return (
    <div>
      <h1 className="text-[38px] font-[700]"> Jobs Report</h1>
      <div className="grid mb-[1.5rem] mt-[10px] grid-cols-4 gap-3">
        <div className="col-span-1 ">
          <input
            type="date"
            className={inputStyle}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <input
            type="date"
            className={inputStyle}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <PrimaryBtn
            text="Search"
            handleClick={() => {
              getJobPostList();
            }}
          />
        </div>
      </div>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead> Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead> Status</TableHead>
            <TableHead> Posted Date</TableHead>
            <TableHead>Applications </TableHead>
            <TableHead>Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ApplicationList?.length > 0 ? (
            ApplicationList?.map((item, index) => {
              return (
                <TableRow
                  key={index + 1 + (paging.pageNumber - 1) * paging.perPage}
                >
                  <TableCell>
                    {index + 1 + (paging.pageNumber - 1) * paging.perPage}
                  </TableCell>
                  <TableCell>{item?.Title}</TableCell>
                  <TableCell>{item?.Employer?.MapAddress}</TableCell>
                  <TableCell>{item?.JobType}</TableCell>
                  <TableCell>
                    {item?.JobStatus === "Active"
                      ? item?.IsExpired === true
                        ? "Expired"
                        : "Active"
                      : item?.JobStatus}
                  </TableCell>
                  <TableCell>
                    {moment(item?.CreatedAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    {ApplicationCount?.filter(
                      (el) => el?.JobId === item?.Id
                    )?.[0]?.ApplicationCount || 0}
                  </TableCell>
                  <TableCell>
                    {item?.ViewCount}
                    {/* {moment(item?.Seeker?.CreatedAt).format("DD MMM YYYY")} */}
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

export default page;
