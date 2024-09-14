"use client";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { cn } from "@/lib/utils";
import { Button, Modal } from "flowbite-react";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import AboutMeComponent from "./AboutMe";
import Experiences from "./Experiences";
import Education from "./Education";
import LanguageSkill from "./LanguageSkill";
import CareerInfo from "./CareerInfo";
import axios from "axios";
import { useSession } from "next-auth/react";

const menuItem = [
  "About Me",
  "Personal Info",
  "Experience",
  "Education",
  "Language & Skills",
];

const page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [masterData, setMasterData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [infoData, setInfoData] = useState({});
  const { data: session } = useSession();
  const fetchMasterData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const masterData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/master/get?include=country,city,state,degreeLevels,degreeTypes`
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
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/seekers/getSeekerById?id=${session?.user?.Id}`
      );
      setInfoData(personalData.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchInfoData();
    fetchMasterData();
  }, [session]);
  return (
    <>
      <div>
        <h1 className="text-[38px] font-[700]">Edit Profile</h1>
        <p className="opacity-60 mb-[40px]">
          Edit and update your profile to attract your potential employers.
        </p>

        <div className="text-sm font-medium mb-[30px] border-b-0 text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
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
          <div className="mt-[30px] text-start">
            {activeIndex === 0 && (
              <AboutMeComponent
                fetchInfoData={fetchInfoData}
                personalData={infoData}
                masterData={masterData}
              />
            )}
            {activeIndex === 1 && (
              <CareerInfo
                fetchInfoData={fetchInfoData}
                personalData={infoData}
                masterData={masterData}
              />
            )}

            {activeIndex === 2 && <Experiences masterData={masterData} />}

            {activeIndex === 3 && <Education masterData={masterData} />}
            {activeIndex === 4 && <LanguageSkill />}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
