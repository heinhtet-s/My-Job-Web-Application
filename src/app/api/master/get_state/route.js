import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {GetState } from "../../../../modules/services/master";
export async function GET(request) {

  const countries = await GetState();
  if (countries.error) {
    return errorResponse();
  }
  return NextResponse.json(countries);
}
