import axios from "axios";
import { EmployerJobPostURL } from "../../lib/apiConst";
import { REQUEST_HEADER } from "../../lib/config";

async function GetEmployerJobPostList(url) {

  return await axios
    .get(encodeURI(`${EmployerJobPostURL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
    
      return { error: "Client and server connection error" };
    });
}

export { GetEmployerJobPostList };


// https://myjobs.dev/employer/v1/JobPosts?$count=true&$select=Title,Description,Requirement,CountryId,TownshipId,CityId,JobType,CareerLevel,Benefits,Fromsalary,Tosalary,HideSalary,Anonymous,SalaryOption,Currency,NoOfPosition,Gender,YearsOfExperience,OtherSkill,Active,Applie,RejectReason,JobStatus,DegreelevelId,JobUnitType,FunctionalAreaId,EmployerId,CreatedAt,UpdatedAt,CreatedBy,UpdatedBy&$expand=Employer($select=CompanyName;$filter=contains(CompanyName,'TechCorp');$orderBy=updatedAt desc;$top=10;$skip=0)&$filter=contains(Title,'Engineer') and JobType eq 'FullTime'&$orderBy=updatedAt desc&$top=10&$skip=0
// https://myjobs.dev/employer/v1/JobPosts?$count=true&$select=Title,Description,Requirement,CountryId,TownshipId,CityId,JobType,CareerLevel,Benefits,Fromsalary,Tosalary,HideSalary,Anonymous,SalaryOption,Currency,NoOfPosition,Gender,YearsOfExperience,OtherSkill,Active,Applie,RejectReason,JobStatus,DegreelevelId,JobUnitType,FunctionalAreaId,EmployerId,CreatedAt,UpdatedAt,CreatedBy,UpdatedBy&$expand=Employer($select=CompanyName;$orderBy=updatedAt desc;$top=10;$skip=0)&$orderBy=updatedAt desc&$top=10&$skip=0