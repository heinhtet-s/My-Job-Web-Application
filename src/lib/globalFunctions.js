import { NextResponse } from "next/server";
import * as url from "url";

async function getQuery(urlString) {

  return url.parse(urlString, true).query;
}

function errorResponse(error) {
  return NextResponse.json(
    { message: error ? error : "Something Wrong" },
    { status: 400 }
  );
}


export { getQuery ,errorResponse};

