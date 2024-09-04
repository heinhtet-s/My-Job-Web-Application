import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { deleteExp } from "../../../../../modules/services/seeker_exp_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { id } = await request.json();
  const createData = await deleteExp(id);
  if (createData.error) {
    return errorResponse();
  }
  return successResponse();
}
