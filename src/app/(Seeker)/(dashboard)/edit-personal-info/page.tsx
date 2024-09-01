"use client";
import { inputStyle, labelStyle, selectStyle } from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { cn } from "@/lib/utils";
import { Modal } from "flowbite-react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
const menuItem = [
  "Personal Info",
  "Career Info",
  "Experience",
  "Education",
  "Language & Skills",
];

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
const page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="rounded-[30px]">
          <h3 className="text-[1.5rem] font-[600] my-[30px]">
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
              <label className={labelStyle}>
                Father's Name <span className="text-red-800">*</span>
              </label>
              <input className={inputStyle} />
            </div>
            <div className="col-span-1">
              {" "}
              <label className={labelStyle}>
                Gender<span className="text-red-800">*</span>
              </label>
              <select className={selectStyle}>
                <option>Male</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
      <div>
        <h1 className="text-[38px] font-[700]">Edit Profile</h1>
        <p className="opacity-60 mb-[40px]">
          Edit and update your profile to attract your potential employers.
        </p>

        <div className="text-sm font-medium mb-[30px] text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px justify-between">
            {menuItem?.map((el, index) => {
              return (
                <li
                  className="me-2 cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  <p
                    className={cn(
                      "inline-block text-[20px] p-4 font-[400] opacity-50 border-b-2 border-transparent rounded-t-lg ",
                      activeIndex === index &&
                        "text-primary opacity-100 border-primary"
                    )}
                  >
                    {el}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid grid-rows-1 grid-cols-12 gap-4 mb-[40px] ">
          <div className="col-span-4">
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
              steady source of motivation that drives me to do my best. In my
              last job, this passion led me to challenge myself daily and learn
              new skills that helped me to do better work.
            </p>
          </div>
          <div className="col-span-2  grid-rows-1 flex justify-center">
            <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
              <EditIcon />
              Edit
            </button>
          </div>
        </div>
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
        </div>
        <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
          <div className="col-span-4  grid-rows-1">
            <p className="mb-[10px] text-[20px]">Work Experiences </p>
            <p className="text-primary text-[16px]">
              Describe your previous and current working experiences
            </p>
          </div>
          <div className="col-span-8  grid-rows-1">
            <div className="flex justify-end mb-8">
              <button className="flex  h-fit items-center gap-[2px] text-primary font-[500] ">
                <Plus color="#F08000" /> Add Experience
              </button>
            </div>
            <div className="flex border-b-2  pb-3 gap-2 justify-between border-gray-100">
              <p className="text-primary  ">Senior UI/UX Designer</p>
              <p className="font-[300] opacity-60 ">Myanmar Tech</p>
              <p className="font-[300] opacity-60 ">Yangon</p>
              <p className="text-primary ">2010 - 2011</p>
              <div className="flex items-center gap-2 cursor-pointer">
                <div>
                  <EditTableIcon />
                </div>
                <div>
                  <DeleteTableIcon />
                </div>
              </div>
            </div>
            <p className="font-[300] opacity-60 mt-[5px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
          <div className="col-span-4  grid-rows-1">
            <p className="mb-[10px] text-[20px]">Education </p>
            <p className="text-primary text-[16px]">
              Describe your education background
            </p>
          </div>
          <div className="col-span-8  grid-rows-1">
            <div className="flex justify-end mb-8">
              <button className="flex  h-fit items-center gap-[2px] text-primary font-[500] ">
                <Plus color="#F08000" /> Add Education
              </button>
            </div>
            <div className="flex border-b-2  pb-3 gap-2 justify-between border-gray-100">
              <p className="text-primary  h-fit  ">
                Build Responsive Real World
              </p>
              <p className="font-[300] opacity-60 h-fit  ">
                Udacity Nanodegree
              </p>
              <p className="text-primary min-w-[80px] h-fit ">2020 - 2020</p>
              <div className="flex items-center gap-2 h-fit cursor-pointer">
                <div>
                  <EditTableIcon />
                </div>
                <div>
                  <DeleteTableIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
          <div className="col-span-4  grid-rows-1">
            <p className="mb-[10px] text-[20px]">Languages </p>
          </div>
          <div className="col-span-5 grid-rows-1    ">
            <div className="bg-[#E6F0F9] flex  px-[4px] rounded-[30px] py-[5px]">
              <p className="flex-1 text-center">Chinese</p>
              <p className="flex-1 text-center">Intermediate</p>
              <p className="flex-1 text-center">
                <span>Edit </span>|<span> Delete</span>
              </p>
            </div>
          </div>
          <div className="col-span-3  grid-rows-1 flex justify-center">
            <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
              <Plus color="#F08000" />
              Add Language
            </button>
          </div>
        </div>
        <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
          <div className="col-span-4  grid-rows-1">
            <p className="mb-[10px] text-[20px]">Skills </p>
          </div>
          <div className="col-span-5 grid-rows-1   ">
            <div className="bg-[#E6F0F9]  px-[4px]  my-3 flex  rounded-[30px] py-[5px]">
              <p className="flex-1 text-center">Management</p>
              <p className="flex-1 text-center">1 Year</p>
              <p className="flex-1 text-center">
                <span>Edit </span>|<span> Delete</span>
              </p>
            </div>
          </div>
          <div className="col-span-3  grid-rows-1 flex justify-center">
            <button className="flex h-fit items-center gap-[2px] text-primary font-[500] ">
              <Plus color="#F08000" />
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const EditIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.8775 17.7258C19.4965 17.7258 20 18.2359 20 18.8629C20 19.4912 19.4965 20 18.8775 20H12.533C11.914 20 11.4105 19.4912 11.4105 18.8629C11.4105 18.2359 11.914 17.7258 12.533 17.7258H18.8775ZM14.4776 0.776737L16.1165 2.07865C16.7886 2.60419 17.2366 3.29695 17.3899 4.02554C17.5668 4.827 17.3781 5.61412 16.8475 6.29493L7.08489 18.9199C6.63684 19.4932 5.97657 19.8157 5.26913 19.8276L1.37822 19.8754C1.16599 19.8754 0.989126 19.7321 0.941963 19.529L0.0576649 15.695C-0.0956134 14.9903 0.0576649 14.2617 0.505709 13.7003L7.42682 4.74219C7.54472 4.59886 7.75695 4.57617 7.89844 4.68247L10.8107 6.99964C10.9994 7.15491 11.2588 7.23852 11.53 7.20269C12.1077 7.13102 12.4968 6.60548 12.4378 6.0441C12.4025 5.75745 12.261 5.51856 12.0723 5.3394C12.0134 5.29162 9.24257 3.07001 9.24257 3.07001C9.06571 2.92668 9.03034 2.66391 9.17183 2.48594L10.2684 1.0634C11.2824 -0.238515 13.051 -0.357956 14.4776 0.776737Z"
        fill="#F08000"
      />
    </svg>
  );
};

const EditTableIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.7064 0.179904C16.1328 0.0941324 17.5394 0.57064 18.5992 1.50459C19.57 2.52432 20.0652 3.8776 19.986 5.25947V14.1606C20.0751 15.5425 19.57 16.8958 18.6091 17.9155C17.5493 18.8495 16.1328 19.326 14.7064 19.2402H5.45484C4.01856 19.326 2.612 18.8495 1.55213 17.9155C0.581406 16.8958 0.086139 15.5425 0.175287 14.1606V5.25947C0.086139 3.8776 0.581406 2.52432 1.55213 1.50459C2.612 0.57064 4.01856 0.0941324 5.45484 0.179904H14.7064ZM14.4489 4.53518C13.8348 3.94431 12.8442 3.94431 12.2301 4.53518L11.5664 5.18323C11.4674 5.27853 11.4674 5.44055 11.5664 5.53585C11.5664 5.53585 11.5859 5.55444 11.6205 5.58754L11.8641 5.82067C12.0051 5.95559 12.181 6.12407 12.3576 6.29349L12.9566 6.86952C13.0816 6.99031 13.1645 7.07126 13.1711 7.07973C13.2801 7.19409 13.3494 7.34658 13.3494 7.51812C13.3494 7.8612 13.0621 8.14711 12.6956 8.14711C12.5273 8.14711 12.3688 8.0804 12.2598 7.97556L10.6056 6.39356C10.5264 6.31732 10.3877 6.31732 10.3085 6.39356L5.58361 10.9394C5.25673 11.2539 5.06853 11.6733 5.05862 12.1212L4.99919 14.3798C4.99919 14.5037 5.03881 14.6181 5.12796 14.7038C5.21711 14.7896 5.33597 14.8373 5.46474 14.8373H7.7925C8.26795 14.8373 8.7236 14.6562 9.07029 14.3322L15.7366 7.89932C16.3408 7.30845 16.3408 6.35544 15.7366 5.7741L14.4489 4.53518Z"
        fill="black"
      />
    </svg>
  );
};
const DeleteTableIcon = () => {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0926 6.55911C15.2771 6.55911 15.4445 6.64211 15.5768 6.78235C15.7001 6.93213 15.7622 7.11815 15.7442 7.31468C15.7442 7.37955 15.251 13.8094 14.9693 16.5159C14.7929 18.1768 13.7542 19.1852 12.1962 19.2129C10.9983 19.2405 9.8273 19.2501 8.67434 19.2501C7.45028 19.2501 6.25321 19.2405 5.09125 19.2129C3.58548 19.1756 2.54592 18.1492 2.37851 16.5159C2.0887 13.7999 1.60447 7.37955 1.59547 7.31468C1.58647 7.11815 1.64767 6.93213 1.77188 6.78235C1.89429 6.64211 2.0707 6.55911 2.25611 6.55911H15.0926ZM10.5816 0.170044C11.3998 0.170044 12.1306 0.758657 12.3421 1.59817L12.4933 2.29458C12.6157 2.86221 13.0928 3.26384 13.6418 3.26384H16.3401C16.7001 3.26384 16.9999 3.57198 16.9999 3.96407V4.32658C16.9999 4.70913 16.7001 5.02681 16.3401 5.02681H1.00243C0.641512 5.02681 0.341797 4.70913 0.341797 4.32658V3.96407C0.341797 3.57198 0.641512 3.26384 1.00243 3.26384H3.70077C4.2489 3.26384 4.72592 2.86221 4.84923 2.29554L4.99054 1.64491C5.21015 0.758657 5.93289 0.170044 6.76003 0.170044H10.5816Z"
        fill="black"
      />
    </svg>
  );
};

export default page;
