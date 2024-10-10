"use server";
import axios from "axios";
import {
  EmployersURL,
  FunctionalAreaURL,
  ViewCoutURL,
} from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
import { getCurrentDate } from "@/lib/globalFunctions";

async function GetEmployersList(url) {
  console.log(encodeURI(`${EmployersURL}${url}`));
  return await axios
    .get(encodeURI(`${EmployersURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Client and server connection error" };
    });
}
async function UpdateEmployerList(data, id) {
  return await axios
    .patch(encodeURI(`${EmployersURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
async function CreateViewCount(data) {
  console.log({ ...data, Date: getCurrentDate() });
  return await axios
    .post(
      encodeURI(`${ViewCoutURL}`),
      { ...data, Date: getCurrentDate() },
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
async function GetEmployerProfileViewCount(url) {
  return await axios
    .get(encodeURI(`${ViewCoutURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
async function GetFunctionalAreaLists(url) {
  return await axios
    .get(encodeURI(`${FunctionalAreaURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

export {
  GetEmployersList,
  CreateViewCount,
  UpdateEmployerList,
  GetFunctionalAreaLists,
  GetEmployerProfileViewCount,
};
