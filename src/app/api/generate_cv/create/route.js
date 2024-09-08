import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authOptions";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "@/lib/globalFunctions";
import { createCV } from "@/modules/services/generated_cv";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { CVFileName, CVS3Url } = await request.json();

  const createData = await createCV({
    CVFileName,
    CVS3Url,
    CVType: "Uploaded",
    Active: false,
    ImageUrl: null,
    CvGeneratedUIType: "generated",
    FullName: null,
    Email: null,
    PhoneNumber: null,
    Address: null,
    Education: null,
    Experience: null,
    Skills: null,
    Lanuages: null,
    Certifications: null,
    Projects: null,
    ExpectedSalary: null,
    Other: null,
    SeekerId: session?.user?.Id ? session.user.Id : null,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session?.user?.Id ? session.user.Id : null,
    updatedBy: session?.user?.Id ? session.user.Id : null,
  });
 
  if (createData.error) {
    return errorResponse();
  }
  return NextResponse.json(createData);
}
