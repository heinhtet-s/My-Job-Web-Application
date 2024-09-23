import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { createSkill } from "../../../../../modules/services/seeker_skill_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { Name, YearsOfExperience } = await request.json();
  const createData = await createSkill({
    Name,
    YearsOfExperience,
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
