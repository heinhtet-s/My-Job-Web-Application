import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { createEdu } from "../../../../../modules/services/seeker_edu_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createCareefInfo } from "../../../../../modules/services/seeker_careerInfo";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();

  const createData = await createCareefInfo({
    ...data,
    // CountryId,
    // StateId,
    // CityId,
    YearsOfExperience,
    Active: true,
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
