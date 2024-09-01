import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getSkill(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}Skills${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function createSkill(data) {
  return await axios
    .post(encodeURI(`${SeekerInfo}Skills`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log("hello", e);
      return { error: "Client and server connection error" };
    });
}

async function updateSkill(data, id) {
  return await axios
    .patch(encodeURI(`${SeekerInfo}Skills(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function deleteSkill(id) {
  return await axios
    .delete(encodeURI(`${SeekerInfo}Skills(${id})`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { getSkill, createSkill, updateSkill, deleteSkill };
