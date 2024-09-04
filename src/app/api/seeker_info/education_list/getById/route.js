import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { getEdu } from "../../../../../modules/services/seeker_edu_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  const getData = await getEdu(`?$filter=SeekerId eq ${session?.user?.Id}`);

  if (getData.error) {
    return errorResponse();
  }

  return NextResponse.json(getData?.value);
}
