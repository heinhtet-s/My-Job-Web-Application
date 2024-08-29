import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { EmployerJobPosts } from "@/lib/queryConst";
import { GetEmployerJobPostList } from "@/modules/services/employer_jobposts";
import JobPostPage from "./body";

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

    return <JobPostPage data={data.value} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <JobPostPage data={{ count: 0, value: [] }} />;
  }
}
