"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserRoundPlus, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import DynamicButton from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInWithCustomToken,
} from "firebase/auth";
import { app } from "../../../../../firebaseConfig";
import axios from "axios";
import { GetLinkedInInfo } from "@/modules/services/auth";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleApiSubmit = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86mahzgm15lxm7&redirect_uri=http://localhost:3000//login&scope=email openid profile`;
    window.location.href = authUrl;
  };
  const firebaseAuth = getAuth(app);
  const firebaseLinkinedAuth = async (search) => {
    try {
      const data = await GetLinkedInInfo(search);
    } catch (e) {
      console.log(e);
    }
  };
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  useEffect(() => {
    if (search?.length > 0) {
      firebaseLinkinedAuth(search);
    }
  }, [search]);
  const router = useRouter();
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");
  const handleGoogleSignUp = async (e) => {
    e.preventDefault();

    // Instantiate a GoogleAuthProvider object
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with a pop-up window
      const result = await signInWithPopup(auth, provider);

      // Pull signed-in user credential.
      const user = result.user;

      const res = await signIn("credentials", {
        credentials: JSON.stringify({
          isSso: true,
          token: user.accessToken,
          email: user.email,
          role: "seeker",
        }),
        redirect: false,
        callbackUrl: "/login",
      });
      if (res?.error) {
        throw res?.error;
      }
      toast.success("Successfully  Login");
      router.push("/");
    } catch (err) {
      // Handle errors here.
      const errorMessage = err.message;
      const errorCode = err.code;

      // setError(true);

      switch (errorCode) {
        case "auth/operation-not-allowed":
          setGoogleErrorMessage("Email/password accounts are not enabled.");
          break;
        case "auth/operation-not-supported-in-this-environment":
          setGoogleErrorMessage(
            "HTTP protocol is not supported. Please use HTTPS."
          );
          break;
        case "auth/popup-blocked":
          setGoogleErrorMessage(
            "Popup has been blocked by the browser. Please allow popups for this website."
          );
          break;
        case "auth/popup-closed-by-user":
          setGoogleErrorMessage(
            "Popup has been closed by the user before finalizing the operation. Please try again."
          );
          break;
        default:
          setGoogleErrorMessage(errorMessage);
          break;
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      setError("");
      const res = await signIn("credentials", {
        credentials: JSON.stringify({
          ...data,
          role: "seeker",
        }),
        redirect: false,
        callbackUrl: "/login",
      });
      if (res?.error) {
        throw res?.error;
      }
      toast.success("Successfully  Login");
      router.push("/");
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };
  return (
    <div className="w-full h-screen flex items-start">
      <div className="hidden lg:flex lg:w-1/2 relative h-full flex-col">
        <div className="absolute top-[40%] left-[20%] flex flex-col text-center">
          <h1 className="text-[32px] font-bold mb-4 text-[#111111]">
            Welcome Back Job Seekerddd
          </h1>

          <p className="text-[20px] font-[500] text-[#666]">
            Start Your Journey With
          </p>
          <span className="text-[20px]  font-[500] text-[#666] ">
            My Jobs Myanmar!
          </span>
        </div>
        <img src="./bg.jpg" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center h-full p-8 ">
        <div>
          <img
            src="https://myjobs.com.mm/auth_page_theme/images/logo.svg"
            className="w-[109px]"
          />
        </div>
        <div className="mt-8 flex">
          <Link href="/login">
            <Button
              className={`flex items-center relative left-[0.7rem] px-4 py-2   rounded-lg z-100  bg-[#F47920] z-20 hover:bg-[#F47920] `}
            >
              <span
                className={`mr-2 ${
                  pathName === "/login" ? "text-[#ffffff]" : ""
                }`}
              >
                Login
              </span>
              <LogIn color="#ffff" />
            </Button>
          </Link>
          <Link href="/register">
            <Button className=" rounded-lg bg-[#f2f2f2] pl-[20px]  hover:bg-[#f2f2f2]">
              <span className="mr-4 text-[#666666]">Register</span>
              <UserRoundPlus className="text-[#666666]" />
            </Button>
          </Link>
        </div>
        <div className="shadow-xl mt-8 p-12 text-center  rounded-xl">
          <p className="mb-4 text-[13px] text-gray-600">
            Are you an employer? &nbsp; &nbsp;
            <a href="#" className="text-blue-900 text-[13px] font-[500] ">
              {" "}
              Go to Employer Register
            </a>
          </p>
          <h2 className="font-[600] mb-4 text-2xl">
            Log in To Your Personal Profile
          </h2>
          <p className="text-red-500 text-start my-4 text-xs">{error}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full border rounded-lg p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-start text-xs italic">
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
                <p className="text-red-500 text-start text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F47920] text-white py-2 rounded "
            >
              Login
            </Button>
            <div>
              <p className="text-gray-500 text-[14px] ">
                {" "}
                Don't you have an account?{" "}
                <Link href="/login" className="text-[#F47920] font-bold">
                  Register
                </Link>
              </p>
            </div>
            <div className="flex items-center my-4">
              <hr className="w-full border-gray-300" />
              <span className="mx-4 text-gray-400">or</span>
              <hr className="w-full border-gray-300" />
            </div>
            <p className="text-center text-gray-500 mb-4">Continue with</p>
          </form>
          <div className="flex space-x-4 justify-center mt-4">
            <Button
              onClick={handleGoogleSignUp}
              className="flex items-center w-1/2  bg-white border border-gray-300 rounded-lg max-w-xs  py-7 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none "
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span> Google</span>
            </Button>

            <Button
              onClick={handleApiSubmit}
              className="flex items-center w-1/2 bg-white border border-gray-300 rounded-lg max-w-xs  py-7 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none "
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 -2 44 44"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-702.000000, -265.000000)"
                    fill="#007EBB"
                  >
                    <path
                      d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z"
                      id="LinkedIn"
                    ></path>
                  </g>
                </g>
              </svg>
              <span>LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
