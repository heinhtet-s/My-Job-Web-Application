import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {apiGetData} from '@/lib/apiQueryHandler'
import {GeneratedCvConst} from '@/lib/queryConst'
import { GetGeneratedCvLists } from "../../../../modules/services/generated_cv";
export async function GET (request){
    const query = await getQuery(request.url)
 
    const getData = await apiGetData(query,GeneratedCvConst,GetGeneratedCvLists)
    if(getData.error){
        return  errorResponse();
    }
    return NextResponse.json(getData)
}


