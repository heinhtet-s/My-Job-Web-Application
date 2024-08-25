// import { odataQueryHandler } from "@/lib/apiQueryHandler";
// import { SeekersConst } from "@/lib/queryConst";
// import { GetSeekerList } from "@/modules/services/seeker_service";
// export default async function TestLists() {
//   const data = await odataQueryHandler(
//     SeekersConst,
//     SeekersConst.filter,
//     SeekersConst.order,
//     SeekersConst.fields,
//     "no_child",
//     { top: 10, skip: 0 },
//     GetSeekerList
//   );
//   console.log(data);
// }


import { odataQueryHandler } from "@/lib/apiQueryHandler";
import {  EmployerJobPosts } from "@/lib/queryConst";
import {GetEmployerJobPostList} from '@/modules/services/employer_jobposts'

export default async function TestLists() {
  const data = await odataQueryHandler(
    EmployerJobPosts,
    EmployerJobPosts.filter,
    EmployerJobPosts.order,
    EmployerJobPosts.fields,
    "no_child",
    { top: 10, skip: 0 },
    
    GetEmployerJobPostList
  );
  console.log(data);
}
