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

  try {
    const getData = await axios.get(
      `${EmployersURL}?$filter=IsFeatured eq true and Status eq 'Accepted'&$expand=JobPosts($filter=JobStatus eq 'Active' and IsExpired eq false;$count=true)`
    );
    const sortedResult = getData?.data?.value?.sort(
      (a, b) => b["JobPosts@odata.count"] - a["JobPosts@odata.count"]
    );
    return NextResponse.json(sortedResult);
  } catch (error) {
    console.log(error, "dd");
    return errorResponse("An error occurred while fetching the data");
  }
}
