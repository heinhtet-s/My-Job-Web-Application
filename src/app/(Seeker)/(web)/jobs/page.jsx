import { odataQueryHandler } from "@/lib/apiQueryHandler";
import {
  EmployerJobPosts,
  FunctionalAreasConst,
  IndustriesConst,
} from "@/lib/queryConst";
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
import JobPostPage from "./body";
import { GetInsdustriesList } from "@/modules/services/industries";
import { GetFunctionalAreaLists } from "@/modules/services/employer_service";

export default async function page() {
  try {
    const industries = await odataQueryHandler(
      IndustriesConst,
      IndustriesConst.fields,
      IndustriesConst.order,
      IndustriesConst.fields,
      "no_child",
      { top: 100, skip: 0 },
      GetInsdustriesList
    );
    const functionalAreas = await odataQueryHandler(
      FunctionalAreasConst,
      FunctionalAreasConst.fields,
      FunctionalAreasConst.order,
      FunctionalAreasConst.fields,
      "no_child",
      { top: 100, skip: 0 },
      GetFunctionalAreaLists
    );

    return (
      <JobPostPage industries={industries} functionalAreas={functionalAreas} />
    );
  } catch (error) {
    return <JobPostPage data={{ count: 0, value: [] }} />;
  }
}
