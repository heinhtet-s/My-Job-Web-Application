"use client";
import { EmailVerifyEmployer } from "@/modules/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const page = () => {
  const searchParams = useSearchParams();
  const search = decodeURI(searchParams.get("token") || "");
  const router = useRouter();
  const hasVerified = useRef(false);
  const verifyToken = async () => {
    try {
      await EmailVerifyEmployer(search);
      toast.success("Successfully verified email");
      router.push("/employer/login");
    } catch (e) {
      toast.success("Successfully verified email");
      router.push("/employer/login");
    }
  };
  useEffect(() => {
    if (search && search.length > 0 && !hasVerified.current) {
      hasVerified.current = true; // Prevent re-verification
      verifyToken();
    }
  }, [search, router]);

  return <div></div>;
};

export default page;
