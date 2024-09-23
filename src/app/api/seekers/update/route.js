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
    PhoneNum,
    FatherName,
    ContactPhoneNumber,
    Password,
    ConfirmPassword,
    CountryId,
    StateId,
    CityId,
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
    ProjectUrl1,
    AboutMe,
    Id,
    NationalId,
  } = await request.json();

  const createData = await UpdateSeekerList(
    {
      FirstName,
      LastName,
      PhoneNum,
      FatherName,
      ContactPhoneNumber,
      Password,
      ConfirmPassword,
      CountryId,
      StateId,
      CityId,
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
      NationalId,
      FromSalary,
      ToSalary,

      ProjectUrl1,
      AboutMe,
      CreatedAt: getCurrentDate(),
      UpdatedAt: getCurrentDate(),
      CreatedBy: session.user?.Id ? session.user.Id : "",
      UpdatedBy: session.user?.Id ? session.user.Id : "",
    },
    Id
  );

  if (createData.error) {
    return errorResponse();
  }

  return successResponse();
}
