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

const Education = ({ masterData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [expInfo, setExpInfo] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSubmitApi = async (data) => {
    try {
      if (selectedIndex === null) {
        await ApiReq.post("api/seeker_info/education_list/create", {
          ...data,
        });
        toast.success("Successfully Created");
      } else {
        await ApiReq.post("api/seeker_info/education_list/update", {
          ...data,
        });
        toast.success("Successfully Update");
      }
      setSelectedIndex(null);
      fetchExpData();
      setOpenModal(false);
    } catch (e) {
      toast.error("Somethings wrong.Please try again");
    }
  };
  const handleDelete = async (id) => {
    try {
      await ApiReq.post("api/seeker_info/education_list/delete", {
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
        `api/seeker_info/education_list/getById`
      );

      setExpInfo(personalData?.data);
      // setPersona(personalData.data);
    } catch (e) {}
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
          <p className="mb-[10px] text-[20px]">Education </p>
          <p className="text-primary text-[16px]">
            Describe your education background
          </p>
        </div>
        <div className="col-span-8  grid-rows-1">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setOpenModal(true)}
              className="flex  h-fit items-center gap-[2px] text-primary font-[500] "
            >
              <Plus color="#F08000" /> Add Education
            </button>
          </div>

          {expInfo?.map((el, index) => {
            return (
              <div className="flex border-b-2  pb-3 gap-2 justify-between border-gray-100">
                <p className="text-primary  h-fit  ">{el?.Title}</p>
                <p className="font-[300] opacity-60 h-fit  ">
                  {el?.University}
                </p>
                <p className="text-primary min-w-[80px] h-fit ">
                  {el?.Active ? "current" : moment(el?.EndDate)?.format("YYYY")}
                </p>
                <div className="flex items-center gap-2 h-fit cursor-pointer">
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
            );
          })}
        </div>
      </div>
      <EduForm
        openModal={openModal}
        handleClose={handleClose}
        masterData={masterData}
        personalData={expInfo?.[selectedIndex]}
        handleSubmitApi={handleSubmitApi}
      />
    </>
  );
};
const EduForm = ({
  openModal,
  handleClose,
  handleSubmitApi,
  personalData,
  masterData,
}) => {
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
  }, [personalData, masterData]);
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
            {personalData?.Id ? "Edit" : "Add"} Education
          </h3>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Title <span className="text-red-800">*</span>
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
                Name of university/School{" "}
                <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("University", { required: true })}
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
                Degree Level <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("DegreeLevelId", { required: true })}
              >
                <option>Select Degree Level</option>
                {masterData?.degreeLevels?.map((el) => (
                  <option value={el?.Id} key={el?.Id}>
                    {el?.Title}
                  </option>
                ))}
                {/* Populate with country options */}
              </select>
              {errors.DegreeLevelId && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className={labelStyle}>
                Major subject <span className="text-red-800">*</span>
              </label>
              <select
                defaultValue={personalData?.DegreeTypeId}
                className={selectStyle}
                {...register("DegreeTypeId", { required: true })}
              >
                <option>Select Major Subject</option>
                {masterData?.degreeTypes
                  ?.filter((ele) => {
                    return ele?.DegreelevelId == watch("DegreeLevelId");
                  })
                  .map((el) => (
                    <option value={el?.Id} key={el?.Id}>
                      {el?.Title}
                    </option>
                  ))}
              </select>
              {errors.DegreeTypeId && (
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
                    if (e) {
                      setValue("EndDate", null);
                    }
                    setValue("Active", e);
                  }}
                  id="airplane-mode"
                  checked={watch("Active")}
                />
                <Label htmlFor="airplane-mode">Currently Study?</Label>
              </div>
            </div>
          </div>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
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
export default Education;
