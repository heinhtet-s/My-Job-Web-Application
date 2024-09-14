import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";
import { GetJobById, getEmployerById } from "../../../../lib/generalApi";
import { GetEmployersList } from "../../../../modules/services/employer_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  console.log("request");
  console.log(request.url);

  try {
    const query = await getQuery(request.url);

    const getData = await apiGetData(query, EmployersConst, GetEmployersList);
    console.log;
    const filteredIds = getData?.value
      .filter((item) => item.Status === "Accepted")
      .map((item) => item.Id);

    if (getData.error) {
      return errorResponse("Failed to get applied job post data");
    }

    const jobObj = await getEmployerById(filteredIds);
    const addJobCountToCompanies = (companies, jobs) => {
      return companies.map((company) => {
        const jobCount = jobs.filter(
          (job) =>
            job.EmployerId === company.Id &&
            job.JobStatus == "Active" &&
            job.IsExpired === false
        ).length;
        return {
          ...company,
          OpenPositionCount: jobCount,
        };
      });
    };

    const result = addJobCountToCompanies(getData?.value, jobObj);
    const sortedResult = result.sort(
      (a, b) => b.OpenPositionCount - a.OpenPositionCount
    );

    return NextResponse.json(sortedResult);
  } catch (error) {
    return errorResponse("An error occurred while fetching the data");
  }
}
