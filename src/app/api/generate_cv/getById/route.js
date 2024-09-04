import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { GetGeneratedCvLists } from "@/modules/services/generated_cv";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  const getData = await GetGeneratedCvLists(
    `?$filter=SeekerId eq ${session?.user?.Id}`
  );

  if (getData.error) {
    return errorResponse();
  }

  return NextResponse.json(getData?.value);
}
