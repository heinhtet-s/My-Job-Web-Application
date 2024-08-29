import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {apiGetData} from '@/lib/apiQueryHandler'
import {EmployersConst} from '@/lib/queryConst'
import { GetEmployersList } from "@/modules/services/employer_service";
export async function GET (request){
    const query = await getQuery(request.url)
    const getData = await apiGetData(query,EmployersConst,GetEmployersList)
    if(getData.error){
        return  errorResponse();
    }
    return NextResponse.json(getData)
}


