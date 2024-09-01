import axios from "axios";
import React from "react";
import JobDetailComponent from "./body";

export default async function page({ params, searchParams }) {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/job_lists/getJobPostById?id=${params.Id}`
    );
 
    return <JobDetailComponent data={data?.data} />;
  } catch (e) {
    // console.log(e.response);
    return <JobDetailComponent data={{}} />;
  }
}
