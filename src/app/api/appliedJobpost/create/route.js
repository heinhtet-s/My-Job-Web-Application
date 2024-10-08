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
  const { JobId, EmployerId, CVsId } = await request.json();

  const createData = await createAppliedJobPost({
    Status: "None",
    EmployerId: EmployerId,
    CvId: CVsId,
    JobId: JobId,
    IsDisplay: true,
    SeekerId: session?.user?.Id ? session.user.Id : null,
    CreatedAt: getCurrentDate(),
    UpdatedAt: getCurrentDate(),
    CreatedBy: session?.user?.Id ? session.user.Id : null,
    UpdatedBy: session?.user?.Id ? session.user.Id : null,
  });

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
