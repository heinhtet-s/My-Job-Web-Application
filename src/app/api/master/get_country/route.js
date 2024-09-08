import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import { GetCountry } from "../../../../modules/services/master";
export async function GET(request) {

  const countries = await GetCountry();
  if (countries.error) {
    return errorResponse();
  }
  return NextResponse.json(countries);
}
