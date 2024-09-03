import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams, params } = new URL(req.url);
  const jobPostId = searchParams.get("id");
  try {
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
 
    // Add industry details to employer data
    const extendedData = {
      ...jobPostData,
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
  } catch (err) {
 
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
