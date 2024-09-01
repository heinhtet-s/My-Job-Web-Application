import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { deleteLan } from "../../../../../modules/services/seeker_lan_service";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { Id } = await request.json();
  const createData = await deleteLan(Id);
  if (createData.error) {
    return errorResponse();
  }
  return successResponse();
}
