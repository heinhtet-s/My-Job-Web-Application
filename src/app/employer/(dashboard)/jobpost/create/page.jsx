"use client";
import { inputStyle, labelStyle, selectStyle } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Switch } from "@/components/ui/switch";
import TinyEditor from "@/components/ui/TinyEditor";
import ApiReq from "@/lib/axiosHandler";
import { CareerLevel, Currency, EXPCONST, JobType } from "@/lib/const";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getGenerateData,
  createJobPost,
} from "../../../../../modules/services/jobPost_service";
import { getCurrentDate } from "@/lib/globalFunctions";
import { useRouter } from "next/navigation";
import loading from "@/app/(Seeker)/(web)/jobs/loading";
const JobUnitTypeConst = { 0: "Standard", 1: "Highlight", 2: "Spotlight" };
const page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    Anonymous: false,
  });

  const [industryList, setIndustryList] = useState([]);
  const [masterData, setMasterData] = useState({});
  const fetchMasterData = async () => {
    try {
      const masterData = await ApiReq.get(
        `/api/master/get?include=country,city,state,degreeLevels`
      );

      setMasterData(masterData.data);
    } catch (e) {}
  };
  const { data: session } = useSession();
  const [faList, setFaList] = useState([]);
  const getFunctionalArea = async () => {
    try {
      const data = await ApiReq.get("api/functional_area/get");
      setFaList(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getIndustry = async () => {
    try {
      const data = await ApiReq.get("api/Industry_list/get");
      console.log(data);
      setIndustryList(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getIndustry();
    fetchMasterData();
    getFunctionalArea();
  }, []);
  const [disableGenBtn, setDisableGenBtn] = useState(false);
  const makeAnonymous = watch("Anonymous");
  const router = useRouter();
  const handleGenerateAi = async () => {
    const JobUnitType = watch("JobUnitType");
    const makeAnonymous = watch("Anonymous");
    const FunctionalAreaId = watch("FunctionalAreaId");
    const Title = watch("Title");
    const IndustryId = watch("IndustryId");
    const JobType = watch("JobType");
    const YearsOfExperience = watch("YearsOfExperience");
    const Benefits = watch("Benefits");
    if (
      !JobUnitType ||
      !FunctionalAreaId ||
      !Title ||
      !IndustryId ||
      !JobType ||
      !YearsOfExperience ||
      !Benefits
    ) {
      toast.error("Please fill all require field to generate Ai ");
      return;
    }
    try {
      setDisableGenBtn(true);
      const data = await getGenerateData({
        Title,
        FunctionalAreaId,
        IndustryId,
        YearsOfExperience,
        Benefits,
        // EmployerId: session?.user?.Id,
        EmployerId: session?.user?.Id,
        JobUnitType: JobUnitType,
        jobType: JobType,
      });
      console.log(data);
      if (data?.error) {
        toast.error(e?.error || "Something Wrong");
      }
      toast.success("Generated Successfully");
      setValue("Description", data?.jobDescription);
      setValue("Requirement", data?.jobRequirements);
    } catch (e) {
      console.log(e?.response, "fff");
      toast.error(e?.error || "Something Wrong");
    } finally {
      setDisableGenBtn(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const datas = await createJobPost({
        ...data,
        // EmployerId: session?.user?.Id,
        EmployerId: session?.user?.Id,
        JobUnitType: JobUnitTypeConst[data?.JobUnitType],
        JobType: JobType?.filter((el) => {
          const [Id, label] = Object.entries(el)[0]; // Extract only the key (label)
          return label == data?.JobType; // Compare the label with data.JobType
        })?.map((el) => Object.keys(el)[0])?.[0],
        CreatedAt: getCurrentDate(),
        UpdatedAt: getCurrentDate(),
        CareerLevel: "NoExperience",
        HideSalary: false,
        NoOfPosition: 0,

        YearsOfExperience: data?.YearsOfExperience,

        Applie: false,
        RejectReason: null,
        JobStatus: "Pending",
        CreatedAt: getCurrentDate(),
        UpdatedAt: getCurrentDate(),
        // "CreatedAt": "2024-09-03T03:39:07.039555Z",
        // "UpdatedAt": "2024-09-03T03:39:07.039556Z",
        // "CreatedBy": null,
        // "UpdatedBy": null
        CreatedBy: session?.user?.Id,
        UpdatedBy: session?.user?.Id,
      });
      console.log(datas);
      router.push("/employer/jobpost");
    } catch (e) {
      toast.error("Something Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[38px] font-[700]">Post a Job</h1>
        <p className="opactiy-70 mb-[30px]">Add Your Job details</p>
        <div className=" grid grid-cols-12 mb-[10px] items-center gap-[15px]">
          <div className="col-span-12">
            <div className={JobPostCard}>
              <p className="text-[16px] mb-[0.5rem]">Select Job unit type </p>
              <div className="flex items-center gap-8">
                <div className="flex items-center">
                  <input
                    id="default-radio-0"
                    type="radio"
                    value="Standard"
                    {...register("JobUnitType", {
                      required: "This field is required",
                    })}
                    onChange={() => {
                      setValue("JobUnitType", "Standard");
                    }}
                    checked={watch("JobUnitType") === "Standard"}
                    name="default-radio"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0"
                  />
                  <label
                    htmlFor="default-radio-0"
                    className="ms-2 text-sm font-[300] text-gray-900"
                  >
                    Standard
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    {...register("JobUnitType", {
                      required: "This field is required",
                    })}
                    onChange={() => {
                      setValue("JobUnitType", "Highlight");
                    }}
                    checked={watch("JobUnitType") === "Highlight"}
                    type="radio"
                    value="Highlight"
                    name="default-radio"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-[300] text-gray-900"
                  >
                    Highlight
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    {...register("JobUnitType", {
                      required: "This field is required",
                    })}
                    onChange={() => {
                      setValue("JobUnitType", "Spotlight");
                    }}
                    checked={watch("JobUnitType") === "Spotlight"}
                    value="Spotlight"
                    name="default-radio"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-[300] text-gray-900"
                  >
                    Spotlight
                  </label>
                </div>
              </div>

              <label className="inline-flex items-center  cursor-pointer mt-[10px]">
                <input
                  type="checkbox"
                  {...register("Anonymous")}
                  className="sr-only peer"
                  checked={makeAnonymous}
                  value=""
                />
                <div className="relative w-[30px] h-[16px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[12px] after:h-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-[300] text-gray-900 dark:text-gray-300">
                  Make Anonymous
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className={JobPostCard}>
          <p className="text-[16px] mb-[0.5rem]">Job Related Information </p>
          <div className="mb-[15px]">
            <select
              className={selectStyle}
              {...register("FunctionalAreaId", {
                required: "This field is required",
              })}
            >
              <option value={""}>Select Functional Area</option>
              {faList?.map((el) => (
                <option value={el?.Id} key={el?.Id}>
                  {el?.TitleEng}
                </option>
              ))}
              {/* Populate with country options */}
            </select>
            {errors.FunctionalAreaId && (
              <p className="text-red-500 text-start text-xs italic">
                {errors.FunctionalAreaId.message}
              </p>
            )}
          </div>
          <div className=" grid grid-cols-12 mb-[10px] items-center gap-[15px]">
            <div className="col-span-6">
              <div className="mb-[15px]">
                <input
                  className={inputStyle}
                  placeholder="Job Title"
                  {...register("Title", { required: "This field is required" })}
                />
                {errors.Title && (
                  <p className="text-red-500 text-start text-xs italic">
                    {errors.Title.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-[15px]">
                <select
                  className={selectStyle}
                  {...register("IndustryId", {
                    required: "Industry  is required",
                  })}
                >
                  <option value={""}>Select Industry</option>
                  {industryList?.map((el) => (
                    <option value={el?.Id} key={el?.Id}>
                      {el?.TitleEng}
                    </option>
                  ))}
                  {/* Populate with country options */}
                </select>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-12 mb-[10px] items-center gap-[15px]">
            <div className="col-span-6">
              <div className="mb-[15px]">
                <select
                  className={selectStyle}
                  {...register("JobType", {
                    required: "This field is required",
                  })}
                >
                  <option value={""}>Select Job Type</option>
                  {JobType?.map((el) => {
                    return (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    );
                  })}
                  {/* Populate with country options */}
                </select>
                {errors.JobType && (
                  <p className="text-red-500 text-start text-xs italic">
                    {errors.JobType.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-[15px]">
                <select
                  className={selectStyle}
                  {...register("YearsOfExperience", {
                    required: "This field is required",
                  })}
                >
                  <option value={""}>Select Required Job Experience</option>
                  {EXPCONST?.map((el) => {
                    return (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    );
                  })}
                  {/* Populate with country options */}
                </select>
                {errors.YearsOfExperience && (
                  <p className="text-red-500 text-start text-xs italic">
                    {errors.YearsOfExperience.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <label className={labelStyle}>Employer Benefit</label>
          <TinyEditor
            text={watch("Benefits")}
            setTextEditor={(data) => {
              setValue("Benefits", data, { shouldValidate: true });
            }}
          />
          {errors.Benefits && (
            <p className="text-red-500 text-start text-xs italic">
              {errors.Benefits.message}
            </p>
          )}
          <input
            type="hidden"
            {...register("Benefits", {
              required: "Employer Benefit is required", // validation rule
            })}
          />
          {/* <input
            className={inputStyle}
            placeholder="Employer Benefit"
            {...register("Benefits", { required: "This field is required" })}
          />
          {errors.Benefits && (
            <p className="text-red-500 text-start text-xs italic">
              {errors.Benefits.message}
            </p>
          )} */}
        </div>
        <div className="mt-[20px]">
          <PrimaryBtn
            disable={disableGenBtn}
            fullWidth={true}
            type="button"
            text={
              disableGenBtn
                ? "Generating"
                : "Generate Description and Requirements with AI"
            }
            handleClick={handleGenerateAi}
          />
        </div>
        <div className={JobPostCard}>
          <p className="text-[16px] mb-[0.5rem]"> AI Generated Information</p>
          <div className="mb-[20px]">
            <label className={labelStyle}>description</label>
            <TinyEditor
              text={watch("Description")}
              setTextEditor={(data) => {
                setValue("Description", data);
              }}
            />
            {errors.Description && (
              <p className="text-red-500 text-start text-xs italic">
                {errors.Description.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("Description", {
                required: "This field is required", // validation rule
              })}
            />
          </div>
          <label className={labelStyle}>Requirement</label>
          <TinyEditor
            text={watch("Requirement")}
            setTextEditor={(data) => {
              setValue("Requirement", data);
            }}
          />
          {errors.Requirement && (
            <p className="text-red-500 text-start text-xs italic">
              {errors.Requirement.message}
            </p>
          )}
          <input
            type="hidden"
            {...register("Requirement", {
              required: "This field is required", // validation rule
            })}
          />
        </div>
        <div className={JobPostCard}>
          <p className="text-[16px] mb-[0.5rem]">Employee Information </p>
          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <select
                className={selectStyle}
                {...register("CareerLevel", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Career Level</option>
                {CareerLevel.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
                {/* Populate with country options */}
              </select>
              {errors.CareerLevel && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <select
                // defaultValue={personalData?.StateId}
                className={selectStyle}
                {...register("DegreeLevelId", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Required Degree Level</option>
                {masterData?.degreeLevels?.map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.TitleEng}
                  </option>
                ))}
              </select>
              {errors.DegreeLevelId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="mb-[20px]">
            <label className={labelStyle}>Skill</label>
            <TinyEditor
              text={watch("OtherSkill")}
              setTextEditor={(data) => {
                setValue("OtherSkill", data);
              }}
            />
            {errors.OtherSkill && (
              <p className="text-red-500 text-start text-xs italic">
                {errors.OtherSkill.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("OtherSkill", {
                required: "This field is required", // validation rule
              })}
            />
          </div>
          <p className="text-[16px] mb-[0.5rem]">Select Gender</p>
          <div className="flex  items-center  gap-8  ">
            <div className="flex items-center ">
              <input
                id="gender-1"
                type="radio"
                {...register("Gender", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("Gender", "Female");
                }}
                checked={watch("Gender") === "Female"}
                value=""
                name="gender"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 "
              />
              <label
                htmlFor="gender-1"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Female
              </label>
            </div>
            <div className="flex items-center ">
              <input
                id="gender-2"
                type="radio"
                {...register("Gender", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("Gender", "Male");
                }}
                checked={watch("Gender") === "Male"}
                value=""
                name="gender"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
              />
              <label
                htmlFor="gender-2"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Male
              </label>
            </div>
            <div className="flex items-center ">
              <input
                id="gender-3"
                type="radio"
                {...register("Gender", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("Gender", "Both");
                }}
                checked={watch("Gender") === "Both"}
                value=""
                name="gender"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
              />
              <label
                htmlFor="gender-3"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Both
              </label>
            </div>
          </div>
        </div>
        <div className={JobPostCard}>
          <p className="text-[16px] mb-[0.5rem]">Location Information </p>
          <div className="grid mb-[1.5rem] grid-cols-3 gap-4">
            <div className="col-span-1">
              <select
                className={selectStyle}
                {...register("CountryId", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Country</option>
                {masterData?.country?.map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.Name}
                  </option>
                ))}
                {/* Populate with country options */}
              </select>
              {errors.CountryId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <select
                // defaultValue={personalData?.StateId}
                className={selectStyle}
                {...register("StateId", { required: "This field is required" })}
              >
                <option value={""}>Select State</option>
                {masterData?.state
                  ?.filter((ele) => {
                    return ele?.CountryId == watch("CountryId");
                  })
                  .map((el) => (
                    <option value={el?.Id} key={el?.Id}>
                      {el?.Name}
                    </option>
                  ))}
              </select>
              {errors.StateId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <select
                className={selectStyle}
                // defaultValue={personalData?.CityId}
                {...register("CityId", { required: "This field is required" })}
              >
                <option value={""}>Select City</option>
                {masterData?.city
                  ?.filter((ele) => {
                    return ele?.StateId == watch("StateId");
                  })
                  .map((el) => (
                    <option value={el?.Id} key={el?.Id}>
                      {el?.Name}
                    </option>
                  ))}
                {/* Populate with city options */}
              </select>
              {errors.CityId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={JobPostCard}>
          <p className="text-[16px] mb-[0.5rem]">Salary Information </p>
          <div className="grid mb-[1.5rem] grid-cols-3 gap-4">
            <div className="col-span-1">
              <input
                type="number"
                className={inputStyle}
                placeholder="Salary From"
                {...register("Fromsalary", {
                  required: "This field is required",
                })}
              />

              {errors.Fromsalary && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <input
                type="number"
                className={inputStyle}
                placeholder="Salary To"
                {...register("Tosalary", {
                  required: "This field is required",
                })}
              />

              {errors.Tosalary && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <select
                className={selectStyle}
                // defaultValue={personalData?.CityId}
                {...register("Currency", {
                  required: "This field is required",
                })}
              >
                <option value={""}>Select Currency</option>
                {Currency.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
                {/* Populate with city options */}
              </select>
              {errors.Currency && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <p className="text-[16px] mb-[0.5rem]"> Select Salary Type</p>
          <div className="flex  items-center  gap-8  ">
            <div className="flex items-center ">
              <input
                id="salary-1"
                type="radio"
                {...register("SalaryOption", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("SalaryOption", "Confidential");
                }}
                checked={watch("SalaryOption") === "Confidential"}
                value=""
                name="salary"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 "
              />
              <label
                htmlFor="salary-1"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Confidential
              </label>
            </div>
            <div className="flex items-center ">
              <input
                id="salary-2"
                type="radio"
                {...register("SalaryOption", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("SalaryOption", "Nego");
                }}
                checked={watch("SalaryOption") === "Nego"}
                value=""
                name="salary"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
              />
              <label
                htmlFor="salary-2"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Negotiable
              </label>
            </div>
            <div className="flex items-center ">
              <input
                id="salary-3"
                type="radio"
                {...register("SalaryOption", {
                  required: "This field is required",
                })}
                onChange={() => {
                  setValue("SalaryOption", "PlusComission");
                }}
                checked={watch("SalaryOption") === "PlusComission"}
                value=""
                name="salary"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300  focus:ring-0  "
              />
              <label
                htmlFor="salary-3"
                className="ms-2 text-sm font-[300] text-gray-900 "
              >
                Plus Commission
              </label>
            </div>
          </div>
        </div>
        <PrimaryBtn
          disable={disableGenBtn && loading}
          // disable={disableGenBtn}
          fullWidth={true}
          text="Create"
          handleClick={() => {}}
        />
      </form>
    </div>
  );
};
const JobPostCard =
  "bg-white p-[1rem] mb-[20px] rounded-[15px] shadow-md shadow-black/5 ";
export default page;
