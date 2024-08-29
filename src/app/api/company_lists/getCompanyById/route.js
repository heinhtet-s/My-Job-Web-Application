

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("id");


  try {
    const companyResponse = await fetch(
      `https://myjobs.dev/employer/v1/Employers/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!companyResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Error: ${companyResponse.status}` }),
        { status: companyResponse.status }
      );
    }

    const companyData = await companyResponse.json();
   
   
    let Industry = null;
    if (companyData.IndustryId) {
      const industryResponse = await fetch(`https://myjobs.dev/employer/v1/Industries/${companyData.IndustryId}`, {
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
      ...companyData,
      Industry,
    };


    return NextResponse.json(extendedData);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
