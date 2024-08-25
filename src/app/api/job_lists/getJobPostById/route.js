

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const jobPostId = searchParams.get("id");

  // console.log(`https://myjobs.dev/employer/v1/JobPosts/${companyId}`);
  try {
    const jobPostResponse = await fetch(
      `https://myjobs.dev/employer/v1/JobPosts/${jobPostId}`,
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
      const industryResponse = await fetch(`https://myjobs.dev/employer/v1/Industries/${jobPostData.IndustryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (industryResponse.ok) {
        Industry = await industryResponse.json();
      }
    }

    // Add industry details to employer data
    const extendedData = {
      ...jobPostData,
      Industry,
    };


    return NextResponse.json(extendedData);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
