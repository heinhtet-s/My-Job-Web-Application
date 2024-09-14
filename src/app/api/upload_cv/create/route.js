import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "@/lib/globalFunctions";
import { UploadCv } from "@/modules/services/uploadcv_service";
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Parse the incoming request as form data
  const formData = await request.formData();
  const file = formData.get("file");

  const createData = await UploadCv(
    {
      file: file,
      CreatedAt: getCurrentDate(),
      UpdatedAt: getCurrentDate(),
      CreatedBy: session?.user?.Id || null,
      UpdatedBy: session?.user?.Id || null,
    },
    session?.user?.Id || null
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
