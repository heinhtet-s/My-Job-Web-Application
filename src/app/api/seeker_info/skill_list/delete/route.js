import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { deleteSkill } from "../../../../../modules/services/seeker_skill_service";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { Id } = await request.json();
  const createData = await deleteSkill(Id);
  if (createData.error) {
    return errorResponse();
  }
  return successResponse();
}
