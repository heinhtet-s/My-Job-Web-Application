import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { GetEmployersList } from "../../../../modules/services/employer_service";
export async function GET(request) {
  const session = await getServerSession(authOptions);

  const getData = await GetEmployersList(`/${session?.user?.Id}`);
  if (getData.error) {
    return errorResponse();
  }
  return NextResponse.json(getData);
}
