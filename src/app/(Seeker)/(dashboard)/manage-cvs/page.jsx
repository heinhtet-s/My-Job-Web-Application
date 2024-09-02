"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import PrimaryBtn from "@/components/ui/primaryBtn";
import axios from "axios";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { GeneratedCvConst } from "@/lib/queryConst";
import { format, parseISO } from "date-fns"; // Import necessary functions from date-fns

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });

  async function getCvs(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/generate_cv/get?${await apiQueryHandler(
          GeneratedCvConst,
          GeneratedCvConst.filter,
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
      setData(result.data.value);
    } catch (error) {
      console.log(error);
      // errorMessage(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCvs(paging.pageNumber, paging.perPage);
  }, [paging.pageNumber, paging.perPage]);

  return (
    <div>
      <h1 className="text-[38px] font-[700]">Manage CVs</h1>
      <p className="opacity-60 mb-[40px]">
        Edit and update your profile to attract your potential employers.
      </p>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>FileName</TableHead>
            <TableHead>Uploaded Date</TableHead>
            <TableHead>Default CV</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>MyLoad Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((cv) => {
            const isoDate = cv?.CreatedAt;
            const formattedDate = format(parseISO(isoDate), "dd/MM/yy"); // Format the date
            return (
              <TableRow key={cv.Id}>
                <TableCell className="text-primary">{cv.ImageUrl}</TableCell>
                <TableCell className="text-green-600">{formattedDate}</TableCell>
                <TableCell>
                  <Switch checked={cv.isDefault} />
                </TableCell>
                <TableCell className="text-red-700">Delete</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PrimaryBtn text="Upload" handleClick={() => {}} />
    </div>
  );
};

export default Page;
