import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../../lib/globalFunctions";
import { createExp } from "../../../../../modules/services/seeker_exp_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const {
    Title,
    CompanyName,
    CountryId,
    TownshipId,
    CityId,
    StartDate,
    EndDate,
    Active,
    SeekerId,
    JobDescription,
  } = await request.json();
  const createData = await createExp({
    Title,
    CompanyName,
    CountryId,
    TownshipId,
    CityId,
    StartDate,
    EndDate,
    Active,
    SeekerId: session?.user?.Id ? session.user.Id : null,
    JobDescription,
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
