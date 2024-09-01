import axios from 'axios';
import { UploadCVURL } from "../../lib/apiConst";

async function UploadCv(data, id) {
 
  const url = `${UploadCVURL}?seekerId=${id}`;
  console.log(url)
console.log(data)
  try {
    const response = await axios.post(encodeURI(url), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
   
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error uploading CV", e);
    return { error: "Client and server connection error" };
  }
}

export { UploadCv };
