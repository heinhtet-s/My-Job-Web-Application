import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { updateSkill } from "../../../../../modules/services/seeker_skill_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { Name, Id } = await request.json();
  const createData = await updateSkill(
    {
      Name,
      CreatedAt: getCurrentDate(),
      UpdatedAt: getCurrentDate(),
      CreatedBy: session?.user?.Id ? session.user.Id : null,
      UpdatedBy: session?.user?.Id ? session.user.Id : null,
    },
    Id
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
