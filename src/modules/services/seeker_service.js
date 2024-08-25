import axios from "axios";
import { SeekersURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetSeekerList(url) {
 
    return await axios
      .get(encodeURI(`${SeekersURL}${url}`), REQUEST_HEADER)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        return { error: "Client and server connection error" };
      });
  }


  async function GetSeekerById(url) {
 
    return await axios
      .get(encodeURI(`${SeekersURL}${url}`), REQUEST_HEADER)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        return { error: "Client and server connection error" };
      });
  }

  export {GetSeekerList}