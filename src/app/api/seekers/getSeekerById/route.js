

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const seekerId = searchParams.get("id");

  try {
    const seekerResponse = await fetch(
      `https://myjobs.dev/seeker/v1/Seekers/${seekerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!seekerResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Error: ${seekerResponse.status}` }),
        { status: seekerResponse.status }
      );
    }

    const seekerData = await seekerResponse.json();
   
  

    return NextResponse.json(seekerData);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
