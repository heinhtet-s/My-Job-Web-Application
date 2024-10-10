import { Seeker_API } from "./config";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const SeekersURL = `${baseUrl}/seeker/v1/Seekers`;
const EmployersURL = `${baseUrl}/employer/v1/Employers`;
const EmployerJobPostURL = `${baseUrl}/employer/v1/JobPosts`;
const IndustriesURL = `${baseUrl}/employer/v1/Industries`;
const SeekerAuth = `${baseUrl}/seeker/v1/Logins/`;
const EmployeerAuth = `${baseUrl}/employer/v1/Auth`;
const FunctionalAreaURL = `${baseUrl}/employer/v1/FunctionalAreas`;
const SeekerInfo = `${baseUrl}/seeker/v1/`;
const EmployerInfo = `${baseUrl}/employer/v1/`;
const MasterdataURL = `${baseUrl}/master/v1`;
const UploadCVURL = `${baseUrl}/seeker/v1/UploadCvs/upload`;
const GetCvURl = `${baseUrl}/seeker/v1/UploadCvs/download`;
const GeneratedCVURL = `${baseUrl}/seeker/v1/CVs`;
const AppliedJobPostURL = `${baseUrl}/seeker/v1/AppliedJobPosts`;
const PackageURL = `${baseUrl}/subscription/v1`;
const BlogURL = `${baseUrl}/content/v1`;
const ViewCoutURL = `${baseUrl}/employer/v1/ViewCounts`;
export {
  BlogURL,
  PackageURL,
  GetCvURl,
  SeekerInfo,
  EmployerInfo,
  SeekersURL,
  ViewCoutURL,
  EmployerJobPostURL,
  EmployersURL,
  IndustriesURL,
  SeekerAuth,
  EmployeerAuth,
  FunctionalAreaURL,
  MasterdataURL,
  UploadCVURL,
  GeneratedCVURL,
  AppliedJobPostURL,
};
