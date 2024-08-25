import { odataQueryHandler } from "@/lib/apiQueryHandler";
import {
  SeekersConst,
  EmployersConst,
  IndustriesConst,
  EmployerJobPosts,
} from "@/lib/queryConst";
import { GetSeekerList } from "@/modules/services/seeker_service";
import { GetEmployersList } from "@/modules/services/employer_service";
import { GetInsdustriesList } from "@/modules/services/industries";
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
import HomePage from "./home";


export default async function Home() {
  try {
 
    const [candidates,companies, industries,jobPosts] = await Promise.all([
      odataQueryHandler(
        SeekersConst,
        SeekersConst.filter,
        SeekersConst.order,
        SeekersConst.fields,
        "no_child",
        { top: 10, skip: 0 },
        GetSeekerList
      ),
      odataQueryHandler(
        EmployersConst,
        EmployersConst.filter,
        EmployersConst.order,
        EmployersConst.fields,
        "no_child",
        { top: 10, skip: 0 },
        GetEmployersList
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
        { top: 10, skip: 0 },
        GetEmployerJobPostList
      )

      // odataQueryHandler(
      //   ThirdConst,
      //   ThirdConst.filter,
      //   ThirdConst.order,
      //   ThirdConst.fields,
      //   "no_child",
      //   { top: 10, skip: 0 },
      //   GetThirdList
      // ),
      // odataQueryHandler(
      //   FourthConst,
      //   FourthConst.filter,
      //   FourthConst.order,
      //   FourthConst.fields,
      //   "no_child",
      //   { top: 10, skip: 0 },
      //   GetFourthList
      // ),
    ]);
  
console.log(jobPosts.value)
    return (
      <HomePage
        companies={companies.value}
        candidates={candidates.value}
        industries={industries.value}
       jobPosts ={jobPosts.value}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);

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
