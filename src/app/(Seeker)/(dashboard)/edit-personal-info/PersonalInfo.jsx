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
const personalInfo = [
  {
    title: "First Name",
    key: "FirstName",
    value: "Aung Naing Oo",
  },
  {
    title: "Last Name",
    key: "LastName",
    value: " Oo",
  },
  {
    title: "Date of birth",
    key: "DateOfBirth",
    value: "21 June 1993",
  },
  {
    title: "Mobile Number",
    key: "PhoneNum",
    value: "09 526378883",
  },
  {
    title: "Gender",
    key: "Gender",
    value: "Male",
  },
  {
    title: "Martial Status",
    key: "MaritalStatus",
    value: "Single",
  },
  {
    title: "Address",
    key: "Address",
    value: "No. 130, Yankin street, Yankin township, Yangon.",
  },

  {
    title: "Nationality",
    key: "Nationality",
    value: "Myanmar",
  },
  {
    title: "Country",
    key: "CountryId",
    value: "Myanmar",
  },
  {
    title: "State",
    key: "State",
    value: "Awayawaddy",
  },
  {
    title: "City",
    key: "CityId",
    value: "Awayawaddy",
  },
  {
    title: "National ID",
    key: "National ID",
    value: "2343",
  },
  {
    title: "Expected Salary",
    key: "Expected Salary",
    value: "500000 -800000",
  },
];
const nationalities = [
  { value: "Myanmar", label: "Myanmar" },
  { value: "Argentines", label: "Argentines" },
  { value: "Australians", label: "Australians" },
  { value: "Austrians", label: "Austrians" },
  { value: "Bangladeshis", label: "Bangladeshis" },
  { value: "Belarusians", label: "Belarusians" },
  { value: "Belgians", label: "Belgians" },
  { value: "Bruneians", label: "Bruneians" },
  { value: "Cambodians", label: "Cambodians" },
  { value: "Canadians", label: "Canadians" },
  { value: "Chinese", label: "Chinese" },
  { value: "Danes", label: "Danes" },
  { value: "Egyptians", label: "Egyptians" },
  { value: "Finns", label: "Finns" },
  { value: "French citizens", label: "French citizens" },
  { value: "Georgians", label: "Georgians" },
  { value: "Germans", label: "Germans" },
  { value: "Greeks", label: "Greeks" },
  { value: "Greenlander", label: "Greenlander" },
  { value: "Hondurans", label: "Hondurans" },
  { value: "Hungarians", label: "Hungarians" },
  { value: "Icelanders", label: "Icelanders" },
  { value: "Indians", label: "Indians" },
  { value: "Indonesians", label: "Indonesians" },
  { value: "Irish", label: "Irish" },
  { value: "Israelis", label: "Israelis" },
  { value: "Italians", label: "Italians" },
  { value: "Japanese", label: "Japanese" },
  { value: "Koreans", label: "Koreans" },
  { value: "Lao", label: "Lao" },
  { value: "Malaysians", label: "Malaysians" },
  { value: "Maldivians", label: "Maldivians" },
  { value: "Mauritanians", label: "Mauritanians" },
  { value: "Mexicans", label: "Mexicans" },
  { value: "Nepalese", label: "Nepalese" },
  { value: "New Zealanders", label: "New Zealanders" },
  { value: "Norwegians", label: "Norwegians" },
  { value: "Pakistanis", label: "Pakistanis" },
  { value: "Philippinos", label: "Philippinos" },
  { value: "Poles", label: "Poles" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Qatari", label: "Qatari" },
  { value: "Russians", label: "Russians" },
  { value: "Saudis", label: "Saudis" },
  { value: "Singaporeans", label: "Singaporeans" },
  { value: "South Africans", label: "South Africans" },
  { value: "Spaniards", label: "Spaniards" },
  { value: "Sri Lankans", label: "Sri Lankans" },
  { value: "Swedes", label: "Swedes" },
  { value: "Swiss", label: "Swiss" },
  { value: "Syrians", label: "Syrians" },
  { value: "Taiwanese", label: "Taiwanese" },
  { value: "Thais", label: "Thais" },
  { value: "British", label: "British" },
  { value: "Vietnamese", label: "Vietnamese" },
];

const PersonalInfo = ({ fetchInfoData, personalData, masterData }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleSubmitApi = async (data) => {
    try {
      await ApiReq.post("api/seekers/update", {
        ...personalData,
        ...data,
      });
      setOpenModal(false);
    } catch (e) {
      toast.error("something wrong");
    }
  };
  const FormattedData = (key) => {
    switch (key) {
      case "CountryId":
        return masterData?.country?.filter(
          (el) => el?.Id === personalData[key]
        )?.[0]?.Name;

      case "CityId":
        return masterData?.city?.filter(
          (el) => el?.Id === personalData[key]
        )?.[0]?.Name;
      default:
        return personalData[key];
        break;
    }
  };
  return (
    <>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Personal Details </p>
          <p className="text-primary text-[16px]">
            Please complete personal information
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
      {openModal && (
        <EditPersonalInfo
          openModal={openModal}
          setOpenModal={setOpenModal}
          fetchInfoData={fetchInfoData}
          personalData={personalData}
          handleSubmitApi={handleSubmitApi}
          masterData={masterData}
        />
      )}
    </>
  );
};
const EditPersonalInfo = ({
  openModal,
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
  }, [personalData, masterData]);
  const onSubmit = (data) => {
    handleSubmitApi(data);
  };
  console.log(personalData);
  console.log(watch("CountryId"));
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <form
        className="flex-1 overflow-auto  relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Body className="rounded-[30px]">
          <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
            Edit Personal Details
          </h3>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                First Name <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("FirstName", { required: true })}
              />
              {errors.FirstName && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Last Name <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("LastName", { required: true })}
              />
              {errors.LastName && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>Father's Name</label>
              <input className={inputStyle} {...register("FatherName")} />
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Gender <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("Gender", { required: true })}
              >
                <option value={null}>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Both</option>
              </select>
              {errors.Gender && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>Material Status</label>
              <select className={selectStyle} {...register("MaritalStatus")}>
                <option value="null">Select Material Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                {/* <option value="Separated">Separated</option>
                <option value="Divorced">Divorced</option>
                <option value="Widow/er">Widow/er</option> */}
              </select>
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Country <span className="text-red-800">*</span>
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
                State <span className="text-red-800">*</span>
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
                City <span className="text-red-800">*</span>
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
                Nationality <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("Nationality", { required: true })}
              >
                <option value={null}>Select Nationality</option>
                {nationalities?.map((el) => (
                  <option value={el?.label} key={el?.label}>
                    {el?.label}
                  </option>
                ))}
                {/* Populate with nationality options */}
              </select>
              {errors.Nationality && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Date of Birth<span className="text-red-800">*</span>
              </label>
              <input
                type="date"
                className={inputStyle}
                {...register("DateOfBirth", { required: true })}
              />
              {errors.DateOfBirth && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                National ID <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                placeholder="12/ABC(CDE)123456"
                className={inputStyle}
                {...register("NationalID", { required: true })}
              />
              {errors.NationalID && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Mobile Phone<span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                placeholder="Mobile Phone"
                className={inputStyle}
                {...register("PhoneNum", { required: true })}
              />
              {errors.PhoneNum && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelStyle}>
                Address<span className="text-red-800">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Address"
                className={inputStyle}
                {...register("Address", { required: true })}
              />
              {errors.Address && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelStyle}>Profile Link</label>
              <input
                type="text"
                className={inputStyle}
                {...register("ProjectUrl")}
              />
              {errors.ProjectUrl && (
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
export default PersonalInfo;
