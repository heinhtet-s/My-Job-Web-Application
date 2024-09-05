"use server";
import axios from "axios";
import { REQUEST_HEADER } from "../../lib/config";
import { EmployeerAuth, SeekerAuth, UploadCVURL } from "@/lib/apiConst";
import { signOut } from "next-auth/react";
async function SeekerLogin({ email, password }) {
  const urlString = `${SeekerAuth}/login`;
  try {
    await axios.post(urlString, {
      email,
      password,
    });
    const data = await axios.get(
      `http://localhost:3000/api/seekers/getSeekerByEmail?email=${encodeURI(
        email
      )}`
    );
    console.log(data, "datassss");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function SeekerSsoLogin({ token, email }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/SignIns/seeker`;
  try {
    await axios.post(urlString, {
      accesstoken: token,
      login: true,
    });
    const data = await axios.get(
      `http://localhost:3000/api/seekers/getSeekerByEmail?email=${encodeURI(
        email
      )}`
    );
    console.log(data, "datassss");
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
    const data = await axios.get(
      `http://localhost:3000/api/company_lists/getSeekerByEmail?email=${encodeURI(
        email
      )}`
    );
    console.log(data, "datassss");
    return data;
  } catch (e) {
    console.log(e?.response?.data);
    throw new Error(e?.response?.data);
  }
}
async function EmployerLogin({ email, password }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/login`;
  console.log(email, "datassss");
  try {
    await axios.post(urlString, {
      email,
      password,
    });

    const data = await axios.get(
      `http://localhost:3000/api/company_lists/getSeekerByEmail?email=${encodeURI(
        email
      )}`
    );
    console.log(data, "datassss");
    return data;
  } catch (e) {
    console.log(e?.response?.data);
    throw e?.response?.data;
  }
}
async function SeekerRegister(data) {
  const urlString = `${SeekerAuth}register`;
  console.log(data);
  try {
    await axios.post(urlString, {
      ...data,
    });

    console.log(data, "datassss");
    return data;
  } catch (e) {
    console.log(e.response.data.error);
    throw e;
  }
}
async function EmployeerRegister(data) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/register`;
  console.log(data);
  try {
    await axios.post(urlString, {
      ...data,
    });
  } catch (e) {
    console.log(e?.response?.data, "error");
    throw e;
  }
}
async function ResetPasswordEmployer({ email }) {
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}employer/v1/Auth/password-reset?Email=${email}`;
  console.log(email, "datassss");
  try {
    await axios.post(urlString, {});
    return data;
  } catch (e) {
    console.log(e?.response?.data);
    throw e?.response?.data;
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
    console.log(e);
    throw e;
  }
}
async function ResetPasswordSeeker(email) {
  console.log(email);
  console.log(
    `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/Auth/password-reset?Email=${email}`
  );
  const urlString = `${process.env.NEXT_PUBLIC_API_URL}seeker/v1/Logins/resetpassword?Email=${email}`;
  console.log(urlString, "fwf");
  try {
    await axios.post(urlString);
  } catch (e) {
    console.log(e);
    throw e?.response?.data;
  }
}
async function Logout() {
  await signOut({ redirect: false });
  router.push("/login");
}

async function UploadCv(data, id) {
  console.log(id);

  const url = `${UploadCVURL}?seekerId=${id}`;
  console.log(url);
  console.log(data);
  try {
    const response = await axios.post(encodeURI(url), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error uploading CV", e);
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
  SeekerSsoLogin,
  EmployerSsoLogin,
  EmployeerRegister,
  EmailVerifyEmployer,
  UploadCv,
};
