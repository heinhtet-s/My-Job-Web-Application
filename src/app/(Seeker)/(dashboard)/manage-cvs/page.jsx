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
import { UploadedCv } from "../../../../modules/services/uploadcv_service";
import toast from "react-hot-toast";
import ApiReq from "@/lib/axiosHandler";
import Swal from "sweetalert2";
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

  async function getCvs(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/generate_cv/get?${await apiQueryHandler(
          GeneratedCvConst,
          filter,
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
    if (filter.SeekerId.value) {
      getCvs(paging.pageNumber, paging.perPage);
    }
  }, [paging.pageNumber, paging.perPage, filter]);
  const handleChange = async (event) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append("SeekerId", session?.user?.Id);
      formData.append("CvType", "1");
      formData.append("Active", "true");
      formData.append("file", event.target.files[0]);
      try {
        const data = await UploadedCv(formData);
        if (data.error) {
          toast.error("somethings wrong");
          return;
        }
        await ApiReq.post("api/generate_cv/create", {
          CVFileName: event.target.files[0]?.name,
          CVS3Url: data?.url,
        });
        await getCvs(paging.pageNumber, paging.perPage);
        toast.success("successfully created CV");
      } catch (e) {
        toast.error("something wrong");
      }
    }
  };
  const handleDelete = async (Id) => {
    try {
      await ApiReq.post("api/generate_cv/delete", {
        Id,
      });
      await getCvs(paging.pageNumber, paging.perPage);
      toast.success("Delete Successfully");
    } catch (e) {
      toast.error("Somethings wrong.Please try again");
    }
  };
  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      text: "Delete Job Experience",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
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
