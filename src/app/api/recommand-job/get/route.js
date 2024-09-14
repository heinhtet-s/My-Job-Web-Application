import { NextResponse } from "next/server";
import {
  errorResponse,
  successResponse,
  getCurrentDate,
} from "../../../../lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCareefInfo } from "../../../../modules/services/seeker_careerInfo";
import { getJobPost } from "../../../../modules/services/jobPost_service";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  const getCareerInfo = await getCareefInfo(
    `?$filter=SeekerId eq ${session?.user?.Id}`
  );
  console.log(getCareerInfo);
  if (getCareerInfo?.value?.length > 0) {
    console.log(getCareerInfo?.value?.[0]?.CurrentFunctionalArea, "id");
    const getData = await getJobPost(
      `?$expand=Employer&filter=FunctionalAreaId eq ${getCareerInfo?.value?.[0]?.CurrentFunctionalArea} and IsExpired eq false and JobStatus eq 'Active'&$orderby=CreatedAt desc`
    );

    if (getData.error) {
      return errorResponse();
    }

    return NextResponse.json(getData?.value);
  }
  return NextResponse.json([]);
}
