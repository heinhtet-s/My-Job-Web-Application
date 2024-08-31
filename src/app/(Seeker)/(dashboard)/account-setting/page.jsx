"use client";
import { inputStyle, labelStyle } from "@/components/ui/form";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { cn } from "@/lib/utils";
import {
  ResetPasswordEmployer,
  ResetPasswordSeeker,
} from "@/modules/services/auth";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data: session } = useSession();
  const resetPasswordhandler = async () => {
    try {
      await ResetPasswordSeeker(session?.user?.email || "");
      toast.success("Password reset link sent to your email.");
    } catch (e) {
      console.log(e);
      toast.error("Somethings worng please try again");
    }
  };
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Account Setting</h1>
      <p className="opacity-60 mb-[40px]">
        Verify your email address and manage your password{" "}
      </p>
      <div className="mt-5">
        <label className={labelStyle}>Email</label>
        <input
          className={cn(inputStyle, "max-w-[400px]")}
          disabled
          value={session?.user?.email || ""}
        />
      </div>
      <div className="mt-5">
        <PrimaryBtn
          text={"Change Password"}
          handleClick={resetPasswordhandler}
        />
      </div>
    </div>
  );
};

export default page;
