import { Facebook, Linkedin, Viber, Telegram, Youtube } from "lucide-react";
const CHILDREN_TABLES_HANDLER_ENUM = ["normal", "only_count", "no_child"];
const ORDER_ENUM = ["asc", "desc"];
const Currency = [
  "AED",
  "AF",
  "ALL",
  "ANG",
  "ARS",
  "AUD",
  "AWG",
  "AZ",
  "BAM",
  "BBD",
  "BG",
  "BMD",
  "BOB",
  "BRL",
  "BWP",
  "BYR",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CZK",
  "DKK",
  "DOP ",
  "EGP",
  "EUR",
  "FKP",
  "GBP",
  "GHC",
  "GIP",
  "GTQ",
  "GYD",
  "HNL",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JPY",
  "KGS",
  "KHR",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LTL",
  "LVL",
  "MKD",
  "MMK",
  "MNT",
  "MUR",
  "MX",
  "MYR",
  "MZ",
  "NAD",
  "NG",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PE",
  "PHP",
  "PKR",
  "PL",
  "PYG",
  "QAR",
  "RO",
  "RSD",
  "RUB",
  "SAR",
  "SBD",
  "SCR",
  "SEK",
  "SGD",
  "SHP",
  "SOS",
  "SRD",
  "SVC",
  "SYP",
  "THB",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "UAH",
  "USD",
  "UYU",
  "UZS",
  "VEF",
  "VND",
  "YER",
  "ZAR",
  "ZWD",
];

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
  { label: "Day Shift", value: "DayShift" },
  { label: "Night Shift", value: "NightShift" },
  { label: "Rotate", value: "Rotate" },
  { label: "Any Work Type", value: "null" },
];

const chooseTime = [
  { label: "Last 3 days", value: "Last 3 days" },
  { label: "Last 7 days", value: "Last 7 days" },
  { label: "Last 24 days", value: "Last 24 days" },
  { label: "Last 30 days", value: "Last 30 days" },
];

const OverSeaExperience = ["Never", "Repat", "Expat"];
const CareerLevel = [
  "Graduate Trainee",
  "Internship",
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Management Level",
  "Executive Level (C-Suit)",
  "No Experience",
  "Junior Level",
  "Specialist / Expert Level",
];
const PreferredLoaction = [
  "Sittwe",
  "Aunglan",
  "Arakan",
  "Bago",
  "Bhamo",
  "Bogale",
  "Chauk",
  "Dawei",
  "Falam",
  "Hinthada",
  "Hpa-an",
  "Kalay",
  "Taik Kyi",
  "Katha",
  "Khayan",
  "Keng Tung",
  "Kyaikkami",
  "Kyaiklat",
  "Kyaikto",
  "Kyaukse",
  "Labutta",
  "Lashio",
  "Letpadan",
  "Loikaw",
  "Magway",
  "Mandalay",
  "Mottama",
  "Maubin",
  "Mawlaik",
  "Mawlamyine",
  "Pyin Oo Lwin",
  "Meiktila",
  "Myeik",
  "Minbu",
  "Mogok",
  "Monywa",
  "Mawlamyinegyun",
  "Mudon",
  "Myanaung",
  "Myingyan",
  "Myitkyina",
  "Nyaunglebin",
  "Pakokku",
  "Pathein",
  "Paungde",
  "Pyapon",
  "Pyay",
  "Pyinmana",
  "Pyu",
  "Sagaing",
  "Shwebo",
  "Thanlyin",
  "Taungdwingyi",
  "Taunggyi",
  "Thanatpin",
  "Tharrawaddy",
  "Thaton",
  "Thayet",
  "Thongwa",
  "Toungoo",
  "Twantay",
  "Wakema",
  "Yamethin",
  "Nyaungdoon",
  "Yangon",
  "Yegyi",
  "Yenangyaung",
  "Nay Pyi Taw",
  "Kamaryut Township",
  "Kyauktada Township",
  "Kyimyindine Township",
  "Ahlone Township",
  "Bahan Township",
  "Botataung Township",
  "Dagon Myothit Seikkan Township",
  "Dagon Township",
  "Dala Township",
  "Dawbon Township",
  "East Dagon Township",
  "Hlaing Township",
  "Hlaingthaya Township",
  "Lanmadaw Township",
  "Latha Township",
  "Mayangon Township",
  "Mingala Taungnyunt Township",
  "Mingaladon Township",
  "North Okkalapa Township",
  "Pabedan Township",
  "Pazundaung Township",
  "Sanchaung Township",
  "Shwepyitha Township",
  "South Dagon Township",
  "South Okkalapa Township",
  "Tamwe Township",
  "Thaketa Township",
  "Thingangyun Township",
  "Yankin Township",
  "Hlegu",
  "Hmawbi",
  "Kyauktan",
  "Kawhmu",
  "North Dagon",
  "Insein Township",
  "Hakha",
];
const HighestQua = [
  "Bachelor Degree",
  "Master Degree",
  "Doctor of Philosophy (Ph.D.)",
  "Diploma",
  "Highschool",
  "Postgraduate",
  "Certificate",
  "Unspecified",
  "Higher National Diploma (HND)",
  "Bachelor of Medicine and Surgery (M.B.B.S)",
  "Others",
  "Vocational",
  "Post Graduate Diploma",
  "Higher Diploma",
  "Executive Diploma",
  "Advanced Diploma",
  "Bachelor of Arts (B.A)",
  "Bachelor of Science (B.Sc.)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Education (B.Ed.)",
  "Bachelor of Computer Science (B.C.Sc.)",
  "Bachelor of Computer Technology (B.C.Tech)",
  "Bachelor of Agricultural Science (B.Agr.Sc.)",
  "Bachelor of Technology (B.Tech)",
  "Master of Architecture (M.Arch)",
  "Master of Computer Science (M.C.Sc.)",
  "Master of Computer Technology (M.C.Tech)",
  "Master of Medical Technology (M.Med.Tech.)",
  "Master of Agricultural Science (M.Agr.Sc.)",
  "Master of Medical Science (M.Med.Sci.)",
  "Master of Science (M.Sc)",
];
const EXPCONST = [
  "Fresh",
  "No Experience/Less than 1 year",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 years",
  "mid level",
  "fresher",
  "12 years",
  "More than 20 years",
  "20 years",
  "19 years",
  "18 years",
  "17 years",
  "16 years",
  "15 years",
  "14 years",
  "13 years",
  "11 years",
];

const JobType = [
  "PartTime",
  "FullTime",
  "Contract",
  "Freelance",
  "DayShift",
  "NightShift",
  "Rotate",
];
export {
  CHILDREN_TABLES_HANDLER_ENUM,
  ORDER_ENUM,
  footer,
  socialLinks,
  workTypes,
  chooseTime,
  EXPCONST,
  Currency,
  JobType,
  HighestQua,
  PreferredLoaction,
  CareerLevel,
  OverSeaExperience,
};
