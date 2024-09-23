import { odataQueryHandler } from "@/lib/apiQueryHandler";
import {
  SeekersConst,
  EmployersConst,
  IndustriesConst,
  EmployerJobPosts,
  FunctionalAreasConst,
} from "@/lib/queryConst";
import { GetSeekerList } from "@/modules/services/seeker_service";
import {
  GetEmployersList,
  GetFunctionalAreaLists,
} from "@/modules/services/employer_service";
import { GetInsdustriesList } from "@/modules/services/industries";
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
import HomePage from "./home";

export default async function Home() {
  try {
    const [candidates, industries, jobPosts, functionalAreas] =
      await Promise.all([
        odataQueryHandler(
          SeekersConst,
          SeekersConst.filter,
          SeekersConst.order,
          SeekersConst.fields,
          "normal",
          { top: 10, skip: 0 },
          GetSeekerList
        ),
        odataQueryHandler(
          IndustriesConst,
          IndustriesConst.filter,
          IndustriesConst.order,
          IndustriesConst.fields,
          "no_child",
          { top: 10, skip: 0 },
          GetInsdustriesList
        ),
        odataQueryHandler(
          EmployerJobPosts,
          EmployerJobPosts.filter,
          EmployerJobPosts.order,
          EmployerJobPosts.fields,
          "normal",
          { top: 100, skip: 0 },
          GetEmployerJobPostList
        ),
        odataQueryHandler(
          FunctionalAreasConst,
          FunctionalAreasConst.fields,
          FunctionalAreasConst.order,
          FunctionalAreasConst.fields,
          "no_child",
          { top: 100, skip: 0 },
          GetFunctionalAreaLists
        ),
      ]);
    return (
      <HomePage
        candidates={candidates.value}
        industries={industries.value}
        jobPosts={jobPosts.value}
        functionalAreas={functionalAreas.value}
      />
    );
  } catch (error) {
    return (
      <HomePage
        data1={{ count: 0, value: [] }}
        data2={{ count: 0, value: [] }}
        data3={{ count: 0, value: [] }}
        data4={{ count: 0, value: [] }}
      />
    );
  }
}
