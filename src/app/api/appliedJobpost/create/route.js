import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authOptions";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "@/lib/globalFunctions";
import { createAppliedJobPost } from "@/modules/services/employer_jobposts";
import { getServerSession } from "next-auth";

export async function POST(request) {

  const session = await getServerSession(authOptions);
  const { JobId,EmployerId } = await request.json();

  const createData = await createAppliedJobPost({
    Status: true,
    EmployerId:EmployerId,
    JobId:JobId,
    IsDisplay: false,
    SeekerId: session?.user?.Id ? session.user.Id : null,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session?.user?.Id ? session.user.Id : null,
    updatedBy: session?.user?.Id ? session.user.Id : null,
  });

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
