"use server";
import axios from "axios";
import { EmployersURL, SeekerInfo, SeekersURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetSeekerList(url) {
  console.log(`${SeekersURL}${url}`);
  return await axios
    .get(encodeURI(`${SeekersURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function GetSeekerProfilePercentage(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function UpdateSeekerList(data, id) {
  return await axios
    .patch(encodeURI(`${SeekersURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
async function UpdateEmployerList(data, id) {
  return await axios
    .patch(encodeURI(`${EmployersURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function GetSeekerById(url) {
  return await axios
    .get(encodeURI(`${SeekersURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { GetSeekerList, UpdateSeekerList, GetSeekerProfilePercentage };
