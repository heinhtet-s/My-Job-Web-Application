"use server";
import axios from "axios";
import { AppliedJobPostURL, EmployerJobPostURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
import ApiReq from "@/lib/axiosHandler";

async function GetEmployerJobPostList(url) {
  console.log(encodeURI(`${EmployerJobPostURL}${url}`));
  return await axios
    .get(encodeURI(`${EmployerJobPostURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);

      return { error: "Client and server connection error" };
    });
}
async function GetCandidateList(url) {
  return await ApiReq.get(
    encodeURI(
      `${process.env.AppliedJobPostURL}?$count=true&$expand=Seeker($expand=CareerInfos)${url}`
    ),
    REQUEST_HEADER
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Client and server connection error" };
    });
}
async function GetCandidate(url) {
  return await axios
    .get(encodeURI(`${AppliedJobPostURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);

      return { error: "Client and server connection error" };
    });
}
async function createAppliedJobPost(data) {
  return await axios
    .post(encodeURI(AppliedJobPostURL), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function GetAppliedJobPostList(url) {
  return await axios
    .get(encodeURI(`${AppliedJobPostURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Client and server connection error" };
    });
}
async function UpdatApplicationList(data, id) {
  return await axios
    .patch(encodeURI(`${AppliedJobPostURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Client and server connection error" };
    });
}

export {
  UpdatApplicationList,
  GetCandidate,
  GetEmployerJobPostList,
  GetCandidateList,
  createAppliedJobPost,
  GetAppliedJobPostList,
};
