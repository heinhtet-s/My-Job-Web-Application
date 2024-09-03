// import {GetEmployerJobPostList} from '../modules/services/employer_jobposts'
// async function GetJobById(lists) {

//   if (lists.length === 0) {
//     return [];
//   }
//   let returnList = [];
//   for (let i = 0; i <= lists.length; i += 20) {
//     const target = lists.slice(i, 20);
//     let urlString = "";
//     for (let l of target) {
//       urlString =
//         urlString === "" ? `&$filter=id eq ${l}` : `${urlString} or id eq ${l}`;
//     }
// console.log(`?$select=Id,Title,JobType${urlString}`)
//     const titleList = await GetEmployerJobPostList(
//       `?$select=Id,Title,JobType,?$expand=Employer($select=CompanyName)&$expand=FunctionalArea($select=TitleEng${urlString})`
//     );

//     if (!titleList.error) {
//       returnList = [...returnList, ...titleList.value];
//     }
//   }
//   return returnList;
// }
// export  {GetJobById}
import { GetEmployerJobPostList } from '../modules/services/employer_jobposts';

async function GetJobById(lists) {
  if (lists.length === 0) {
    return [];
  }

  let returnList = [];
  for (let i = 0; i < lists.length; i += 20) {  
    const target = lists.slice(i, i + 20); 
    let urlString = "";
    for (let l of target) {
      urlString =
        urlString === "" ? `Id eq ${l}` : `${urlString} or Id eq ${l}`; 
    }

   
    
    const titleList = await GetEmployerJobPostList(
      `?$select=Id,Title,JobType&$expand=Employer($select=CompanyName)&$expand=FunctionalArea($select=TitleEng)&$filter=${urlString}`
    );

    if (!titleList.error) {
      returnList = [...returnList, ...titleList.value];
    }
  }
  return returnList;
}

export { GetJobById };

