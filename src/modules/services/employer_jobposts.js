"use server";
import axios from "axios";
import { AppliedJobPostURL, EmployerJobPostURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

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
async function GetCandidateList(id) {
  return await axios
    .get(
      encodeURI(
        `https://myjobs.dev/seeker/v1/AppliedJobPosts?$expand=Seeker&$filter=EmployerId eq ${id}`
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
async function createAppliedJobPost(data) {
  return await axios
    .post(encodeURI(AppliedJobPostURL), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
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
      return { error: "Client and server connection error" };
    });
}

export {
  GetEmployerJobPostList,
  GetCandidateList,
  createAppliedJobPost,
  GetAppliedJobPostList,
};
