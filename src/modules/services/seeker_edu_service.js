import axios from "axios";
import { SeekerInfo } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";
async function getEdu(url) {
  return await axios
    .get(encodeURI(`${SeekerInfo}Educations${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      
      return { error: "Client and server connection error" };
    });
}

async function createEdu(data) {
  return await axios
    .post(encodeURI(`${SeekerInfo}Educations`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
     
      return { error: "Client and server connection error" };
    });
}

async function updateEdu(data, id) {
  return await axios
    .patch(encodeURI(`${SeekerInfo}Educations(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function deleteEdu(id) {
  return await axios
    .delete(encodeURI(`${SeekerInfo}Educations(${id})`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { getEdu, createEdu, updateEdu, deleteEdu };
