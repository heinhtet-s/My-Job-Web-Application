"use server";
import axios from "axios";
import { UploadCVURL } from "../../lib/apiConst";

async function UploadedCv(data) {
  const url = `${UploadCVURL}`;
  try {
    const response = await axios.post(encodeURI(url), data);
    console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error uploading CV", e);
    return { error: "Client and server connection error" };
  }
}

async function UploadedImageApi(id, data) {
  const url = `https://myjobs.dev/seeker/v1/Image/ImageUrl?SeekerId=${id}`;
  try {
    const response = await axios.post(encodeURI(url), data);
    console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error uploading CV", e);
    return { error: "Client and server connection error" };
  }
}
export { UploadedCv, UploadedImageApi };
