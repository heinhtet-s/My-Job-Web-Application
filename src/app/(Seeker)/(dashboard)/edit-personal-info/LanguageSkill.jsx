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
const spokenLanguages = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "Arabic",
  "Bengali",
  "Burmese",
  "Portuguese",
  "Russian",
  "Japanese",
  "German",
  "French",
  "Italian",
  "Turkish",
  "Korean",
  "Vietnamese",
  "Polish",
  "Dutch",
  "Thai",
  "Persian (Farsi)",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Hebrew",
  "Hungarian",
  "Czech",
  "Romanian",
  "Malay",
  "Swahili",
  "Ukrainian",
  "Bulgarian",
];
const Level = ["Beginner", "Intermediate", "Advance"];

const LanguageSkill = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSkillModal, setOpenSkillModal] = useState(false);

  const [expInfo, setExpInfo] = useState([]);
  const [skillInfo, setskillInfo] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSubmitApi = async (data) => {
   
    try {
      if (selectedIndex === null) {
        await ApiReq.post("api/seeker_info/languate_list/create", {
          ...data,
        });
        toast.success("Successfully Created");
      } else {
        await ApiReq.post("api/seeker_info/languate_list/update", {
          ...data,
        });
        toast.success("Successfully Update");
      }
      setSelectedIndex(null);
      fetchLangData();
      setOpenModal(false);
    } catch (e) {
      toast.error("Somethings wrong.Please try again");
     
    }
  };
  const handleSubmitSkillApi = async (data) => {
    try {
      if (selectedIndex === null) {
        await ApiReq.post("api/seeker_info/skill_list/create", {
          ...data,
        });
        toast.success("Successfully Created");
      } else {
        await ApiReq.post("api/seeker_info/skill_list/update", {
          ...data,
        });
        toast.success("Successfully Update");
      }
      setSelectedIndex(null);
      fetchSkillData();
      setOpenSkillModal(false);
    } catch (e) {
      toast.error("Somethings wrong.Please try again");
      
    }
  };
  const handleDelete = async (Id) => {
    try {
      await ApiReq.post("api/seeker_info/languate_list/delete", {
        Id,
      });
      setSelectedIndex(null);
      fetchLangData();
      toast.success("Delete Successfully");
    } catch (e) {
      setSelectedIndex(null);
      toast.error("Somethings wrong.Please try again");
    }
  };
  const handleDeleteSkill = async (Id) => {
    try {
      await ApiReq.post("api/seeker_info/skill_list/delete", {
        Id,
      });
      setSelectedIndex(null);
      fetchSkillData();
      toast.success("Delete Successfully");
    } catch (e) {
      setSelectedIndex(null);
      toast.error("Somethings wrong.Please try again");
    }
  };
  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Delete ",
      text: "Do you want to delete? ",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  const handleConfirmSkillDelete = (id) => {
    Swal.fire({
      title: "Delete ",
      text: "Do you want to delete? ",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDeleteSkill(id);
      }
    });
  };
  const fetchLangData = async () => {
    try {
      const personalData = await ApiReq.get(
        `api/seeker_info/languate_list/getById`
      );

      setExpInfo(personalData?.data);
      // setPersona(personalData.data);
    } catch (e) {}
  };
  const fetchSkillData = async () => {
    try {
      const personalData = await ApiReq.get(
        `api/seeker_info/skill_list/getById`
      );

      setskillInfo(personalData?.data);
      // setPersona(personalData.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchLangData();
    fetchSkillData();
  }, []);
  const handleClose = () => {
    setOpenModal(false);
    setSelectedIndex(null);
  };
  const handleSkillClose = () => {
    setOpenSkillModal(false);
    setSelectedIndex(null);
  };
  return (
    <>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Languages </p>
        </div>
        <div className="col-span-5 grid-rows-1    ">
          {expInfo?.map?.((el, index) => {
            return (
              <div className="bg-[#E6F0F9] flex  mb-[20px] px-[4px] rounded-[30px] py-[5px]">
                <p className="flex-1 text-center">{el?.LanguageName}</p>
                <p className="flex-1 text-center">{el?.LanguageLevel}</p>
                <p className="flex-1 text-center">
                  <span
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpenModal(true);
                    }}
                  >
                    Edit{" "}
                  </span>
                  |
                  <span
                    onClick={() => {
                      handleConfirmDelete(el?.Id);
                    }}
                  >
                    {" "}
                    Delete
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="col-span-3  grid-rows-1 flex justify-center">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className="flex h-fit items-center gap-[2px] text-primary font-[500] "
          >
            <Plus color="#F08000" />
            Add Language
          </button>
        </div>
      </div>
      <div className="grid  grid-rows-1 grid-cols-12 gap-8 mb-[40px] ">
        <div className="col-span-4  grid-rows-1">
          <p className="mb-[10px] text-[20px]">Skills </p>
        </div>

        <div className="col-span-5 grid-rows-1   ">
          {skillInfo?.map?.((el, index) => (
            <div className="bg-[#E6F0F9]  px-[4px]  mb-[20px] flex  rounded-[30px] py-[5px]">
              <p className="flex-1 text-center">{el?.Name}</p>

              <p className="flex-1 text-center">
                <span
                  onClick={() => {
                    setSelectedIndex(index);
                    setOpenSkillModal(true);
                  }}
                >
                  Edit{" "}
                </span>
                |
                <span
                  onClick={() => {
                    handleConfirmSkillDelete(el?.Id);
                  }}
                >
                  {" "}
                  Delete
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="col-span-3  grid-rows-1 flex justify-center">
          <button
            onClick={() => {
              setOpenSkillModal(true);
            }}
            className="flex h-fit items-center gap-[2px] text-primary font-[500] "
          >
            <Plus color="#F08000" />
            Add Skill
          </button>
        </div>
      </div>
      <LanguageForm
        openModal={openModal}
        handleClose={handleClose}
        personalData={expInfo?.[selectedIndex]}
        handleSubmitApi={handleSubmitApi}
      />
      <SkillForm
        openModal={openSkillModal}
        handleClose={handleSkillClose}
        personalData={skillInfo?.[selectedIndex]}
        handleSubmitApi={handleSubmitSkillApi}
      />
    </>
  );
};
const LanguageForm = ({
  openModal,
  handleClose,
  handleSubmitApi,
  personalData,
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
    if (personalData) {
      reset({
        ...personalData,
      });
    } else {
      reset({
        LanguageForm: "",
        LanguageSkill: "",
      });
    }
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
            {personalData?.Id ? "Edit" : "Add"} Language
          </h3>

          <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className={labelStyle}>
                Language <span className="text-red-800">*</span>
              </label>
              <select
                className={selectStyle}
                {...register("LanguageName", { required: true })}
              >
                <option>Select Language</option>
                {spokenLanguages?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.LanguageName && (
                <p className="text-red-800 text-[13px] mt-[2px]">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className={labelStyle}>
                Language Level <span className="text-red-800">*</span>
              </label>
              <select
                defaultValue={personalData?.LanguageLevel}
                className={selectStyle}
                {...register("LanguageLevel", { required: true })}
              >
                <option>Select Language Level</option>
                {Level.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
              {errors.LanguageLevel && (
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
const SkillForm = ({
  openModal,
  handleClose,
  handleSubmitApi,
  personalData,
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
            <div className="col-span-2">
              <label className={labelStyle}>
                Name <span className="text-red-800">*</span>
              </label>
              <input
                className={inputStyle}
                {...register("Name", { required: true })}
              />
              {errors.Name && (
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
export default LanguageSkill;
