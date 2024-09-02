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
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
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
  {
    title: "Expected Salary",
    key: "Expected Salary",
    value: "500000 -800000",
  },
];
const AboutMe = ({ fetchInfoData, personalData }) => {
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
  const handleSubmit = async (AboutMe) => {
    try {
      await ApiReq.post("api/seekers/update", {
        ...personalData,
        AboutMe,
      });
      fetchInfoData();
      setOpenModal(false);
    } catch (e) {
      toast.error("something worng");
      console.log(e);
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
              src="/image/no-image.png"
              className="w-[230px]  h-[230px] block rounded-full"
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

                <PrimaryBtn
                  size="small"
                  handleClick={fileExplore}
                  text={"Upload Photo"}
                />
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
              console.log("fefwe");
              setOpenModal(true);
            }}
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
      <EditCareerInfo
        handleSubmit={handleSubmit}
        personalData={personalData}
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
                console.log;
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
              handleSubmit(aboutMe);
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
