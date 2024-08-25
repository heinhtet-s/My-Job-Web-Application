const SeekersConst = {
  fields: [
    "FirstName",
    "LastName",
    "Email",
    "PhoneNum",
    "FatherName",
    "ContactPhoneNumber",
    "CountryId",
    "CityId",
    "TownshipId",
    "LoginType",
    "LastLogin",
    "Gender",
    "DateOfBirth",
    "Address",
    "MaritalStatus",
    "UploadCv",
    "Nationality",
    "ImageUrl",
    "About",
    "FromSalary",
    "ToSalary",
    "SalaryNegotiable",
    "ProfileCompletion",
    "ProjectUrl",
    "AboutMe",
    "CreatedAt",
    "UpdatedAt",
    " CreatedBy",
    "UpdatedBy",
  ],
  filter: {},
  order: { updatedAt: "desc" },
  children: [],
  top: 10,
  skip: 0,
};

const EmployersConst = {
  fields: [
    "CompanyName",
    "ContactPersonName",
    "Email",
    "PhoneNum",
  
    "LoginType",
    "CompanyPhoneNum",
    "CompanyLogo",
    "NumberOfOffice",
    "NumberOfEmployee",
    "OwnershipType",
    "EstablishedIn",
    "WebsiteAddress",
    "CountryId",
    "TownshipId",
    "CityId",
    "MapAddress",
    "About",
    "FacebookLink",
    "LinkedIn",
    "Viber",
    "Telegram",
    "FirebaseUserId",
    "IsExpiredAt",
    "Status",
    "ViewProfileByPublic",
    "Subscribed",
    "Verified",
    "IndustryId",
    "ShowLogo",
    "CreatedAt",
    "UpdatedAt",
    "CreatedBy",
    "UpdatedBy",
  ],
  filter: {},
  order: { updatedAt: "desc" },
  children: [],
  top: 10,
  skip: 0,
};

const EmployerConst = {
  fields: ["CompanyName"],
  filter: {},
  order: { updatedAt: "desc" },
  childrens: [],
  top: 10,
  skip: 0,
};

const EmployerJobPosts = {
  fields: [
    "Title",
    "Description",
    "Requirement",
    "CountryId",
    "TownshipId",
    "CityId",
    "JobType",
    "CareerLevel",
    "Benefits",
    "Fromsalary",
    "Tosalary",
    "HideSalary",
    "Anonymous",
    "SalaryOption",
    "Currency",
    "NoOfPosition",
    "Gender",
    "YearsOfExperience",
    "OtherSkill",
    "Active",
    "Applie",
    "RejectReason",
    "JobStatus",
    "DegreelevelId",
    "JobUnitType",
    // "JobSummary",
    "FunctionalAreaId",
    "EmployerId",
    "CreatedAt",
    "UpdatedAt",
    "CreatedBy",
    "UpdatedBy",
  ],
  filter: {},
  order: { updatedAt: "desc" },
  children: [
    {
      name: "Employer",
      type: "no_child",
      data: EmployerConst,
    },
  ],
  top: 10,
  skip: 0,
};

const IndustriesConst = {
  fields: [
    "Title",
    "TitleEng",
    "Id",
    "CreatedAt",
    "UpdatedAt",
    "CreatedBy",
    "UpdatedBy",
  ],
  filter: {},
  order: { updatedAt: "desc" },
  children: [],
  top: 10,
  skip: 0,
};

export { SeekersConst, EmployersConst, EmployerJobPosts,IndustriesConst };
