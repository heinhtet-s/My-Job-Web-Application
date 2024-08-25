import axios from "axios";
import { EmployerJobPostURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetEmployerJobPostList(url) {
 
    return await axios
      .get(encodeURI(`${EmployerJobPostURL}${url}`), REQUEST_HEADER)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        return { error: "Client and server connection error" };
      });
  }

  export {GetEmployerJobPostList}