import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getCareefInfo(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}CareerInfos${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

async function createCareefInfo(data) {
  return await axios
    .post(encodeURI(`${SeekerInfo}CareerInfos`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

async function updateCareefInfo(data, id) {
  return await axios
    .patch(encodeURI(`${SeekerInfo}CareerInfos(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function deleteCareefInfo(id) {
  return await axios
    .delete(encodeURI(`${SeekerInfo}CareerInfos(${id})`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { getCareefInfo, createCareefInfo, updateCareefInfo, deleteCareefInfo };
