import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {
  GetCandidate,
  GetEmployerJobPostList,
} from "@/modules/services/employer_jobposts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request) {
  const query = await getQuery(request.url);
  const session = await getServerSession(authOptions);

  const field = query?.include?.split(",");
  let data = {};

  try {
    for (let index = 0; index < field?.length; index++) {
      switch (field[index]) {
        case "totalJob":
          const totalJob = await GetEmployerJobPostList(
            `/$count?$filter=EmployerId eq ${session?.user?.Id}`
          );
          data = {
            ...data,
            totalJob: totalJob,
          };
          break;

        case "onlineJob":
          const degreeTypes = await GetEmployerJobPostList(
            `/$count?$filter=EmployerId eq ${session?.user?.Id} and isExpired eq false`
          );
          data = {
            ...data,
            onlineJob: degreeTypes,
          };
          break;

        case "offlineJob":
          const degreeLevels = await GetEmployerJobPostList(
            `/$count?$filter=EmployerId eq ${session?.user?.Id} and isExpired eq true`
          );
          data = {
            ...data,
            offlineJob: degreeLevels,
          };
          break;

        case "sportlightJob":
          const sportlightJob = await GetEmployerJobPostList(
            `/$count?$filter=EmployerId eq ${session?.user?.Id} and JobUnitType eq 'Spotlight'`
          );
          data = {
            ...data,
            sportlightJob,
          };
          break;

        case "totalApplication":
          const JobApplication = await GetCandidate(
            `/$count?$filter=EmployerId eq ${session?.user?.Id}`
          );
          data = {
            ...data,
            JobApplication: JobApplication,
          };
          break;

        case "JobView":
          const jobView = await GetEmployerJobPostList(
            `?$apply=filter(EmployerId eq ${session?.user?.Id})/groupby((EmployerId), aggregate(ViewCount with sum as TotalViewCount))`
          );
          data = {
            ...data,
            jobView: jobView?.value?.[0]?.TotalViewCount,
          };
          break;
        default:
          break;
      }
    }

    return NextResponse.json(data);
  } catch (e) {
    c;
    return errorResponse();
  }
}
