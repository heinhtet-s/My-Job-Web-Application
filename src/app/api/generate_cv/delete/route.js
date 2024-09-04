import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../lib/globalFunctions";
import { deleteCV } from "@/modules/services/generated_cv";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const { Id } = await request.json();
  const createData = await deleteCV(Id);
  if (createData.error) {
    return errorResponse();
  }
  return successResponse();
}
