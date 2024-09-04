import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";
export async function GET(request) {
  const query = await getQuery(request);

  // Pagingation
  const getData = await apiGetData(query, EmployersConst);
  if (getData.error) {
    return errorResponse();
  }
  return NextResponse.json(getData);
}
