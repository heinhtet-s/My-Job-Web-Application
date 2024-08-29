"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserRoundPlus, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import DynamicButton from "@/components/Button";
import { usePathname } from "next/navigation";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pathName = usePathname();
  const onSubmit = (data) => {
   
  };
  const [activeButton, setActiveButton] = useState("register");
  return (
    <div className="w-full h-screen flex items-start">
      <div className="hidden lg:flex lg:w-1/2 relative h-full flex-col">
        <div className="absolute top-[0%] left-[20%] flex flex-col text-center">
          <h1 className="text-4xl font-bold mb-4 ">JobSeeker Registration</h1>

          <p className="text-xl font-medium text-gray-500">
            Explore New Career Opportunities
          </p>
          <span className="text-xl font-medium text-gray-500">On My Jobs</span>
        </div>
        <img src="./bg.jpg" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center h-full p-8 ">
        <div>
          <span>My Job.com</span>
        </div>
        <div className="mt-8 flex">
          <Link href="/login">
            <Button className=" rounded-lg ml-[-8px]  bg-[#f2f2f2]  hover:bg-[#f2f2f2]">
              <span className="mr-2 text-[#666666]">Login</span>
              <LogIn className="text-[#666666]" />
            </Button>
          </Link>
          <Link href="/register">
            <Button
              className={`flex items-center px-4 py-2 rounded-lg z-100  ${
                pathName === "/register" ? "bg-[#F47920]" : ""
              } ${pathName ? "hover:bg-[#F47920]" : ""}`}
            >
              <span
                className={`mr-2 ${
                  pathName === "/login" ? "text-[#ffffff]" : ""
                }`}
              >
                Register
              </span>
              <UserRoundPlus
                className={`mr-4 ${
                  pathName === "/register" ? "text-[#ffffff]" : ""
                }`}
              />
            </Button>
          </Link>
        </div>
        <div className="shadow-xl mt-8 p-12 text-center  rounded-xl">
          <p className="mb-4 text-gray-600">
            Are you an employer?
            <a href="#" className="text-blue-900 font-bold">
              Go to Employer Register
            </a>
          </p>
          <h2 className="font-bold mb-4 text-2xl">Register as a Job Seeker</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="mt-1 w-full border rounded-lg p-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
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
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 w-full border rounded-lg p-2"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
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
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <p className="text-start text-gray-600">
              By Clicking, I agree to Myjob's Myanmar
            </p>
            <div className="text-start">
              <input
                type="checkbox"
                className="mr-2"
                {...register("terms", { required: true })}
              />
              <label
                htmlFor="terms"
                className="text-[#F47920] font-bold text-sm"
              >
                Terms and Conditions
              </label>
              {errors.terms && (
                <span>You must agree to the terms and conditions</span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F47920] text-white py-2 rounded "
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
  );
};

export default Register;
