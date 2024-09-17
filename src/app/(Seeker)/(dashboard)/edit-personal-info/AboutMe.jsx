import EditIcon from "@/asset/Icon/EditIcon";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import ApiReq from "@/lib/axiosHandler";
import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ImageUpaladComponent from "./ImageUploadComponent.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
const personalInfo = [
  {
    title: "First Name",
    key: "First Name",
    value: "Aung Naing Oo",
  },
  {
    title: "Last Name",
    key: "Last Name",
    value: " Oo",
  },
  {
    title: "Date of birth",
    key: "Date of birth",
    value: "21 June 1993",
  },
  {
    title: "Mobile Number",
    key: "Mobile Number",
    value: "09 526378883",
  },
  {
    title: "Gender",
    key: "Gender",
    value: "Male",
  },
  {
    title: "Martial Status",
    key: "Martial Status",
    value: "Single",
  },
  {
    title: "Address",
    key: "Address",
    value: "No. 130, Yankin street, Yankin township, Yangon.",
  },

  {
    title: "Nationality",
    key: "nationality",
    value: "Myanmar",
  },
  {
    title: "Country",
    key: "Country",
    value: "Myanmar",
  },
  {
    title: "State",
    key: "State",
    value: "Awayawaddy",
  },
  {
    title: "National ID",
    key: "National ID",
    value: "2343",
  },
  // {
  //   title: "Expected Salary",
  //   key: "Expected Salary",
  //   value: "500000 -800000",
  // },
];
const CareerInfoConts = {
  CurrentPosition: "",
  HighQualification: "",
  CurrentFunctionalArea: "",
  YearsOfExperience: "",
  CareerLevel: "",
  OverSeaExperience: "",
  CountryId: "",
  CityId: "",
  StateId: "",
  JobType: "",
  ExpectedSalary: "",
  SalaryNegotiable: "",
  Active: "",
  AboutMe: "",
  SeekerId: "",
};
const AboutMe = ({ fetchInfoData, personalData, masterData }) => {
  const [openModal, setOpenModal] = useState(false);
  const file = useRef(null);
  const fileExplore = () => {
    if (file.current) {
      file.current.click();
    }
  };
  // const handleChange = (event) => {
  //   if (event.target.files) {
  //     uploadPhoto(
  //       { data: { file: event.target.files[0] } },
  //       {
  //         onSuccess: () => {
  //           mutate();
  //         },
  //       }
  //     );
  //   }
  // };
  const [careerInfoData, setCareerInfoData] = useState({});

  const getCareerInfoData = async () => {
    try {
      const data = await ApiReq.get("api/seeker_info/career_info_list/getById");

      setCareerInfoData(data?.data?.[0]);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitCareerInfo = async (data) => {
    console.log(data);
    try {
      if (data?.Id) {
        await ApiReq.post("api/seeker_info/career_info_list/update", {
          ...careerInfoData,
          ...data,
        });
        getCareerInfoData();

        setOpenModal(false);
        toast.success("Successfully Updated");
      } else {
        await ApiReq.post("api/seeker_info/career_info_list/create", {
          ...CareerInfoConts,
          ...careerInfoData,
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
  useEffect(() => {
    getCareerInfoData();
  }, []);
  const handleSubmit = async (AboutMe) => {
    try {
      await ApiReq.post("api/seekers/update", {
        ...personalData,
        ...AboutMe,
      });
      fetchInfoData();
      setOpenModal(false);
      toast.success("Successfully Updated");
    } catch (e) {
      toast.error("something worng");
    }
  };
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-12 gap-4 mb-[40px] ">
        <div className="col-span-4 row-span-1">
          <p className="mb-[10px] text-[20px]">Profile Picture</p>
          <p className="text-primary text-[16px]">
            Your profile picture is used as the icon for your personal profile
          </p>
        </div>
        <div className="col-span-8">
          <div className="flex items-center gap-4">
            <img
              src={
                personalData?.ImageUrl
                  ? personalData?.ImageUrl
                  : "/image/no-image.png"
              }
              className="w-[230px] object-cover object-center  h-[230px] block rounded-full"
            />
            <div className="flex flex-col">
              <div className="mb-[10px]">
                <input
                  type="file"
                  id="file"
                  ref={file}
                  accept="image/*"
                  style={{ display: "none" }}
                  // onChange={handleChange}
                />
                <ImageUpaladComponent handleSubmit={handleSubmit} />
                {/* <PrimaryBtn
                  size="small"
                  handleClick={fileExplore}
                  text={"Upload Photo"}
                /> */}
              </div>
              <PrimaryBtn
                size="small"
                handleClick={() => {}}
                text={"Edit Photo"}
                color="#002745"
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">About Me</p>
          <p className="text-primary text-[16px]">
            Describe your short biography include your skills and
            accomplishments{" "}
          </p>
        </div>
        <div className="col-span-6  grid-rows-1">
          <p className="opacity-60">{personalData?.AboutMe}</p>
        </div>
        <div className="col-span-2  grid-rows-1 flex justify-center">
          <button
            className="flex h-fit items-center gap-[2px]  text-primary font-[500] "
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
      <PersonalInfo
        masterData={masterData}
        fetchInfoData={fetchInfoData}
        personalData={personalData}
      />
      <EditCareerInfo
        handleSubmit={handleSubmitCareerInfo}
        personalData={careerInfoData}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
const EditCareerInfo = ({
  openModal,
  setOpenModal,
  handleSubmit,
  personalData,
}) => {
  const [aboutMe, setAboutMe] = useState(personalData?.AboutMe);
  useEffect(() => {
    setAboutMe(personalData?.AboutMe);
  }, [personalData?.AboutMe]);
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Body className="rounded-[30px]">
        <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
          Edit About Me
        </h3>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-2">
            <textarea
              rows={5}
              value={aboutMe}
              onChange={(e) => {
                setAboutMe(e.target.value);
              }}
              className={inputStyle}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <button
            className={buttonStyle}
            onClick={() => {
              handleSubmit({ AboutMe: aboutMe });
            }}
          >
            Submit
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default AboutMe;
