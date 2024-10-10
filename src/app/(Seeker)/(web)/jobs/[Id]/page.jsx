import axios from "axios";
import React from "react";
import JobDetailComponent from "./body.jsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function page({ params, searchParams }) {
  const session = await getServerSession(authOptions);

  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/job_lists/getJobPostById?id=${params.Id}&seeker_id=${session?.user?.Id}`
    );

    return <JobDetailComponent data={data?.data} />;
} catch (e) {
    console.log(e);
    return <JobDetailComponent data={{}} />;
  }
}
