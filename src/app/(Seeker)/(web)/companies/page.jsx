import { odataQueryHandler } from "@/lib/apiQueryHandler";
import {  EmployersConst } from "@/lib/queryConst";

import CompanyPage from "./body";
import { GetEmployersList } from "@/modules/services/employer_service";

export default async function JobPost() {
  try {
    const data = await odataQueryHandler(
      EmployersConst,
      EmployersConst.filter,
      EmployersConst.order,
      EmployersConst.fields,
      "normal",
      { top: 10, skip: 0 },
      GetEmployersList
    );
    return <CompanyPage companyLists={data} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <CompanyPage companyLists={{ count: 0, value: [] }} />;
  }
}




