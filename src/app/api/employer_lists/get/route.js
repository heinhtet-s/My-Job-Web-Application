import { apiGetData } from "@/lib/apiQueryHandler";
import { errorResponse, getQuery } from "@/lib/globalFunctions";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = await getQuery(request);

    // Pagingation
    const getData = await apiGetData(query, EmployersConst);
    if (getData.error) {
      return errorResponse("Failed");
    }
    return NextResponse.json(getData);
  } catch (error) {
    return errorResponse("An error occurred while fetching the data");
  }
}
