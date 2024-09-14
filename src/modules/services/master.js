import axios from "axios";
import { EmployerJobPostURL, MasterdataURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetCountry() {
  return await axios
    .get(encodeURI(`${MasterdataURL}/Countries`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function GetCity() {
  return await axios
    .get(encodeURI(`${MasterdataURL}/Cities`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function GetState() {
  return await axios
    .get(encodeURI(`${MasterdataURL}/States`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function GetDegreeLevels() {
  return await axios
    .get(encodeURI(`${MasterdataURL}/DegreeLevels`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function GetDegreeTypes() {
  return await axios
    .get(encodeURI(`${MasterdataURL}/DegreeTypes`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

export { GetCountry, GetDegreeTypes, GetDegreeLevels, GetState, GetCity };
