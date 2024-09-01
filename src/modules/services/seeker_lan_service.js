import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getLan(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}Languages${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function createLan(data) {
  return await axios
    .post(encodeURI(`${SeekerInfo}Languages`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log("hello", e);
      return { error: "Client and server connection error" };
    });
}

async function updateLan(data, id) {
  return await axios
    .patch(encodeURI(`${SeekerInfo}Languages(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function deleteLan(id) {
  return await axios
    .delete(encodeURI(`${SeekerInfo}Languages(${id})`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { getLan, createLan, updateLan, deleteLan };
