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
const CareerInfo = () => {
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
                  <p className="opacity-60">{el.value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2  grid-rows-1 flex justify-center">
          <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
const EditCareerInfo = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Body className="rounded-[30px]">
        <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
          Edit Personal Details
        </h3>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className={labelStyle}>
              First Name <span className="text-red-800">*</span>
            </label>
            <input className={inputStyle} />
          </div>
          <div className="col-span-1">
            {" "}
            <label className={labelStyle}>
              Last Name <span className="text-red-800">*</span>
            </label>
            <input className={inputStyle} />
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className={labelStyle}>Father's Name</label>
            <input className={inputStyle} />
          </div>
          <div className="col-span-1">
            {" "}
            <label className={labelStyle}>
              Gender <span className="text-red-800">*</span>
            </label>
            <select className={selectStyle}>
              <option>Select Gender</option>
              <option>Male</option>
              <option>FeMale</option>
              <option>Both</option>
            </select>
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className={labelStyle}>Material Status</label>
            <select className={selectStyle}>
              <option>Select Material Status</option>
              <option>Divorced</option>
              <option>Married</option>
              <option>Separated</option>
              <option>Single</option>
              <option>Widow/er</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>
              Country <span className="text-red-800">*</span>
            </label>
            <select className={selectStyle}>
              <option>Select Country</option>
            </select>
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className={labelStyle}>
              State <span className="text-red-800">*</span>
            </label>
            <select className={selectStyle}>
              <option>Select State</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>
              City<span className="text-red-800">*</span>
            </label>
            <select className={selectStyle}>
              <option>Select Country</option>
            </select>
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className={labelStyle}>
              Nationality <span className="text-red-800">*</span>
            </label>
            <select className={selectStyle}>
              <option>Select Nationality</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>
              City<span className="text-red-800">*</span>
            </label>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              className={inputStyle}
            />
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
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>
              Mobile Phone<span className="text-red-800">*</span>
            </label>
            <input
              type="type"
              placeholder="Mobile Phone"
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelStyle}>
              Address<span className="text-red-800">*</span>
            </label>
            <textarea rows={5} placeholder="Address" className={inputStyle} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className={buttonStyle} />
      </Modal.Footer>
    </Modal>
  );
};
export default CareerInfo;
