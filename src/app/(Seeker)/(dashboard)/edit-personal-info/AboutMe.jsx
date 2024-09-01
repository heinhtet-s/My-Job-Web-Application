import EditIcon from "@/asset/Icon/EditIcon";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
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
const AboutMe = () => {
  const [openModal, setOpenModal] = useState(true);
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
                <PrimaryBtn
                  size="small"
                  handleClick={() => {}}
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
          <p className="opacity-60">
            I am passionate about my work. Because I love what I do, I have a
            steady source of motivation that drives me to do my best. In my last
            job, this passion led me to challenge myself daily and learn new
            skills that helped me to do better work.
          </p>
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
      <EditCareerInfo openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
const EditCareerInfo = ({ openModal, setOpenModal }) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Body className="rounded-[30px]">
        <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
          Edit About Me
        </h3>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-2">
            <textarea rows={5} className={inputStyle} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <button type="submit" className={buttonStyle}>
            Submit
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default AboutMe;
