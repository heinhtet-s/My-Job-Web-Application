"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserRoundPlus, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import DynamicButton from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { EmployeerRegister } from "@/modules/services/auth";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
const RegisterComponent = ({ data }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const pathName = usePathname();
  const notify = () => toast.success("Successfully Registe Please Login");
  const router = useRouter();
  const onSubmit = async (data) => {

    try {
      await EmployeerRegister({
        industryId: data?.industryId,
        companyName: data?.companyName,
        contactPersonName: data?.contactPersonName,
        mapAddress: data?.mapAddress,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
      });
      notify();
      router.push("/employer/login");
    } catch (e) {
      
    }
  };

  const [activeButton, setActiveButton] = useState("register");
  return (
    <div className="relaive">
      <div class="absolute right-0 w-full flex justify-end transition-all duration-300 ease-in-out">
        <div
          class="fixed inset-0 h-screen w-1/2 flex flex-col pt-[45px] pr-8 pl-8 gap-7 justify-start"
          style={{ background: "var(--surface-brand-04, #DCEEFF)" }}
        >
          <div className="flex flex-col text-center">
            <h1 className="text-[32px] font-[500] mb-4 text-secondary">
              Welcome to Myjobs.com.mm{" "}
            </h1>

            <p className="text-[20px] font-[400] text-[#666]">
              Start Your Recruitment Journey With
            </p>
            <span className="text-[20px]  font-[400] text-[#666] ">
              Myjobs Myanmar!
            </span>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center h-full p-8 ">
          <div>
            <img
              src="https://myjobs.com.mm/auth_page_theme/images/logo.svg"
              className="w-[109px]"
            />
          </div>
          <div className="mt-8 flex">
            <Link href="/employer/login">
              <Button className=" rounded-lg  pr-[25px]  bg-[#f2f2f2]  hover:bg-[#f2f2f2]">
                <span className="mr-2 text-[#666666]">Login</span>
                <LogIn className="text-[#666666]" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                className={`flex items-center px-4 py-2 rounded-lg z-100 relative left-[-0.7rem]  z-100  bg-secondary z-20 hover:bg-secondaryHover `}
              >
                <span className={`mr-2 text-[#ffffff]`}>Register</span>
                <UserRoundPlus color="#fff" />
              </Button>
            </Link>
          </div>
          <div className="shadow-xl mt-8 p-12 text-center  rounded-xl">
            <p className="mb-4 text-[13px] text-gray-600">
              Are you a Jobseeker? &nbsp; &nbsp;
              <a href="#" className="text-blue-900 text-[13px] font-[500] ">
                {" "}
                Go to Jobseeker Register
              </a>
            </p>
            <h2 className=" mb-4 text-2xl font-[500]">
              Tell Your Story to Create an Employer Profile
            </h2>
            <p className="font-[400px] w-full text-start mb-3">
              {" "}
              Business Details
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  ">
              <div>
                <select
                  {...register("industryId", {
                    required: "Industry Name is required",
                  })}
                  id="countries"
                  class=" border  outline-none bg-white text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                >
                  <option selected value={null}>
                    Select Industry
                  </option>
                  {data.map((el) => {
                    return <option value={el?.Id}>{el?.Title}</option>;
                  })}
                </select>
                {errors.industryId && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.industryId.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="firstName"
                  placeholder="Company Name"
                  {...register("companyName", {
                    required: "Company Name is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="contract_person"
                  placeholder="Contract Person"
                  {...register("contactPersonName", {
                    required: "Contract Person Name is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.contactPersonName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="company_addr"
                  placeholder="Company Address"
                  {...register("mapAddress", {
                    required: "Company Address is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.mapAddress && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.mapAddress.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="phone"
                  type="number"
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    required: "Phone is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="mt-1 w-full border rounded-lg p-2 apperance-none"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs italic text-start">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="text-start flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={watch("terms")}
                  {...register("terms", { required: true })}
                />
                <label
                  htmlFor="terms"
                  onClick={() => {
                    setValue("terms", !watch("terms"));
                  }}
                  className="text-[#F47920] flex gap-3 font-[500] text-[12px]"
                >
                  <p className="text-start text-[12px] text-muteColor">
                    By Clicking, I agree to Myjob's Myanmar
                  </p>
                  Terms and Conditions
                </label>
                {errors.terms && (
                  <span>You must agree to the terms and conditions</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={!watch("terms")}
                className="w-full bg-[#F47920] hover:bg-widgetHoverColor text-white py-2 rounded "
              >
                Register Now
              </Button>
              <div>
                <p className="text-gray-500">
                  {" "}
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#F47920] font-bold">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
