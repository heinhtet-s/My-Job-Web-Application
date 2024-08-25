import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LoginIcon } from "@/asset/Icon";

const SeekerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-[74px]">
      <Nav />
      {
        children
      }
    </div>
  );
};
const Nav = () => {
  return (
    <nav className="bg-primary ">
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
              <Link href="" className={headerStyle} aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className={headerStyle}>
                Jobs
              </Link>
            </li>
            <li>
              <Link href="" className={headerStyle}>
                Companies
              </Link>
            </li>
            <li>
              <Link href="" className={headerStyle}>
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
        <div className="flex items-center">
          <SeekerLoginBtn />
          <Divider />
          <EmployerLoginBtn />
        </div>
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
  return (
    <Button
      className="
  text-primary
  bg-white
  font-[300]
text-[16px]
  flex items-center
  gap-[8px]
  "
    >
      Login
      <LoginIcon />
    </Button>
  );
};
const EmployerLoginBtn = () => {
  return (
    <Button
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
