import axios from "axios";
import { EmployerJobPostURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetEmployerJobPostList(url) {
console.log(`${EmployerJobPostURL}${url}`)
  return await axios
    .get(encodeURI(`${EmployerJobPostURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
    
      return { error: "Client and server connection error" };
    });
}

export { GetEmployerJobPostList };


