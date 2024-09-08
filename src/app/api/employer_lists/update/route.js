import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UpdateEmployerList } from "../../../../modules/services/employer_service";
export async function POST(request) {
  const session = await getServerSession(authOptions);

  const data = await request.json();

  const createData = await UpdateEmployerList(
    {
      ...data,
      CreatedAt: getCurrentDate(),
      UpdatedAt: getCurrentDate(),
      CreatedBy: session.user?.Id ? session.user.Id : "",
      UpdatedBy: session.user?.Id ? session.user.Id : "",
    },
    session.user?.Id
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
