import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { AppliedJobPostConst } from "@/lib/queryConst";
import { GetJobById } from "../../../../lib/generalApi";
import { GetAppliedJobPostList } from "../../../../modules/services/employer_jobposts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET(request) {
  const session = await getServerSession(authOptions);

  try {
    const query = await getQuery(request.url);
    const getData = await apiGetData(
      query,
      AppliedJobPostConst,
      GetAppliedJobPostList
    );
    if (getData.error) {
      return errorResponse("Failed to get applied job post data");
    }
    const jobIds = getData?.value.map((item) => item.JobId);
    const jobObj = await GetJobById(jobIds);
    const jobObjMap = new Map(jobObj.map((job) => [job.Id, job]));

    const result = getData.value.map((item) => {
      const jobDetails = jobObjMap.get(item.JobId) || {};

      return {
        ...item,
        JobType: jobDetails.JobType || "",
        JobTitle: jobDetails.Title || "",
        CompanyName: jobDetails?.Employer?.CompanyName || "",
        FunctionalArea: jobDetails?.FunctionalArea?.TitleEng || "",
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return errorResponse("An error occurred while fetching the data");
  }
}
