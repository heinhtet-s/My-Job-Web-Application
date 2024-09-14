import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { updateEdu } from "../../../../../modules/services/seeker_edu_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const {
    Title,
    University,
    Certificate,
    DegreeId,
    DegreeType,
    EndDate,
    Address,
    Id,
  } = await request.json();
  const createData = await updateEdu(
    {
      Title,
      University,
      Certificate,
      DegreeId,
      DegreeType,
      EndDate,
      Address,
      CreatedAt: getCurrentDate(),
      UpdatedAt: getCurrentDate(),
      CreatedBy: session?.user?.Id ? session?.user?.Id : "",
      UpdatedBy: session?.user?.Id ? session?.user?.Id : "",
    },
    Id
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
