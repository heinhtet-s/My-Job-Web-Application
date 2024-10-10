"use server";
import axios from "axios";
import {
  EmployerJobPostURL,
  MasterdataURL,
  PackageURL,
} from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function CheckPackage(id) {
  return await axios
    .get(
      encodeURI(`${PackageURL}/CheckUnit/Expiry?CompanyId=${id}`),
      REQUEST_HEADER
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function GetEmployerPackage(id) {
  return await axios
    .get(
      encodeURI(`${PackageURL}/Subscriptions?$filter=EmployerId eq ${id}`),
      REQUEST_HEADER
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function GetPackageList() {
  return await axios
    .get(encodeURI(`${PackageURL}/Packages`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

export { CheckPackage, GetPackageList, GetEmployerPackage };
