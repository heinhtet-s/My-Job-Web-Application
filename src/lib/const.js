import { Facebook, Linkedin, Viber, Telegram, Youtube } from "lucide-react";
const CHILDREN_TABLES_HANDLER_ENUM = ["normal", "only_count", "no_child"];
const ORDER_ENUM = ["asc", "desc"];

const footer = [
  {
    id: 1,
    header: "Job Seekers",
    name: "Login",
    link: "login",
  },
  {
    id: 2,
    header: "Job Seekers",
    name: "Register",
    link: "register",
  },
  {
    id: 3,
    header: "Job Seekers",
    name: "Find Jobs",
    link: "findJobs",
  },
  {
    id: 4,
    header: "Job Seekers",
    name: "Upload CV with AI",
    link: "",
  },
  {
    id: 5,
    header: "Job Seekers",
    name: "Profile Showcase",
    link: "profileshowcase",
  },
  {
    id: 6,
    header: "Job Seekers",
    name: "FAQs",
    link: "faqs",
  },
  {
    id: 7,
    header: "Employer",
    name: "Employer Account",
    link: "employeraccount",
  },
  {
    id: 8,
    header: "Employer",
    name: "Publish a Job",
    link: "publish",
  },
  {
    id: 9,
    header: "Employer",
    name: "Employer Branding",
    link: "employerbranding",
  },
  {
    id: 10,
    header: "Employer",
    name: "Candidate Showcase",
    link: "candidateshowcase",
  },
  {
    id: 11,
    header: "About My Jobs",
    name: "Overviews",
    link: "",
  },
  {
    id: 12,
    header: "About My Jobs",
    name: "Carrier Opportunities",
    link: "",
  },
  {
    id: 13,
    header: "About My Jobs",
    name: "Contact My Jobs",
    link: "contact",
  },
  {
    id: 14,
    header: "About My Jobs",
    name: "Blogs",
    link: "blog",
  },
  {
    id: 15,
    header: "About My Jobs",
    name: "NewsLetter",
    link: "",
  },
  {
    id: 16,
    header: "About My Jobs",
    name: "About Us",
    link: "aboutus",
  },
  {
    id: 17,
    header: "About My Jobs",
    name: "Terms of Use",
    link: "terms",
  },
  {
    id: 18,
    header: "About My Jobs",
    name: "Privacy Policy",
    link: "privacy",
  },
  {
    id: 19,
    header: "About My Jobs",
    name: "Safe Job Hunting",
    link: "jobhunt",
  },
  {
    id: 20,
    header: "About My Jobs",
    name: "Testimonials",
    link: "",
  },
  {
    id: 21,
    header: "Contact Us",
    name: "info@myjobs.com.mm",
    link: "email",
  },

  {
    id: 22,
    header: "Contact Us",
    name: "+95 9880141136",
    link: "no1",
  },
  {
    id: 23,
    header: "Contact Us",
    name: "+95 9880141137",
    link: "no2",
  },
];

const socialLinks = [
  {
    id: 1,
    icon: <Facebook />,
    url: "https://www.facebook.com/MyJobsMyanmar",
  },
  {
    id: 2,
    icon: <Linkedin />,
    url: "https://www.linkedin.com/company/myjobsmyanmar/",
  },
  {
    id: 3,
    icon: <Viber />,
    url: "https://invite.viber.com/?g2=AQB5dKmasEkSskshfzPT9MHDsTXWrkyf6i0N4Kf82lz6%2B%2F7JOWfRKLpLLE7gvydu&lang=en",
  },
  {
    id: 4,
    icon: <Telegram />,
    url: "https://t.me/myjobsmyanmartelegram",
  },
  {
    id: 5,
    icon: <Youtube />,
    url: "https://www.youtube.com/@MyJobsMyanmarMyJobsMyanmar",
  },
];

const workTypes = [

  { label: "Contract", value: "Contract" },
  { label: "Full Time", value: "FullTime" },
  { label: "Part Time", value: "PartTime" },
  {label:"Internship",value:"internship"},
  {label:"Remote",value:"Remote"},
  {label:"Freelance",value:"Freelance"},
  {label:"Any Work Type",value:""},
  {label:"Other Work Type",value:""}
];

const chooseTime = [
  { label: "Select Work Type", value: "" },
  { label: "Last 3 days", value: "contract" },
  { label: "Last 7 days", value: "FullTime" },
  { label: "Last 24 days", value: "Part Time" },
  { label: "Last 30 days", value: "Part Time" },

];

export { CHILDREN_TABLES_HANDLER_ENUM, ORDER_ENUM, footer, socialLinks,workTypes,chooseTime };
