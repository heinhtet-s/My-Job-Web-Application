"use client";
import ImageCropper from "@/app/(Seeker)/(dashboard)/edit-personal-info/ImageUploadComponent";
import React, { useEffect, useState } from "react";
import EmployerImageCropper from "./EmployerCrop";
import { useSession } from "next-auth/react";
import axios from "axios";
import ApiReq from "@/lib/axiosHandler";
import PrimaryBtn from "@/components/ui/primaryBtn";
import toast from "react-hot-toast";
const page = () => {
  const [infoData, setInfoData] = useState({});
  const { data: session } = useSession();
  const [masterData, setMasterData] = useState({});

  const fetchMasterData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const masterData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/master/get?include=country,city,state`
      );
      setMasterData(masterData.data);
    } catch (e) {}
  };

  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const personalData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/employer_lists/getById`
      );
      setInfoData(personalData.data);
    } catch (e) {}
  };
  console.log(infoData, "ff");
  const handleSubmit = async (AboutMe) => {
    const filteredObj = Object.fromEntries(
      Object.entries(infoData).filter(
        ([key, value]) => key !== "@odata.context"
      )
    );
    console.log(filteredObj);
    try {
      await ApiReq.post("api/employer_lists/update", {
        ...filteredObj,
        ...AboutMe,
      });
      fetchInfoData();
      toast.success("Successfully Updated");
    } catch (e) {
      toast.error("something worng");
    }
  };
  useEffect(() => {
    fetchInfoData();
    fetchMasterData();
  }, [session]);
  return (
    <div>
      <h1 className=" text-[38px] font-[700]">Edit Profile</h1>
      <p>Edit your company profile page info.</p>

      <h3 className="mt-[10px]">Company Details </h3>
      <div className="flex items-center gap-8 mt-[20px]">
        <img
          src={
            infoData?.CompanyLogo
              ? infoData?.CompanyLogo
              : "/image/no-image.png"
          }
          className="w-[150px] h-[150px]"
        />
        <div>
          <EmployerImageCropper handleSubmit={handleSubmit} />
          <div className="mt-[20px]">
            <PrimaryBtn
              size="small"
              handleClick={() => {
                handleSubmit({ CompanyLogo: null });
              }}
              text={"remove Photo"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
