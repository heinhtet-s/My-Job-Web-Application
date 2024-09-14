import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const filter = searchParams.get("$filter") || "";
  const limit = 100;
  let orderBy = "&$orderby=CreatedAt desc";
  //   https://myjobs.dev/employer/v1/JobPosts?$expand=FunctionalArea&$filter=Active eq true
  try {
    let externalApiUrl =
      "https://myjobs.dev/employer/v1/JobPosts?$expand=FunctionalArea,Employer";
    if (filter) {
      externalApiUrl += `&$filter=${filter}`;
    }
    externalApiUrl += orderBy;

    const response = await axios.get(externalApiUrl);
    console.log(response.data);

    return NextResponse.json({
      jobs: response.data.value,
      totalPages:
        response.data.totalPages || Math.ceil(response.data.total / limit),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from the external API" },
      { status: 500 }
    );
  }
}
