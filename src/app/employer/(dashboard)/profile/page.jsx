"use client";
import ImageCropper from "@/app/(Seeker)/(dashboard)/edit-personal-info/ImageUploadComponent";
import React, { useEffect, useState } from "react";
import EmployerImageCropper from "./EmployerCrop";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import moment from "moment";
import ApiReq from "@/lib/axiosHandler";
import PrimaryBtn from "@/components/ui/primaryBtn";
import toast from "react-hot-toast";
import { inputStyle, labelStyle, selectStyle } from "@/components/ui/form";
import dynamic from "next/dynamic";
const TinyEditor = dynamic(() => import("@/components/ui/TinyEditor"), {
  ssr: false,
});
const OwnerShipType = ["Public", "Private", "Government", "NGO"];
const page = () => {
  const [infoData, setInfoData] = useState({});
  const { data: session } = useSession();
  const [masterData, setMasterData] = useState({});
  const [industryList, setIndustryList] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const fetchMasterData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const masterData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/master/get?include=country,city,state`
      );
      setMasterData(masterData.data);
    } catch (e) {
    } finally {
      setMasterLoading(false);
    }
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
  const handleSubmitProfile = async (AboutMe) => {
    const filteredObj = Object.fromEntries(
      Object.entries({ ...infoData, ...AboutMe }).filter(
        ([key, value]) => key !== "@odata.context"
      )
    );
    console.log(filteredObj);
    try {
      await ApiReq.post("api/employer_lists/update", {
        ...filteredObj,
      });
      fetchInfoData();
      toast.success("Successfully Updated");
    } catch (e) {
      toast.error("something worng");
    }
  };
  const getIndustry = async () => {
    try {
      const data = await ApiReq.get("api/Industry_list/get");
      console.log(data);
      setIndustryList(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchInfoData();
    getIndustry();
    fetchMasterData();
  }, [session]);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    ...infoData,
  });
  const onSubmit = (data) => {
    handleSubmitProfile(data);
  };
  useEffect(() => {
    console.log(infoData);
    reset({
      ...infoData,
      EstablishedIn: infoData?.EstablishedIn
        ? moment(infoData?.EstablishedIn)?.format("YYYY-MM-DD")
        : infoData?.EstablishedIn,
    });
  }, [infoData]);
  if (masterLoading) {
    <></>;
  }
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
          <EmployerImageCropper handleSubmit={handleSubmitProfile} />
          <div className="mt-[20px]">
            <PrimaryBtn
              size="small"
              handleClick={() => {
                handleSubmitProfile({ CompanyLogo: null });
              }}
              text={"remove Photo"}
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[20px]">
          <label className={labelStyle}>
            Company Name <span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("CompanyName")} />
          {errors.CompanyName && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <div className="grid mb-[1.5rem] mt-[20px] grid-cols-2 gap-4">
          <div className="col-span-1 ">
            <label className={labelStyle}>
              Industry Type <span className="text-red-800">*</span>
            </label>
            <select
              className={selectStyle}
              {...register("IndustryId", {
                required: "Functional Area is required",
              })}
            >
              <option value={""}>Select Industry</option>
              {industryList?.map((el) => (
                <option value={el?.Id} key={el?.Id}>
                  {el?.TitleEng}
                </option>
              ))}
              {/* Populate with country options */}
            </select>
            {errors.IndustryId && (
              <p className="text-red-800 text-[13px] mt-[2px]">
                This field is required
              </p>
            )}
          </div>

          <div className="col-span-1 ">
            <label className={labelStyle}>OwnershipType</label>
            <select className={selectStyle} {...register("OwnershipType")}>
              <option value={""}>Select Ownership</option>
              {OwnerShipType?.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
              {/* Populate with country options */}
            </select>
          </div>
        </div>
        <div className="grid mb-[1.5rem] mt-[20px] grid-cols-2 gap-4">
          <div className="col-span-1 ">
            <label className={labelStyle}>Number of Office</label>
            <select className={selectStyle} {...register("NumberOfOffice")}>
              <option value={""}>Select Number of Office</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
              {/* Populate with country options */}
            </select>
            {errors.NumberOfOffice && (
              <p className="text-red-800 text-[13px] mt-[2px]">
                This field is required
              </p>
            )}
          </div>

          <div className="col-span-1 ">
            <label className={labelStyle}>Number Of Employee</label>
            <input
              className={inputStyle}
              type="number"
              placeholder="Number Of Employee"
              {...register("NumberOfEmployee")}
            />
          </div>
        </div>
        <div className="grid mb-[1.5rem] mt-[20px] grid-cols-2 gap-4">
          <div className="col-span-1 ">
            <label className={labelStyle}>EstablishedIn</label>
            <input
              type="date"
              className={inputStyle}
              {...register("EstablishedIn")}
            />
          </div>
          <div className="col-span-1 ">
            <label className={labelStyle}>Website Address</label>
            <input
              className={inputStyle}
              type="text"
              placeholder="Website Address"
              {...register("WebsiteAddress")}
            />
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-3 gap-4">
          <div className="col-span-1">
            <select
              className={selectStyle}
              defaultValue={infoData?.CountryId}
              {...register("CountryId")}
            >
              <option value={""}>Select Country</option>
              {masterData?.country?.map((el) => (
                <option value={el?.Id} key={el?.Id}>
                  {el?.Name}
                </option>
              ))}
              {/* Populate with country options */}
            </select>
          </div>
          <div className="col-span-1">
            <select
              // defaultValue={personalData?.StateId}
              className={selectStyle}
              {...register("StateId")}
            >
              <option value={""}>Select State</option>
              {masterData?.state
                ?.filter((ele) => {
                  return ele?.CountryId == watch("CountryId");
                })
                .map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-1">
            <select
              className={selectStyle}
              // defaultValue={personalData?.CityId}
              {...register("CityId")}
            >
              <option value={""}>Select City</option>
              {masterData?.city
                ?.filter((ele) => {
                  return ele?.StateId == watch("StateId");
                })
                .map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.Name}
                  </option>
                ))}
              {/* Populate with city options */}
            </select>
            {errors.CityId && (
              <p className="text-red-800 text-[13px] mt-[2px]">
                This field is required
              </p>
            )}
          </div>
        </div>
        <div className="mt-[20px]">
          <label className={labelStyle}>
            Map Address<span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("MapAddress")} />
          {errors.MapAddress && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <div className="mt-[20px]">
          <label className={labelStyle}>About the company</label>
          <TinyEditor
            text={getValues("About")}
            setTextEditor={(data) => {
              setValue("About", data);
            }}
          />
        </div>
        <div className="mt-[20px]">
          <label className={labelStyle}>
            Viber <span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("Viber")} />
          {errors.Viber && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <div className="mt-[20px]">
          <label className={labelStyle}>
            Telegram <span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("Telegram")} />
          {errors.Telegram && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <div className="mt-[20px]">
          <label className={labelStyle}>
            LinkedIn <span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("LinkedIn")} />
          {errors.LinkedIn && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <div className="my-[20px]">
          <label className={labelStyle}>
            Facebook Link <span className="text-red-800">*</span>
          </label>
          <input className={inputStyle} {...register("FacebookLink")} />
          {errors.FacebookLink && (
            <p className="text-red-800 text-[13px] mt-[2px]">
              This field is required
            </p>
          )}
        </div>
        <PrimaryBtn
          handleClick={() => {}}
          fullWidth
          text="Update Profile and Save "
        />
      </form>
    </div>
  );
};

export default page;
