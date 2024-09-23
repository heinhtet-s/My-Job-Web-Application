"use server";
import axios from "axios";
import {
  GeneratedCVURL,
  GetCvURl,
  IndustriesURL,
  UploadCVURL,
} from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetGeneratedCvLists(url) {
  console.log(`${GeneratedCVURL}${url}`);
  return await axios
    .get(encodeURI(`${GeneratedCVURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function createCV(data) {
  return await axios
    .post(encodeURI(GeneratedCVURL), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}
async function downlaodCV(url) {
  console.log(`${GetCvURl}${url}`);
  return await axios
    .get(encodeURI(`${GetCvURl + url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
async function updateCv(id, data) {
  return await axios
    .patch(encodeURI(`${GeneratedCVURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

async function deleteCV(id) {
  return await axios
    .delete(`${GeneratedCVURL}(${id})`, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

export { GetGeneratedCvLists, downlaodCV, updateCv, createCV, deleteCV };
