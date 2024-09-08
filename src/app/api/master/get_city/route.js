import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {GetCity } from "../../../../modules/services/master";
export async function GET(request) {

  const countries = await GetCity();
  if (countries.error) {
    return errorResponse();
  }
  return NextResponse.json(countries);
}
