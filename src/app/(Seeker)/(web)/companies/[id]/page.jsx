import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { EmployersConst } from "@/lib/queryConst";

import CompanyDetail from "./body";
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
    return <CompanyDetail companyLists={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <CompanyDetail companyLists={{ count: 0, value: [] }} />;
  }
}
