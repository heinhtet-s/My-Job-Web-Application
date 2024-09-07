"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LoginIcon } from "@/asset/Icon";
import Footer from "../Footer";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
const SeekerLayout = ({ children }) => {
  return (
    <div className="mt-[74px]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [infoData, setInfoData] = useState({});
  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }

    try {
      if (session?.user?.role !== "employeer") {
        const personalData = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/seekers/getSeekerById?id=${session?.user?.Id}`
        );
        setInfoData(personalData.data);
      } else {
        const personalData = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/employer_lists/getById?id=${session?.user?.Id}`
        );
        setInfoData(personalData.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    console.log("GGG");
    if (session?.user?.Id) fetchInfoData();
  }, [session]);
  const Logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <nav className="bg-primary fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-screen-xl fix flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.myjobs.com.mm/home_page_theme/images/logo.svg"
            className="w-[137px]"
            alt="My Job Logo"
          />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0   ">
            <li>
              <Link href="/" className={headerStyle} aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className={headerStyle}>
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/companies" className={headerStyle}>
                Companies
              </Link>
            </li>
            <li>
              <Link href="/job-seekers" className={headerStyle}>
                Candidates
              </Link>
            </li>
            <li>
              <Link href="" className={headerStyle}>
                Career Path
              </Link>
            </li>
          </ul>
        </div>
        {status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="   ring-0 outline-none  p-0 bg-transparent hover:bg-transparent border-none focus:ring-0  "
                variant="outline"
                style={{
                  outline: "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      infoData?.ImageUrl
                        ? infoData?.ImageUrl
                        : "/image/no-image.png"
                    }
                    className="w-[35px] h-[35px] rounded-[35px]"
                  />
                  <p className="text-white cursor-pointer">
                    {infoData?.FirstName
                      ? infoData.FirstName + "  " + infoData?.LastName
                      : infoData.email || infoData.Email}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-[200px] p-[20px] shadow-none rounded-xl">
              <DropdownMenuItem
                onClick={() => {
                  if (session?.user?.role === "employeer") {
                    router.push("/employer/home");
                  } else {
                    router.push("/home");
                  }
                }}
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>Public Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  className="bg-[#f69322] w-full border-none text-white text-[18px] font-medium px-5 py-2.5 transition duration-300 ease-in-out hover:bg-[#f69322] outline-none focus:none  focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus:ring-0 hover:border-none focus:border-none"
                  // style={{
                  //   outline: "none !important",
                  // }}

                  onClick={Logout}
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center">
            <SeekerLoginBtn />
            <Divider />
            <EmployerLoginBtn />
          </div>
        )}
      </div>
    </nav>
  );
};
const Divider = () => {
  return (
    <div className="  mx-[16px]  ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="40"
        viewBox="0 0 2 40"
        fill="none"
      >
        <path d="M1 0V40" stroke="white"></path>
      </svg>
    </div>
  );
};
const SeekerLoginBtn = () => {
  const router = useRouter();
  return (
    <Button
      className="
  text-primary
  bg-white
  hover:bg-slate-200
  font-[300]
text-[16px]
  flex items-center
  gap-[8px]
  "
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
      <LoginIcon />
    </Button>
  );
};
const EmployerLoginBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/employer/login");
      }}
      className="
    text-white
    text-[16px]
    bg-secondary
    font-[300]
    flex items-center
    gap-[8px]
    "
    >
      Employee Login
      <img
        alt="icon"
        width="24px"
        src="https://www.myjobs.com.mm/home_page_theme/images/employer%20login.svg"
      />
    </Button>
  );
};
const headerStyle =
  "block py-2 px-3 text-white font-[300]   md:hover:bg-transparent  border-b-2 border-transparent transition-all hover:border-white";
export default SeekerLayout;
