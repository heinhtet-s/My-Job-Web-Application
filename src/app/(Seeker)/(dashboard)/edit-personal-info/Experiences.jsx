import DeleteTableIcon from "@/asset/Icon/DeleteTableIcon";
import EditTableIcon from "@/asset/Icon/EditTableIcon";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import ApiReq from "@/lib/axiosHandler";
import { cn } from "@/lib/utils";
import { Modal } from "flowbite-react";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";

const Experiences = ({ masterData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [expInfo, setExpInfo] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log(masterData, "fweef");

  const handleSubmitApi = async (data) => {
    try {
      if (!selectedIndex) {
        await ApiReq.post("api/seeker_info/experiences_list/create", {
          ...data,
        });
        toast.success("Successfully Created");
      } else {
        await ApiReq.post("api/seeker_info/experiences_list/update", {
          ...data,
        });
        toast.success("Successfully Update");
      }
      setSelectedIndex(null);
      fetchExpData();
      setOpenModal(false);
    } catch (e) {
      toast.error("Somethings wrong.Please try again");
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      await ApiReq.post("api/seeker_info/experiences_list/delete", {
        id,
      });
      setSelectedIndex(null);
      fetchExpData();
      toast.success("Delete Successfully");
    } catch (e) {
      setSelectedIndex(null);
      toast.error("Somethings wrong.Please try again");
    }
  };
  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      text: "Delete Job Experience",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  const masterDataFormat = (data) => {
    return (
      masterData?.country?.filter((el) => el?.Id === data?.CountryId)?.[0]
        ?.Name ||
      "" +
        " " +
        masterData?.city?.filter((el) => el?.Id === data?.CityId)?.[0]?.Name ||
      ""
    );
  };
  const fetchExpData = async () => {
    try {
      const personalData = await ApiReq.get(
        `api/seeker_info/experiences_list/getById`
      );
      console.log(personalData);
      setExpInfo(personalData?.data);
      // setPersona(personalData.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchExpData();
  }, []);
  const handleClose = () => {
    setOpenModal(false);
    setSelectedIndex(null);
  };
  return (
    <>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Work Experiences </p>
          <p className="text-primary text-[16px]">
            Describe your previous and current working experiences
          </p>
        </div>
        <div className="col-span-8  grid-rows-1">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setOpenModal(true)}
              className="flex  h-fit items-center gap-[2px] text-primary font-[500] "
            >
              <Plus color="#F08000" /> Add Experience
            </button>
          </div>
          {expInfo?.map((el, index) => {
            return (
              <>
                <div className="flex border-b-2 mb-[20px]  pb-3 gap-2 justify-between border-gray-100">
                  <p className="text-primary  ">{el?.Title}</p>
                  <p className="font-[300] opacity-60 ">{el?.CompanyName}</p>
                  <p className="font-[300] opacity-60 ">
                    {masterDataFormat(el)}
                  </p>
                  <p className="text-primary ">
                    {moment(el?.StartDate).format("DD-MMM-YYYY")}
                    {" - "}
                    {moment(el?.EndDate).format("DD-MMM-YYYY")}
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => {
                        setSelectedIndex(index);
                        setOpenModal(true);
                      }}
                    >
                      <EditTableIcon />
                    </div>
                    <div
                      onClick={() => {
                        handleConfirmDelete(el?.Id);
                      }}
                    >
                      <DeleteTableIcon />
                    </div>
                  </div>
                </div>
                <p className="font-[300] opacity-60 mt-[5px] mb-[20px]">
                  {el?.JobDescription}
                </p>
              </>
            );
          })}
        </div>
      </div>
      <ExperiencesForm
        openModal={openModal}
        handleClose={handleClose}
        masterData={masterData}
        personalData={expInfo?.[selectedIndex]}
        handleSubmitApi={handleSubmitApi}
      />
    </>
  );
};
const ExperiencesForm = ({
  openModal,
  handleClose,
  handleSubmitApi,
  personalData,
  masterData,
}) => {
  console.log(personalData, "ffwe");
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: personalData,
  });
  useEffect(() => {
    if (personalData)
      reset({
        ...personalData,
        StartDate: personalData?.StartDate
          ? moment(personalData?.StartDate).format("YYYY-MM-DD")
          : personalData?.StartDate,
        EndDate: personalData?.EndDate
          ? moment(personalData?.EndDate).format("YYYY-MM-DD")
          : personalData?.EndDate,
      });
  }, [personalData]);
  const onSubmit = (data) => {
    handleSubmitApi(data);
  };
  return (
    <Modal dismissible show={openModal} onClose={handleClose}>
      <form
        className="flex-1 overflow-auto  relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Body className="rounded-[30px]">
          <h3 className="text-[1.5rem] font-[600] mb-[30px] mt-[15px]">
            {personalData?.Id ? "Edit" : "Add"} Word Experiences
          </h3>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Job Title <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("Title", { required: true })}
              />
              {errors.Title && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                Company Name <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("CompanyName", { required: true })}
              />
              {errors.CompanyName && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Country <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("CountryId", { required: true })}
              >
                <option>Select Country</option>
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
              <label className={labelStyle}>
                State <span className="text-red-800">*</span>
              </label>
              <select
                defaultValue={personalData?.StateId}
                className={selectStyle}
                {...register("StateId", { required: true })}
              >
                <option>Select State</option>
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
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                City <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                defaultValue={personalData?.CityId}
                {...register("CityId", { required: true })}
              >
                <option>Select City</option>
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
              {errors.TownshipId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(e) => {
                    console.log(e);
                    if (e) {
                      setValue("EndDate", null);
                    }
                    setValue("Active", e);
                  }}
                  id="airplane-mode"
                  checked={watch("Active")}
                />
                <Label htmlFor="airplane-mode">Currently Working?</Label>
              </div>
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                From <span className="text-red-800">*</span>
              </label>
              <input
                type="date"
                className={inputStyle}
                {...register("StartDate", { required: true })}
              />
              {errors.StartDate && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className={labelStyle}>
                To<span className="text-red-800">*</span>
              </label>
              <input
                type="date"
                className={inputStyle}
                disabled={watch("Active")}
                {...register("EndDate")}
              />
              {errors.EndDate && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelStyle}>
                Job Description<span className="text-red-800">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="JobDescription"
                className={inputStyle}
                {...register("JobDescription", { required: true })}
              />
              {errors.JobDescription && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-end">
          <button type="submit" className={cn(buttonStyle)}>
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default Experiences;
