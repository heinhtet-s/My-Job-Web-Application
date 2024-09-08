import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";

import axios from "axios";
import { FunctionalAreaURL, IndustriesURL } from "../../../../lib/apiConst";
export async function GET(request) {
  try {
    const getData = await axios.get(`${IndustriesURL}`);

    return NextResponse.json(getData?.data?.value);
  } catch (e) {
    return errorResponse();
  }
}
