"use server";
import axios from "axios";
import { REQUEST_HEADER } from "../../lib/config";
import { EmployeerAuth, SeekerAuth, UploadCVURL } from "@/lib/apiConst";
import { signOut } from "next-auth/react";
import ApiReq from "@/lib/axiosHandler";
async function SeekerLogin({ email, password }) {
  const urlString = `${SeekerAuth}login`;
  try {
    await axios.post(urlString, {
      email,
      password,
    });
    console.log(
      email,
      `${
        process.env.NEXT_PUBLIC_WEBSITE_URL
      }api/seekers/getSeekerByEmail?email=${encodeURIComponent(email)}`
    );
    const data = await axios.get(
      `${
        process.env.NEXT_PUBLIC_WEBSITE_URL
      }/api/seekers/getSeekerByEmail?email=${encodeURIComponent(email)}`
    );

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
const GetLinkedInInfo = async (customToken) => {
  try {
    const response = await axios(
      "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,email)",
      {
        headers: {
          Authorization: `Bearer ${customToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    console.error("Error authenticating with Firebase:", error);
  }
};
async function LinkedinAccessToken(code, redirect_uri) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri, // Pass the correct redirect URI dynamically
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
  });

  try {
    const { data } = await axios.post(
      `https://www.linkedin.com/oauth/v2/accessToken`,
      params.toString(), // Send the parameters as URL-encoded form data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data; // The token information is in `data`
  } catch (e) {
    console.error(e.response?.data || e.message);
    throw e;
  }
}

async function SeekerLinkedinLogin(token) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/LinkedIn`;
  try {
    const data = await axios.post(urlString, {
      accesstoken: token,
    });
    console.log(data);
    // const data = await ApiReq.get(
    //   `/api/seekers/getSeekerByEmail?email=${encodeURI(email)}`
    // );

    return data?.data;
  } catch (e) {
    console.log(e);
    return "error";
  }
}
async function SeekerLinkedin({ email }) {
  const data = await ApiReq.get(
    `/api/seekers/getSeekerByEmail?email=${encodeURI(email)}`
  );
  return data;
}
async function EmployerLinkedin({ email }) {
  const data = await ApiReq.get(
    `api/company_lists/getSeekerByEmail?email=${email}`
  );
  return data;
}
async function SeekerSsoLogin({ token, email }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/SignIns/SSO`;
  try {
    await axios.post(urlString, {
      accesstoken: token,
      login: true,
    });

    const data = await ApiReq.get(
      `/api/seekers/getSeekerByEmail?email=${encodeURI(email)}`
    );

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function EmployerSsoLogin({ token, email }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/SSO`;
  try {
    await axios.post(urlString, {
      accesstoken: token,
    });
    const data = await ApiReq.get(
      `api/company_lists/getSeekerByEmail?email=${email}`
    );

    return data;
  } catch (e) {
    throw new Error(e?.response?.data);
  }
}
async function EmployerLogin({ email, password }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/login`;

  try {
    await axios.post(urlString, {
      email,
      password,
    });

    const data = await ApiReq.get(
      `api/company_lists/getSeekerByEmail?email=${encodeURI(email)}`
    );

    return data;
  } catch (e) {
    console.log(e);
    throw e?.response?.data;
  }
}
async function SeekerRegister(data) {
  const urlString = `${SeekerAuth}register`;

  try {
    await axios.post(urlString, {
      ...data,
    });

    return data;
  } catch (e) {
    console.log(e?.response?.data);
    throw Error(e?.response?.data);
  }
}
async function EmployeerRegister(data) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/register`;
  console.log(data, "data");
  try {
    await axios.post(urlString, {
      ...data,
    });
  } catch (e) {
    throw Error(e?.response?.data);
  }
}
async function ResetPasswordEmployer({ email }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/password-reset?Email=${email}`;

  try {
    await axios.post(urlString, {});
    return data;
  } catch (e) {
    throw e?.response?.data;
  }
}

async function EmailVerifySeeker(token) {
  const urlString = encodeURI(
    `https://myjobs.dev/seeker/v1/verify?token=${token}`
  );
  try {
    const data = await axios.get(urlString);
    return "success";
  } catch (e) {
    throw e;
  }
}
async function EmailVerifyEmployer(token) {
  const urlString = encodeURI(
    `https://myjobs.dev/employer/v1/verify?token=${token}`
  );
  try {
    const data = await axios.get(urlString);
    return "success";
  } catch (e) {
    throw e;
  }
}
async function ResetPasswordSeeker(email) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/Logins/resetpassword?Email=${email}`;

  try {
    await axios.post(urlString);
  } catch (e) {
    throw e?.response?.data;
  }
}
async function Logout() {
  await signOut({ redirect: false });
  router.push("/login");
}

async function UploadCv(data, id) {
  const url = `${UploadCVURL}?seekerId=${id}`;

  try {
    const response = await axios.post(encodeURI(url), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    return { error: "Client and server connection error" };
  }
}

// https://myjobs.dev/seeker/v1/UploadCvs/upload?seekerId=9a8ced97-77e7-466c-baf1-9e73a4ecfd23
// https://myjobs.dev/seeker/v1/UploadCvs/upload?seekerId=167553d6-a4bd-4c22-89a2-2a2c7fa215e2
// https://myjobs.dev/seeker/v1/UploadCvs/upload?seekerId=9a8ced97-77e7-466c-baf1-9e73a4ecfd23
// https://myjobs.dev/seeker/v1/UploadCvs/upload?seekerId=167553d6-a4bd-4c22-89a2-2a2c7fa215e2
export {
  SeekerLogin,
  ResetPasswordSeeker,
  ResetPasswordEmployer,
  EmployerLogin,
  SeekerRegister,
  Logout,
  SeekerLinkedin,
  EmployerLinkedin,
  SeekerSsoLogin,
  GetLinkedInInfo,
  LinkedinAccessToken,
  EmployerSsoLogin,
  SeekerLinkedinLogin,
  EmployeerRegister,
  EmailVerifyEmployer,
  UploadCv,
  EmailVerifySeeker,
};
