import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { getExp } from "../../../../../modules/services/seeker_exp_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  const getData = await getExp(`?$filter=SeekerId eq ${session?.user?.Id}`);
  if (getData.error) {
    return errorResponse();
  }

  return NextResponse.json(getData);
}
