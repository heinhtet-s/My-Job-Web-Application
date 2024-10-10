"use client";
import { updateJobPostCount } from "@/modules/services/jobPost_service";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { getCurrentDate } from "./globalFunctions";

const useAddViewCount = () => {
  const asPath = usePathname();
  const router = useRouter();
  const handleAddJobCount = (id, ViewCount) => {
    updateJobPostCount(id, {
      ViewCount: ViewCount + 1,
    })
      .then((el) => {
        router.push(`/jobs/${id}`);
      })
      .catch(() => {
        router.push(`/jobs/${id}`);
      });
  };
  return {
    handleAddJobCount,
  };
};

export default useAddViewCount;
