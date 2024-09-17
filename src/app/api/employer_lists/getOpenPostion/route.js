import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";
import { GetJobById, getEmployerById } from "../../../../lib/generalApi";
import { GetEmployersList } from "../../../../modules/services/employer_service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { EmployersURL } from "@/lib/apiConst";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  console.log("request");
  console.log(request.url);

  try {
    const query = await getQuery(request.url);

    const getData = await axios.get(
      `${EmployersURL}?$filter=IsFeatured eq true and Status eq 'Accepted'`
    );
    const filteredIds = getData?.data?.value?.map((item) => item.Id);
    console.log(filteredIds, "geetere");

    if (getData.error) {
      return errorResponse("Failed to get applied job post data");
    }

    const jobObj = await getEmployerById(filteredIds);
    const addJobCountToCompanies = (companies, jobs) => {
      return companies?.map((company) => {
        const jobCount = jobs?.filter(
          (job) =>
            job.EmployerId === company.Id &&
            job.JobStatus === "Active" &&
            job.IsExpired === false
        )?.length;
        console.log(
          jobs?.filter(
            (job) =>
              job.EmployerId === company.Id &&
              job.JobStatus === "Active" &&
              job.IsExpired === false
          )
        );
        return {
          ...company,
          OpenPositionCount: jobCount,
        };
      });
    };

    const result = addJobCountToCompanies(getData?.data?.value, jobObj);
    const sortedResult = result?.sort(
      (a, b) => b.OpenPositionCount - a.OpenPositionCount
    );

    return NextResponse.json(sortedResult);
  } catch (error) {
    console.log(error, "dd");
    return errorResponse("An error occurred while fetching the data");
  }
}
