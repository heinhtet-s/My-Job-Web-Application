"use client";
import SeekerLayout from "@/components/share/SeekerLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrimaryBtn from "@/components/ui/primaryBtn";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  File,
  Heart,
  House,
  Lock,
  Mail,
  Pencil,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckPackage } from "../../../modules/services/package_service";
import toast from "react-hot-toast";
import axios from "axios";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
const DashboardConst = [
  {
    icon: (
      <House
        width="18px"
        className="group-hover:stroke-primary  transition-all duration-500 "
        strokeWidth={1.75}
      />
    ),
    header: "Dashboard",
    link: "/employer/home",
  },
  {
    icon: (
      <Pencil
        width="18px"
        className="group-hover:stroke-primary  transition-all duration-500 "
        strokeWidth={1.75}
      />
    ),
    header: "Manage Profile",
    link: "/employer/profile",
  },

  {
    icon: (
      <File
        className="group-hover:stroke-primary  transition-all duration-500 "
        width="18px"
        strokeWidth={1.75}
      />
    ),
    header: "Manage Jobs",
    link: "/employer/jobpost",
  },
  {
    icon: (
      <File
        className="group-hover:stroke-primary  transition-all duration-500 "
        width="18px"
        strokeWidth={1.75}
      />
    ),
    header: "Manage Applications",
    link: "/employer/candidate",
  },
  {
    icon: (
      <Bell
        className="group-hover:stroke-primary  transition-all duration-500 "
        width="18px"
        strokeWidth={1.75}
      />
    ),
    header: "Job Report",
    link: "/employer/report",
  },
];
export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [infoData, setInfoData] = useState({});
  const router = useRouter();
  const Logout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      if (status === "authenticated" && session?.user?.role !== "employeer") {
        router.push("/");
      }
    }
  }, [status, session]);
  const [chat, setChat] = useState(0);
  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const personalData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/employer_lists/getById`
      );
      console.log(personalData.data);
      setInfoData(personalData.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchInfoData();
  }, [session?.user?.Id]);
  const checkPackageList = async () => {
    try {
      const data = await CheckPackage(session?.user?.Id);
      if (data?.error) {
        throw "error";
      }
      router.push("/employer/jobpost/create");
    } catch (e) {
      toast.error("not enough unit");
      console.log(d);
    }
  };
  useEffect(() => {
    if (session?.user?.Id) {
      const chatCollectionRef = collection(db, "chat");
      const q = query(
        chatCollectionRef,
        where("employerId", "==", session?.user?.Id),
        where("isEmployerRead", "==", false)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatData = [];
        querySnapshot.forEach((doc) => {
          chatData.push({ ...doc.data(), id: doc.id });
        });

        setChat(chatData.length);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [session?.user?.Id]);
  return (
    <div className="bg-widgetBgColor min-h-screen">
      <div className="fixed w-[320px] bg-widgetBgColor top-0 left-0 bottom-0 overflow-y-auto p-7 hidden lg:block">
        <div className="ml-[1.4rem]" onClick={() => router.push("/")}>
          <img className="w-[130px]" src="/image/logo.png" alt="logo" />
        </div>
        <div className="pb-[100px] mt-3 lg:mt-6 justify-between flex-col">
          {DashboardConst?.map((el) => (
            <div
              onClick={() => {
                router.push(el?.link);
              }}
              className="px-4 py-[1rem] cursor-pointer  rounded-[30px] text-widgetColor font-medium flex items-center gap-3 no-underline transition-all duration-500 ease-in-out text-[15px] leading-[18px] hover:text-primary group"
            >
              {el?.icon}
              {el?.header}
            </div>
          ))}
          <div
            onClick={() => {
              router.push("/employer/chat");
            }}
            className="px-4 py-[1rem]  mt-[50px]  cursor-pointer  rounded-[30px] text-widgetColor font-medium flex items-center justify-between "
          >
            <div className="flex items-center gap-3 no-underline transition-all duration-500 ease-in-out text-[15px] leading-[18px] hover:text-primary group">
              <Mail
                className="group-hover:stroke-primary  transition-all duration-500 "
                width="18px"
                strokeWidth={1.75}
              />
              Messages
            </div>
            <span className="inline-block rounded-xl px-2.5 py-1 text-xs font-bold leading-none text-white text-center whitespace-nowrap align-baseline bg-blue-400">
              {chat}
            </span>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-[320px] p-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="   ring-0 outline-none  p-0 bg-transparent hover:bg-transparent border-none !focus:ring-0 border-0 !focus:border-0 focus:ring-white !focus-visible:ring-0 "
                variant="outline"
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  width: "100%",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    width: "100%",
                  }}
                  className="px-[1.4rem] w-full cursor-pointer flex items-center justify-between "
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      style={{
                        flex: "0 0 36px",
                      }}
                      src={infoData?.CompanyLogo || "/image/no-image.png"}
                      className="w-[36px] h-[36px] rounded-full"
                    />
                    <p
                      style={{
                        width: "170px",
                        whiteSpace: "normal",
                        textAlign: "start",
                        wordWrap: "break-word",
                      }}
                    >
                      {infoData?.CompanyName || infoData?.email}
                    </p>
                  </div>
                  <ChevronUp width={"18px"} strokeWidth={1.75} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-[200px] p-[20px] shadow-none rounded-xl">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="ml-[320px] bg-widgetBgColor">
        <div className="p-[30px] ">
          <div className="pxp-user-nav flex items-center justify-end">
            <div className="px-5 py-2 font-medium text-[15px] text-widgetColor no-underline ">
              Home
            </div>
            <div
              onClick={() => {
                router.push("/employer/plans-subscriptions");
              }}
              className="px-5 py-2 font-medium cursor-pointer text-[15px] text-widgetColor no-underline "
            >
              Products{" "}
            </div>
            <div className="px-5 py-2 font-medium text-[15px] text-widgetColor no-underline ">
              Accounts{" "}
            </div>
            <div className="px-5 py-2 font-medium text-[15px] text-widgetColor no-underline ">
              <button
                onClick={checkPackageList}
                className="bg-primary text-white text-[16px] font-[400] transition-[background-color] rounded-full  px-5 py-1.5"
              >
                Post a Job
              </button>
            </div>
            <div className="mx-3">
              <Bell strokeWidth={1.75} width="18px" />
            </div>
            <div className="mx-3">
              <Mail strokeWidth={1.75} width="18px" />
            </div>
            <div className="mx-3 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="   ring-0 outline-none  p-0 bg-transparent hover:bg-transparent border-none focus:ring-0  "
                    variant="outline"
                    style={{
                      outline: "none",
                    }}
                  >
                    <div className=" min-w-[70px] cursor-pointer flex items-center justify-between ">
                      <div
                        className="flex items-center gap-4"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        {infoData?.CompanyName || infoData?.email}
                      </div>
                      <ChevronDown width={"18px"} strokeWidth={1.75} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-[200px] p-[20px] shadow-none rounded-xl">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-[30px] mr-[30px] shadow-[0px_6px_12px_rgba(0,0,0,0.05)] p-[60px] "
          style={{
            minHeight: "calc(100vh - 184px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
