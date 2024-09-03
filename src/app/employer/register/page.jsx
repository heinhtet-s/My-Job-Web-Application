import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { IndustriesConst } from "@/lib/queryConst";
import { GetInsdustriesList } from "@/modules/services/industries";
import React from "react";
import RegisterComponent from "./registerComponent";

export default async function page() {
  try {
    const data = await odataQueryHandler(
      IndustriesConst,
      IndustriesConst.filter,
      IndustriesConst.order,
      IndustriesConst.fields,
      "no_child",
      { top: 10, skip: 0 },
      GetInsdustriesList
    );
   
    return <RegisterComponent data={data.value} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <RegisterComponent data={{ count: 0, value: [] }} />;
  }
}
