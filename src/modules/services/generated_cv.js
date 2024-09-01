import axios from "axios";
import { GeneratedCVURL, IndustriesURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetGeneratedCvLists(url) {
  console.log(`${GeneratedCVURL}${url}`)
  console.log(encodeURI(`${GeneratedCVURL}${url}`))
  return await axios
    .get(encodeURI(`${GeneratedCVURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}


async function createCV(data) {
    console.log(data)
    console.log('first')
    return await axios
      .post(encodeURI(GeneratedCVURL), data, REQUEST_HEADER)
      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        console.log("hello", e);
        return { error: "Client and server connection error" };
      });
  }



export { GetGeneratedCvLists,createCV };
