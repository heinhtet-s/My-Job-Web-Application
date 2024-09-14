import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { updateEdu } from "../../../../../modules/services/seeker_edu_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { updateCareefInfo } from "../../../../../modules/services/seeker_careerInfo";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const {
    CurrentPosition,
    HighQualification,
    CurrentFunctionalArea,
    YearsOfExperience,
    CareerLevel,
    OverSeaExperience,
    PreferedJobLocation,
    JobType,
    Id,
    ExpectedSalary,
  } = await request.json();
  const createData = await updateCareefInfo(
    {
      CurrentPosition,
      HighQualification,
      CurrentFunctionalArea,
      YearsOfExperience,
      CareerLevel,
      OverSeaExperience,

      PreferedJobLocation,
      JobType,

      ExpectedSalary,
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
