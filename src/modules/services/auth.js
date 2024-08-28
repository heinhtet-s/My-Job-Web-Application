"use server";
import axios from "axios";
import { REQUEST_HEADER } from "../../lib/config";
import { EmployeerAuth, SeekerAuth } from "@/lib/apiConst";
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
  const urlString = `https://myjobs.dev/seeker/v1/SignIns/seeker`;
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
  const urlString = `https://myjobs.dev/employer/v1/Auth/SSO`;
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
  const urlString = `https://myjobs.dev/employer/v1/Auth/login`;
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
  const urlString = `https://myjobs.dev/employer/v1/Auth/register`;
  console.log(data);
  try {
    await axios.post(urlString, {
      ...data,
    });

    console.log(data, "datassss");
    return data;
  } catch (e) {
    console.log(e?.response?.data, "error");
    throw e;
  }
}
async function Logout() {
  await signOut({ redirect: false });
  router.push("/login");
}
export {
  SeekerLogin,
  EmployerLogin,
  SeekerRegister,
  Logout,
  SeekerSsoLogin,
  EmployerSsoLogin,
  EmployeerRegister,
};
