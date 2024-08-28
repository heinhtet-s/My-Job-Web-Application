import axios from "axios";
import { IndustriesURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetInsdustriesList(url) {
  return await axios
    .get(encodeURI(`${IndustriesURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export { GetInsdustriesList };
