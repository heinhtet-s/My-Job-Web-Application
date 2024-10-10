"use server";
import axios from "axios";
import { BlogURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetBlogs(url) {
  console.log(`${BlogURL}${url}`);
  return await axios
    .get(encodeURI(`${BlogURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);

      return { error: "Client and server connection error" };
    });
}
async function GetCategories(url) {
  console.log(`${BlogURL}${url}`);
  return await axios
    .get(encodeURI(`${BlogURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return { error: "Client and server connection error" };
    });
}
export { GetBlogs, GetCategories };
