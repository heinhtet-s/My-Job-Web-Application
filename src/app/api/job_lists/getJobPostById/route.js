import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams, params } = new URL(req.url);
  const jobPostId = searchParams.get("id");
  const seeker_id = searchParams.get("seeker_id");
  try {
    const session = await getServerSession(authOptions);
    const jobPostResponse = await fetch(
      `https://myjobs.dev/employer/v1/JobPosts/${jobPostId}?$expand=Employer,FunctionalArea`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!jobPostResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Error: ${jobPostResponse.status}` }),
        { status: jobPostResponse.status }
      );
    }

    const jobPostData = await jobPostResponse.json();

    let Industry = null;
    if (jobPostData.IndustryId) {
      const industryResponse = await fetch(
        `https://myjobs.dev/employer/v1/Industries`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (industryResponse.ok) {
        Industry = await industryResponse.json();
      }
    }

    const applyJobPostResponse = await axios.get(
      encodeURI(
        `https://myjobs.dev/seeker/v1/AppliedJobPosts?$filter=SeekerId eq ${seeker_id} and JobId eq ${jobPostId}`
      )
    );
    const extendedData = {
      ...jobPostData,
      ApplyedJob: applyJobPostResponse?.data?.value?.length > 0 ? true : false,
      Employer: {
        ...jobPostData.Employer,
        Industry: Industry?.value?.filter(
          (el) => el?.Id === jobPostData.Employer.IndustryId
        )?.[0],
      },
      Industry: Industry?.value?.filter(
        (el) => el?.Id === jobPostData?.IndustryId
      )?.[0],
    };

    return NextResponse.json(extendedData);
    // Add industry details to employer data
  } catch (err) {
    console.log(err, "error");
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
