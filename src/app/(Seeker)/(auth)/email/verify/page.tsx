"use client";
import { EmailVerifySeeker } from "@/modules/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("token");
  const router = useRouter();
  const hasVerified = useRef(false);
  const verifyToken = async () => {
    try {
      await EmailVerifySeeker(search);
      toast.success("Successfully verified email");
      router.push("/login");
    } catch (e) {
      toast.success("Successfully verified email");
      router.push("/login");
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

export default VerifyPage;
