import axios from "axios";
import { EmployersURL, FunctionalAreaURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetEmployersList(url) {
  return await axios
    .get(encodeURI(`${EmployersURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function UpdateEmployerList(data, id) {
  console.log(data, "data");
  return await axios
    .patch(encodeURI(`${EmployersURL}(${id})`), data, REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}

async function GetFunctionalAreaLists(url) {
  return await axios
    .get(encodeURI(`${FunctionalAreaURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

export { GetEmployersList, UpdateEmployerList, GetFunctionalAreaLists };
