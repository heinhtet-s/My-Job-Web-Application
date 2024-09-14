import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { getEdu } from "../../../../../modules/services/seeker_edu_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCareefInfo } from "../../../../../modules/services/seeker_careerInfo";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const seekerId = searchParams.get("id");
  const session = await getServerSession(authOptions);
  const getData = await getCareefInfo(
    `?$filter=SeekerId eq ${seekerId ? seekerId : session?.user?.Id}`
  );

  if (getData.error) {
    return errorResponse();
  }

  return NextResponse.json(getData?.value);
}
