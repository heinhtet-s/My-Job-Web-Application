import axios from "axios";
import { EmployersURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetEmployersList(url) {
 console.log(`${EmployersURL}${url}`)
    return await axios
      .get(encodeURI(`${EmployersURL}${url}`), REQUEST_HEADER)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err)
        return { error: "Client and server connection error" };
      });
  }

  export {GetEmployersList}