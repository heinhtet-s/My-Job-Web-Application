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
  console.log(data);
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
  console.log(data);
  return await axios
    .post(encodeURI(`${EmployerInfo}/JobPosts`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e?.response);
      throw { error: e?.response || "No enough unit" };
    });
}
export { getGenerateData, createJobPost };
