"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import {
  GetEmployerProfileViewCount,
  GetEmployersList,
} from "@/modules/services/employer_service";
import { getEmployerById } from "@/lib/generalApi";
import moment from "moment";
import PaginatedItems from "@/components/share/pagination";
const page = () => {
  const [totalPage, setTotal] = useState(0);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });
  const [employerViewData, setEmployerViewData] = useState([]);
  const { data: session } = useSession();
  const fetchEmployerView = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const odataUrl = `?$count=true&$filter=SeekerId eq ${
        session?.user?.Id
      } and View eq 'Employer'&$top=${paging?.perPage}&$skip=${
        (paging?.pageNumber - 1) * paging?.perPage
      }`;
      const response = await GetEmployerProfileViewCount(odataUrl);
      setTotal(response?.["@odata.count"]);
      const res = await GetEmployersList(
        `?$filter=Id in (${response?.value?.map((el) => el?.EmployerId)})` +
          `&$select=Id,CompanyName&$expand=Industry,JobPosts($filter=JobStatus eq 'Active' and IsExpired eq false;$count=true)`
      );

      const EmplyerView = response?.value?.map((el) => {
        return {
          ...el,
          ...res?.value?.find((ele) => ele?.Id === el?.EmployerId),
        };
      });
      setEmployerViewData(EmplyerView);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchEmployerView();
  }, [session?.user?.Id, paging]);
  console.log(employerViewData);
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Employer View</h1>
      <p className="opacity-60 mb-[40px]">Employers who interesting you!</p>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Opening Jobs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employerViewData.map((item) => {
            return (
              <TableRow key={item.Id}>
                <TableCell>{item?.CompanyName}</TableCell>
                <TableCell>{item?.Industry?.TitleEng}</TableCell>
                <TableCell>
                  {moment(item?.Date).format("DD MMM YYYYY")}
                </TableCell>
                <TableCell>{item?.["JobPosts@odata.count"]}</TableCell>
              </TableRow>
            );
          })}
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
