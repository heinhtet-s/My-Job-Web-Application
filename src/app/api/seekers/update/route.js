import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UpdateSeekerList } from "../../../../modules/services/seeker_service";
export async function POST(request) {
  const session = await getServerSession(authOptions);

  const {
    FirstName,
    LastName,
    Email,
    PhoneNum,
    FatherName,
    ContactPhoneNumber,
    Password,
    ConfirmPassword,
    CountryId,
    CityId,
    TownshipId,
    LoginType,
    LastLogin,
    Gender,
    DateOfBirth,
    Address,
    MaritalStatus,
    UploadCv,
    Nationality,
    ImageUrl,
    About,
    FromSalary,
    ToSalary,
    SalaryNegotiable = false,
    ProfileCompletion,
    ProjectUrl,
    AboutMe,
    FirebaseUserId,
    Id,
  } = await request.json();
  console.log("hello");
  const createData = await UpdateSeekerList(
    {
      FirstName,
      LastName,
      Email,
      PhoneNum,
      FatherName,
      ContactPhoneNumber,
      Password,
      ConfirmPassword,
      CountryId,
      CityId,
      TownshipId,
      LoginType,
      LastLogin,
      Gender,
      DateOfBirth,
      Address,
      MaritalStatus,
      UploadCv,
      Nationality,
      ImageUrl,
      About,
      FromSalary,
      ToSalary,
      SalaryNegotiable,
      ProfileCompletion,
      ProjectUrl,
      AboutMe,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.Id ? session.user.Id : "",
      updatedBy: session.user?.Id ? session.user.Id : "",
    },
    Id
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
