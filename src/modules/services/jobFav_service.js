"use server";
import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getFavJob(id) {
  return await axios
    .get(
      encodeURI(`${SeekerInfo}FavouritesDetail/FavJobs?seekerId=${id}`),
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      
      return { error: "Client and server connection error" };
    });
}

async function postFavJob(data) {
  return await axios
    .post(
      encodeURI(`${SeekerInfo}FavouritesDetail/FavJob`),
      data,
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
    
      return { error: "Client and server connection error" };
    });
}

export { getFavJob, postFavJob };
