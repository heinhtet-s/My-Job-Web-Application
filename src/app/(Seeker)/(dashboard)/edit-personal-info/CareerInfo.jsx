import EditIcon from "@/asset/Icon/EditIcon";

import PrimaryBtn from "@/components/ui/primaryBtn";
import ApiReq from "@/lib/axiosHandler";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProfileUpload from "./ImageUploadComponent";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  CareerLevel,
  EXPCONST,
  HighestQua,
  JobType,
  OverSeaExperience,
  PreferredLoaction,
} from "@/lib/const";
const personalInfo = [
  {
    title: "Professional Headline (Current Position)",
    key: "CurrentPosition",
    value: "Aung Naing Oo",
  },
  {
    title: "Highest qualification",
    key: "HighQualification",
    value: "",
  },
  {
    title: "Current Functional Area",
    key: "CurrentFunctionalArea",
    value: "21 June 1993",
  },
  {
    title: "Year of experiences",
    key: "YearsOfExperience",
    value: "09 526378883",
  },
  {
    title: "Career Level",
    key: "CareerLevel",
    value: "",
  },
  {
    title: "Preferred Country",
    key: "CountryId",
    value: "Single",
  },
  {
    title: "Preferred State",
    key: "StateId",
    value: "Single",
  },
  {
    title: "Preferred City",
    key: "CityId",
    value: "Single",
  },

  {
    title: "Preferred Job Types",
    key: "JobType",
    value: "No. 130, Yankin street, Yankin township, Yangon.",
  },
  {
    title: "Expected Salary",
    key: "ExpectedSalary",
    value: "",
  },
  {
    title: "Expat/Repat",
    key: "OverSeaExperience",
    value: "Myanmar",
  },
];

const CareerInfo = ({ fetchInfoData, masterData }) => {
  const [functionalArea, setFuncaionalArea] = useState([]);
  const [personalData, setPersonalData] = useState({});
  const [cityData, setCity] = useState([]);
  const getFunctionalArea = async () => {
    try {
      const data = await ApiReq.get("api/functional_area/get");

      setFuncaionalArea(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getCareerInfoData = async () => {
    try {
      const data = await ApiReq.get("api/seeker_info/career_info_list/getById");

      setPersonalData(data?.data?.[0]);
    } catch (e) {
      console.log(e);
    }
  };
  // const getCity = async () => {
  //   try {
  //     const data = await ApiReq.get("api/master/get_city");

  //     setCity(data?.data?.value);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  useEffect(() => {
    getFunctionalArea();
    getCareerInfoData();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const handleSubmitApi = async (data) => {
    try {
      if (data?.Id) {
        await ApiReq.post("api/seeker_info/career_info_list/update", {
          ...personalData,
          ...data,
        });
        getCareerInfoData();

        setOpenModal(false);
        toast.success("Successfully Updated");
      } else {
        await ApiReq.post("api/seeker_info/career_info_list/create", {
          ...personalData,
          ...data,
        });
        getCareerInfoData();

        setOpenModal(false);
        toast.success("Successfully Updated");
      }
    } catch (e) {
      toast.error("something wrong");
    }
  };
  const FormattedData = (key) => {
    switch (key) {
      case "CountryId":
        return masterData?.country?.filter(
          (el) => el?.Id === personalData?.[key]
        )?.[0]?.Name;

      case "CityId":
        return masterData?.city?.filter(
          (el) => el?.Id === personalData?.[key]
        )?.[0]?.Name;
      case "StateId":
        return masterData?.state?.filter(
          (el) => el?.Id === personalData?.[key]
        )?.[0]?.Name;
      case "CurrentFunctionalArea":
        return functionalArea?.filter(
          (el) => el?.Id === personalData?.[key]
        )?.[0]?.TitleEng;
      default:
        return personalData?.[key];
        break;
    }
  };
  return (
    <>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]"> Career Information </p>
          <p className="text-primary text-[16px]">
            Update your employment status and availability!
          </p>
        </div>
        <div className="col-span-6 grid-rows-1   ">
          <div className="grid grid-cols-2 gap-4 gap-y-6 ">
            {personalInfo?.map((el) => {
              return (
                <div className="grid-6">
                  <p className="mb-2">{el.title}</p>
                  <p className="opacity-60">{FormattedData(el?.key)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2  grid-rows-1 flex justify-center">
          <button
            className="flex h-fit items-center gap-[2px] text-primary font-[500] "
            onClick={() => setOpenModal(true)}
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
      <EditCareerInfo
        cityData={cityData}
        functionalArea={functionalArea}
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchInfoData={fetchInfoData}
        personalData={personalData}
        handleSubmitApi={handleSubmitApi}
        masterData={masterData}
      />
    </>
  );
};
const EditCareerInfo = ({
  openModal,
  functionalArea,
  cityData,
  setOpenModal,
  handleSubmitApi,
  personalData,
  masterData,
}) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: personalData,
  });
  useEffect(() => {
    reset(personalData);
  }, [personalData, openModal]);
  const onSubmit = (data) => {
    handleSubmitApi(data);
  };
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <form
        className="flex-1 overflow-auto  relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Body className="rounded-[30px]">
          <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
            Edit Career Info
          </h3>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Professional Headline (Current Position)
              </label>
              <input className={inputStyle} {...register("CurrentPosition")} />
              {errors.CurrentPosition && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Highest qualification <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("HighQualification", { required: true })}
              >
                <option>Select Highest Qualification</option>
                {HighestQua.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
                {/* Populate with country options */}
              </select>
              {errors.HighQualification && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Current Functional Area<span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("CurrentFunctionalArea", {
                  required: "Functional Area is required",
                })}
              >
                <option value={""}>Select Functional Area</option>
                {functionalArea?.map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.TitleEng}
                  </option>
                ))}
              </select>
              {errors.CurrentFunctionalArea && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Year of experiences
                <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("YearsOfExperience", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Year of experiences</option>
                {EXPCONST?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.CurrentFunctionalArea && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Career Level
                <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("CareerLevel", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Career Level</option>
                {CareerLevel?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.CareerLevel && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className={labelStyle}>
                Preferred Country <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("CountryId", { required: true })}
                defaultValue={personalData?.CountryId}
              >
                <option value="">Select Country</option>
                {masterData?.country?.map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.Name}
                  </option>
                ))}
                {/* Populate with country options */}
              </select>
              {errors.CountryId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Preferred State <span className="text-red-800">*</span>
              </label>
              <select
                defaultValue={personalData?.StateId}
                className={selectStyle}
                {...register("StateId", { required: true })}
              >
                <option>Select State</option>
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
              {errors.StateId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Preferred City <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("CityId", { required: true })}
              >
                <option>Select City</option>
                {masterData?.city
                  ?.filter((ele) => {
                    return ele?.CountryId == watch("CountryId");
                  })
                  .map((el) => (
                    <option value={el?.Id} key={el?.Id}>
                      {el?.Name}
                    </option>
                  ))}
                {/* Populate with city options */}
              </select>
              {errors.TownshipId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Preferred Job Type
                <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("JobType", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Preferred Job Type</option>
                {JobType?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.JobType && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className={labelStyle}>
                Expected Salary<span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className={inputStyle}
                {...register("ExpectedSalary", { required: true })}
              />
              {errors.ExpectedSalary && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Expat/Repat
                <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("OverSeaExperience")}
              >
                <option value={""}>Select Expat/Repat</option>
                {OverSeaExperience?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.OverSeaExperience && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-end">
          <button type="submit" className={cn(buttonStyle)}>
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default CareerInfo;
