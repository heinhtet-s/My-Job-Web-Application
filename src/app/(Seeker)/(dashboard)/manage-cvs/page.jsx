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
import { Switch } from "@/components/ui/switch";
import PrimaryBtn from "@/components/ui/primaryBtn";
import axios from "axios";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { GeneratedCvConst } from "@/lib/queryConst";
import { format, parseISO } from "date-fns"; // Import necessary functions from date-fns
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState(GeneratedCvConst.filter);
  const SEEKERID = session?.user?.Id;
  const [loading, setLoading] = useState(false);
  const file = useRef(null);
  const fileExplore = () => {
    if (file.current) {
      file.current.click();
    }
  };
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 100,
    total: 0,
  });
  console.log(data);
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
                <TableCell className="text-primary">{cv.CVFileName}</TableCell>
                <TableCell className="text-green-600">
                  {formattedDate}
                </TableCell>
                <TableCell>
                  <Switch checked={cv.Active} />
                </TableCell>
                <TableCell
                  className="text-red-700"
                  onClick={() => handleConfirmDelete(cv?.Id)}
                >
                  Delete
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <input
        type="file"
        id="file"
        ref={file}
        accept="pdf/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <PrimaryBtn text="Upload" handleClick={fileExplore} />
    </div>
  );
};

export default Page;
