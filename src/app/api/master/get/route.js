import { NextResponse } from "next/server";
import { errorResponse, getQuery } from "../../../../lib/globalFunctions";
import {
  GetCountry,
  GetDegreeTypes,
  GetDegreeLevels,
  GetState,
  GetCity,
} from "../../../../modules/services/master";

export async function GET(request) {
  const query = await getQuery(request.url);
  console.log(query);
  const field = query?.include?.split(",");
  let data = {};

  try {
    for (let index = 0; index < field?.length; index++) {
      switch (field[index]) {
        case "country":
          const country = await GetCountry();
          data = {
            ...data,
            country: country.value,
          };
          break;

        case "degreeTypes":
          const degreeTypes = await GetDegreeTypes();
          data = {
            ...data,
            degreeTypes: degreeTypes.value,
          };
          break;

        case "degreeLevels":
          const degreeLevels = await GetDegreeLevels();
          data = {
            ...data,
            degreeLevels: degreeLevels.value,
          };
          break;

        case "state":
          const state = await GetState();
          data = {
            ...data,
            state: state.value,
          };
          break;

        case "city":
          const city = await GetCity();
          data = {
            ...data,
            city: city.value,
          };
          break;

        default:
          console.log(`Unknown field: ${field[index]}`);
          break;
      }
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return errorResponse();
  }
}
