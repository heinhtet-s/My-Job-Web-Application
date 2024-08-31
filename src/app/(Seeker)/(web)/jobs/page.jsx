import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { EmployerJobPosts, FunctionalAreasConst, IndustriesConst } from "@/lib/queryConst";
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
import JobPostPage from "./body";
import { GetInsdustriesList } from "@/modules/services/industries";
import { GetFunctionalAreaLists } from "@/modules/services/employer_service";

export default async function JobPost() {


  try {
    const data = await odataQueryHandler(
      EmployerJobPosts,
      EmployerJobPosts.filter,
      EmployerJobPosts.order,
      EmployerJobPosts.fields,
      "normal",
      { top: 10, skip: 0 },
      GetEmployerJobPostList
    );
    const industries = await odataQueryHandler(IndustriesConst,IndustriesConst.fields,IndustriesConst.order,IndustriesConst.fields,"no_child",   { top: 10, skip: 0 },GetInsdustriesList)
    const functionalAreas = await odataQueryHandler(FunctionalAreasConst,FunctionalAreasConst.fields,FunctionalAreasConst.order,FunctionalAreasConst.fields,"no_child",   { top: 10, skip: 0 },GetFunctionalAreaLists)
   console.log(data,"DATA")

    return <JobPostPage data={data.value} industries={industries} functionalAreas={functionalAreas}/>;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <JobPostPage data={{ count: 0, value: [] }} />;
  }
}



// https://myjobs.dev/employer/v1/JobPosts?$count=true&$select=Title,Id,Description,Requirement,CountryId,TownshipId,CityId,JobType,CareerLevel,Benefits,Fromsalary,Tosalary,HideSalary,Anonymous,SalaryOption,Currency,NoOfPosition,Gender,YearsOfExperience,OtherSkill,Active,Applie,RejectReason,JobStatus,DegreelevelId,JobUnitType,FunctionalAreaId,EmployerId,CreatedAt,UpdatedAt,CreatedBy,UpdatedBy&$expand=Employer($select=CompanyName;$orderBy=updatedAt desc;$top=10;$skip=0)&$expand=FunctionalArea($select=Title,TitleEng,Id,CreatedAt,UpdatedAt,CreatedBy,UpdatedBy;$orderBy=updatedAt desc;$top=10;$skip=0)&$filter=FunctionalAreaId eq 49e58d80-d5c4-4c6e-8751-ee06b8cac45c&$orderBy=updatedAt desc&$top=10&$skip=0