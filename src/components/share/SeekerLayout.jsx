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
    <div className="mt-[72px]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [infoData, setInfoData] = useState({});
  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }

    const headerStyle = "text-white hover:text-gray-300";
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
    if (session?.user?.Id) fetchInfoData();
  }, [session]);
  const Logout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };
  return (
    <nav className="bg-primary fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.myjobs.com.mm/home_page_theme/images/logo.svg"
            className="w-[137px]"
            alt="My Job Logo"
          />
        </a>
        <div className="flex  md:hidden  items-center gap-2">
          {status !== "authenticated" && <SeekerLoginBtn />}

          {/* Hamburger Button for small screens */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-0"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
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
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Main menu for larger screens */}
        <div className="hidden md:block md:w-auto">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link href="/" className="text-white font-[300]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="text-white font-[300]">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/companies" className="text-white font-[300]">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/job-seekers" className="text-white font-[300]">
                Candidates
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white font-[300]">
                Career Path
              </Link>
            </li>
          </ul>
        </div>

        {/* Fullscreen Menu for Mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-primary  flex flex-col justify-center items-center">
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white text-4xl"
              onClick={toggleMenu}
            >
              &times;
            </button>

            <ul className="text-center text-[400] space-y-8 text-white text-xl w-full px-[30px] animate-slide-down">
              <li>
                <Link href="/" className="text-white" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white" onClick={toggleMenu}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-white"
                  onClick={toggleMenu}
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/job-seekers"
                  className="text-white"
                  onClick={toggleMenu}
                >
                  Candidates
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white" onClick={toggleMenu}>
                  Career Path
                </Link>
              </li>
              {status === "authenticated" ? (
                <>
                  <li>
                    <Link
                      href={
                        session?.user?.role === "employeer"
                          ? "/employer/home"
                          : "/home"
                      }
                      className="text-white"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/employer/login");
                      }}
                      className="
    text-white
    text-[16px]
    bg-secondary
    font-[300]
    w-full
    flex items-center
    gap-[8px]
    "
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <Button
                  onClick={() => {
                    router.push("/employer/login");
                  }}
                  className="
                  w-full
                          text-white
                          text-[16px]
                          bg-secondary
                          font-[300]
                          flex items-center
                          gap-[8px]
                          "
                >
                  Employer Login
                </Button>
              )}
            </ul>
          </div>
        )}

        {status === "authenticated" ? (
          <div className="relative hidden md:block ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ring-0 outline-none p-0 bg-transparent hover:bg-transparent border-none">
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
                </button>
              </DropdownMenuTrigger>
              {/* ${
                  isDropdownOpen ? "block" : "hidden"
                } */}
              <DropdownMenuContent
                className={`bg-white w-[200px] p-[20px] shadow-none rounded-xl absolute right-0 mt-2`}
              >
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
                    className="bg-[#f69322] w-full border-none text-white text-[18px] font-medium px-5 py-2.5 transition duration-300 ease-in-out"
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className=" items-center hidden md:flex ">
            <SeekerLoginBtn />
            <Divider />
            <EmployerLoginBtn />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slideDown 0.5s ease forwards;
        }
      `}</style>
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
