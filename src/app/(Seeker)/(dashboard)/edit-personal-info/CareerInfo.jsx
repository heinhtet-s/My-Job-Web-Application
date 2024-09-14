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
import { EXPCONST, JobType } from "@/lib/const";
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
    title: "Preferred Location",
    key: "PreferedJobLocation",
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

const OverSeaExperience = ["Never", "Repat", "Expat"];
const CareerLevel = [
  "Graduate Trainee",
  "Internship",
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Management Level",
  "Executive Level (C-Suit)",
  "No Experience",
  "Junior Level",
  "Specialist / Expert Level",
];
const PreferredLoaction = [
  "Sittwe",
  "Aunglan",
  "Arakan",
  "Bago",
  "Bhamo",
  "Bogale",
  "Chauk",
  "Dawei",
  "Falam",
  "Hinthada",
  "Hpa-an",
  "Kalay",
  "Taik Kyi",
  "Katha",
  "Khayan",
  "Keng Tung",
  "Kyaikkami",
  "Kyaiklat",
  "Kyaikto",
  "Kyaukse",
  "Labutta",
  "Lashio",
  "Letpadan",
  "Loikaw",
  "Magway",
  "Mandalay",
  "Mottama",
  "Maubin",
  "Mawlaik",
  "Mawlamyine",
  "Pyin Oo Lwin",
  "Meiktila",
  "Myeik",
  "Minbu",
  "Mogok",
  "Monywa",
  "Mawlamyinegyun",
  "Mudon",
  "Myanaung",
  "Myingyan",
  "Myitkyina",
  "Nyaunglebin",
  "Pakokku",
  "Pathein",
  "Paungde",
  "Pyapon",
  "Pyay",
  "Pyinmana",
  "Pyu",
  "Sagaing",
  "Shwebo",
  "Thanlyin",
  "Taungdwingyi",
  "Taunggyi",
  "Thanatpin",
  "Tharrawaddy",
  "Thaton",
  "Thayet",
  "Thongwa",
  "Toungoo",
  "Twantay",
  "Wakema",
  "Yamethin",
  "Nyaungdoon",
  "Yangon",
  "Yegyi",
  "Yenangyaung",
  "Nay Pyi Taw",
  "Kamaryut Township",
  "Kyauktada Township",
  "Kyimyindine Township",
  "Ahlone Township",
  "Bahan Township",
  "Botataung Township",
  "Dagon Myothit Seikkan Township",
  "Dagon Township",
  "Dala Township",
  "Dawbon Township",
  "East Dagon Township",
  "Hlaing Township",
  "Hlaingthaya Township",
  "Lanmadaw Township",
  "Latha Township",
  "Mayangon Township",
  "Mingala Taungnyunt Township",
  "Mingaladon Township",
  "North Okkalapa Township",
  "Pabedan Township",
  "Pazundaung Township",
  "Sanchaung Township",
  "Shwepyitha Township",
  "South Dagon Township",
  "South Okkalapa Township",
  "Tamwe Township",
  "Thaketa Township",
  "Thingangyun Township",
  "Yankin Township",
  "Hlegu",
  "Hmawbi",
  "Kyauktan",
  "Kawhmu",
  "North Dagon",
  "Insein Township",
  "Hakha",
];
const HighestQua = [
  "Bachelor Degree",
  "Master Degree",
  "Doctor of Philosophy (Ph.D.)",
  "Diploma",
  "Highschool",
  "Postgraduate",
  "Certificate",
  "Unspecified",
  "Higher National Diploma (HND)",
  "Bachelor of Medicine and Surgery (M.B.B.S)",
  "Others",
  "Vocational",
  "Post Graduate Diploma",
  "Higher Diploma",
  "Executive Diploma",
  "Advanced Diploma",
  "Bachelor of Arts (B.A)",
  "Bachelor of Science (B.Sc.)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Education (B.Ed.)",
  "Bachelor of Computer Science (B.C.Sc.)",
  "Bachelor of Computer Technology (B.C.Tech)",
  "Bachelor of Agricultural Science (B.Agr.Sc.)",
  "Bachelor of Technology (B.Tech)",
  "Master of Architecture (M.Arch)",
  "Master of Computer Science (M.C.Sc.)",
  "Master of Computer Technology (M.C.Tech)",
  "Master of Medical Technology (M.Med.Tech.)",
  "Master of Agricultural Science (M.Agr.Sc.)",
  "Master of Medical Science (M.Med.Sci.)",
  "Master of Science (M.Sc)",
];

const CareerInfo = ({ fetchInfoData, masterData }) => {
  const [functionalArea, setFuncaionalArea] = useState([]);
  const [personalData, setPersonalData] = useState({});
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
  useEffect(() => {
    getFunctionalArea();
    getCareerInfoData();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const handleSubmitApi = async (data) => {
    if (data?.Id) {
      try {
        await ApiReq.post("api/seeker_info/career_info_list/update", {
          ...personalData,
          ...data,
        });
        setOpenModal(false);
        toast.success("Successfully Updated");
      } catch (e) {
        toast.error("something wrong");
      }
    } else {
      await ApiReq.post("api/seeker_info/career_info_list/create", {
        ...personalData,
        ...data,
      });
      setOpenModal(false);
      toast.success("Successfully Updated");
    }
  };
  const FormattedData = (key) => {
    switch (key) {
      case "CurrentFunctionalArea":
        return functionalArea?.filter((el) => el?.Id === personalData[key])?.[0]
          ?.TitleEng;
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
                Professional Headline (Current Position){" "}
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
                Preferred Location
                <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("PreferedJobLocation", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Preferred Location</option>
                {PreferredLoaction?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.PreferredLoaction && (
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
