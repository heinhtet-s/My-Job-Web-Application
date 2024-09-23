import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getExp(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}JobExperiences${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function createExp(data, id) {
  return await axios
    .post(encodeURI(`${SeekerInfo}JobExperiences`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function updateExp(data, id) {
  return await axios
    .patch(
      encodeURI(`${SeekerInfo}JobExperiences(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function deleteExp(id) {
  return await axios
    .delete(encodeURI(`${SeekerInfo}JobExperiences(${id})`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

export { getExp, createExp, updateExp, deleteExp };
