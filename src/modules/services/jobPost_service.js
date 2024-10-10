"use server";
import axios from "axios";
import { EmployerInfo, SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
// async function getFavJob(id) {
//   return await axios
//     .get(
//       encodeURI(`${SeekerInfo}FavouritesDetail/FavJobs?seekerId=${id}`),
//       REQUEST_HEADER
//     )
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((e) => {
//       console.log(e);
//       return { error: "Client and server connection error" };
//     });
// }

async function getGenerateData(data) {
  return await axios
    .post(
      encodeURI(`${EmployerInfo}AIJobPost/CreateWithAI?AI=true`),
      data,
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e?.response);
      return { error: e?.response || "No enough unit" };
    });
}
async function createJobPost(data) {
  return await axios
    .post(encodeURI(`${EmployerInfo}/JobPosts`), data)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      // console.log(e?.response);
      throw { error: e?.response || "No enough unit" };
    });
}
async function getJobPost(url) {
  console.log(encodeURI(`${EmployerInfo}JobPosts${url}`));
  return await axios
    .get(encodeURI(`${EmployerInfo}JobPosts${url}`))
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      // console.log(e?.response);
      throw { error: e?.response || "No enough unit" };
    });
}
async function getJobPostById(id) {
  return await axios
    .get(encodeURI(`${EmployerInfo}/JobPosts/${id}`))
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(data);
      // console.log(e?.response);
      throw { error: e?.response || "No enough unit" };
    });
}
async function updateJobPost(id, data) {
  return await axios
    .patch(encodeURI(`${EmployerInfo}JobPosts(${id})`), data)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(data);
      // console.log(e?.response);
      throw { error: e?.response || "No enough unit" };
    });
}
async function updateJobPostCount(id, data, callback) {
  return await axios.patch(encodeURI(`${EmployerInfo}JobPosts(${id})`), data);
}
export {
  getGenerateData,
  updateJobPostCount,
  getJobPost,
  getJobPostById,
  createJobPost,
  updateJobPost,
};
