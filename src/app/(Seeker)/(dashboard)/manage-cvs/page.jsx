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
import { useSession } from "next-auth/react";
import { UploadedCv } from "../../../../modules/services/uploadcv_service";
import toast from "react-hot-toast";
import ApiReq from "@/lib/axiosHandler";
import Swal from "sweetalert2";
import moment from "moment";
import { updateCv } from "@/modules/services/generated_cv";

const Page = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState(GeneratedCvConst.filter);
  const SEEKERID = session?.user?.Id;
  const [loading, setLoading] = useState(false);
  const file = useRef(null);
  const isApiCallInProgress = useRef(false); // Ref to track API call status

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
    if (isApiCallInProgress.current) return; // Prevent multiple API calls
    isApiCallInProgress.current = true;
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
      // Handle error
    } finally {
      isApiCallInProgress.current = false;
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
      formData.append("Active", "false");
      formData.append("file", event.target.files[0]);

      try {
        const data = await UploadedCv(formData);
        console.log(data);
        if (data.error) {
          toast.error("Something's wrong");
          return;
        }
        console.log("ddd");
        console.log(data?.url);
        // await ApiReq.post("api/generate_cv/create", {
        //   CVFileName: event.target.files[0]?.name,
        //   CVS3Url: data?.url,
        // });

        // Call getCvs once to update the list
        await getCvs(paging.pageNumber, paging.perPage);
        toast.success("Successfully created CV");
      } catch (e) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDelete = async (Id) => {
    try {
      await ApiReq.post("api/generate_cv/delete", {
        Id,
      });
      await getCvs(paging.pageNumber, paging.perPage);
      toast.success("Deleted Successfully");
    } catch (e) {
      toast.error("Something's wrong. Please try again.");
    }
  };
  const handleChangeActive = async (id) => {
    console.log(id);
    try {
      const ActiveCv = data?.filter((el) => el?.Active && el?.Id !== id);
      console.log(ActiveCv);
      if (ActiveCv) {
        await updateCv(ActiveCv?.[0]?.Id, {
          Active: false,
        });
      }
      const getChangeCv = data?.filter((el) => el?.Id === id);
      await updateCv(id, {
        Active: !Boolean(getChangeCv?.[0]?.Active),
      });
      await getCvs(paging.pageNumber, paging.perPage);
      toast.success("Successfully Updated");
    } catch (e) {
      console.log(e);
    }
  };
  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      text: "Delete Job Experience",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((cv) => {
            return (
              <TableRow key={cv.Id}>
                <TableCell className="text-primary">{cv.CVFileName}</TableCell>
                <TableCell className="text-green-600">
                  {cv?.CreatedAt
                    ? moment(cv?.CreatedAt).format("D/MM/YYYY")
                    : "-"}
                </TableCell>
                <TableCell>
                  <ShowCvSwift
                    defalutActive={cv?.Active}
                    handleChange={(e) => {
                      handleChangeActive(cv?.Id);
                    }}
                  />
                </TableCell>
                <TableCell
                  className={`${!cv?.Active ? "text-red-700" : ""}`}
                  onClick={() => {
                    if (!cv?.Active) handleConfirmDelete(cv?.Id);
                  }}
                >
                  {!cv?.Active ? "Delete" : "Cannot Delete"}
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
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <PrimaryBtn text="Upload" handleClick={fileExplore} />
    </div>
  );
};

const ShowCvSwift = ({ defalutActive, handleChange }) => {
  const [active, setActive] = useState(defalutActive);
  useEffect(() => {
    setActive(defalutActive);
  }, [defalutActive]);
  return <Switch checked={active} onClick={handleChange} />;
};

export default Page;
