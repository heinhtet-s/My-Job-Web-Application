import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {apiGetData} from '@/lib/apiQueryHandler'
import {EmployerJobPosts} from '@/lib/queryConst'
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
export async function GET (request){
    const query = await getQuery(request.url)
    const getData = await apiGetData(query,EmployerJobPosts,GetEmployerJobPostList)
    if(getData.error){
        return  errorResponse();
    }
    return NextResponse.json(getData)
}


