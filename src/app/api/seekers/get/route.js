import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { SeekersConst } from "@/lib/queryConst";
export async function GET(request) {
  try {
    const query = await getQuery(request);

    // Pagingation
    const getData = await apiGetData(query, SeekersConst);
    if (getData.error) {
      return errorResponse("something wrong");
    }
    return NextResponse.json(getData);
  } catch (error) {
    return errorResponse("An error occurred while fetching the data");
  }
}
