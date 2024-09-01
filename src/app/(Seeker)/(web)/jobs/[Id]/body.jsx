"use client";
import CardLayout from "@/components/share/CardLayout";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Heart, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ModalBox from "@/components/ui/CustomModal";
import { Button, Modal } from "flowbite-react";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import axios from "axios";
import { UploadCv } from "@/modules/services/auth";

const JobDetailComponent = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { Id: JobId } = params
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const seerkerId = data?.Id;
  const router = useRouter()
  const EmployerId = data.EmployerId
console.log(data.EmployerId)
const imageURLfromUpload ="seeker/167553d6-a4bd-4c22-89a2-2a2c7fa215e2/20240901163848_Profile.pdf"

  if (!seerkerId) {
    router.push('/login')
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleApplyNow = async () => {
    // if (!selectedFile) {
    //   alert("Please select a CV file.");
    //   return;
    // }
  
    // const formData = new FormData();
    // formData.append("file", selectedFile);
    
    try {
      
      // const uploadResponse = await UploadCv({ file: formData }, '167553d6-a4bd-4c22-89a2-2a2c7fa215e2');
      
  
      // Now, use the URL to create a CV
      const response = await axios.post('/api/generate_cv/create', { imageUrl: imageURLfromUpload });
      const appliedJob = await axios.post('/api/appliedJobpost/create',{JobId,EmployerId,})
      // console.log(response.data);
      console.log(appliedJob)
      
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <div>
      <Modal
        show={openModal}
        className="rounded-3xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="font-[600]">Apply Now</Modal.Header>
        <Modal.Body>
          <div className="space-y-3">
            <p className=" leading-relaxed font-[600] text-[20px]">
              {data?.Title}
            </p>
            <p className=" text-[13px]  leading-relaxed ">
              Your default CV attachment is ready to apply
            </p>
            <div className=" grid grid-cols-12 items-center gap-[15px]">
              <div className="col-span-5">
                <select
                  id="countries"
                  class=" border border-[#ced4da]   bg-white text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ring-0 "
                >
                  <option selected value={null}>
                    Select CV
                  </option>
                </select>
              </div>
              <div className="col-span-2 text-[13px] text-center">OR</div>
              <div className="col-span-5">
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center my-10">
            <button
              onClick={handleApplyNow}
              className="bg-primary text-white text-[18px] font-medium px-10 py-1.5 transition-[background-color] rounded-full"
            >
              Apply Now
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
      <CardLayout>
        <div className="mx-[-15px] flex justify-center">
          <div className="w-3/4">
            <div className="relative">
              <img
                className="h-[400px] mt-[50px] rounded-[20px] w-full"
                src="/image/banner3.png"
              />
              <div>
                <img
                  className="w-[114px] h-[114px] mx-auto mt-[-60px]"
                  src="https://myjobs-company-logo.s3.ap-south-1.amazonaws.com/bb2e01ff-5e10-4ee0-8ba6-2bf377fbb865.jfif"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold mt-5 text-[34px]  tracking-[-1px]">
                {data?.Title}{" "}
              </h3>
              <p>
                by {data?.Employer?.CompanyName} in {data?.Employer?.MapAddress}
              </p>
              <div className="flex gap-4 mt-10">
                <div className="cursor-pointer border flex justify-center items-center border-widgetColor text-widgetColor text-center h-[46px] w-[46px] rounded-full text-[15px] transition-[color,background-color] duration-300 ease-in-out hover:bg-widgetColor group">
                  <Heart
                    strokeWidth={1.75}
                    className="group-hover:stroke-white"
                  />
                </div>
                <div className="cursor-pointer border flex justify-center items-center border-widgetColor text-widgetColor text-center h-[46px] w-[46px] rounded-full text-[15px] transition-[color,background-color] duration-300 ease-in-out hover:bg-widgetColor group">
                  <Share2
                    strokeWidth={1.75}
                    className="group-hover:stroke-white"
                  />
                </div>
                <PrimaryBtn
                  text="Apply Now"
                  handleClick={() => {
                    setOpenModal(true);
                  }}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-center">
              <p className="ml-10 text-[13px] font-light">
                {data?.Industry?.Title} {data?.FunctionalArea?.TitleEng}
              </p>
              <p className="ml-10 text-[13px] text-muteColor font-light">
                Date Posted At {moment(data?.CreatedAt).format("MMM DD, YYYY")}
              </p>
            </div>
            <div className="flex flex-wrap -mx-[15px] mt-[100px]">
              <div className="grid mt-[15px]   gap-4 grid-cols-12">
                <div className="col-span-6 lg:col-span-7 xxl:col-span-8">
                  <div className="mb-[16px]">
                    <h1 className="mb-[20px] text-[18px] ">Description</h1>
                    <div
                      className="text-[#212529]"
                      dangerouslySetInnerHTML={{ __html: data?.Description }}
                    />
                  </div>
                  <div className="mb-[16px]">
                    <h1 className="mb-[20px] text-[18px]"> Requirement</h1>
                    <div
                      className="text-[#212529]"
                      dangerouslySetInnerHTML={{ __html: data?.Requirement }}
                    />
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-5 xxl:col-span-4  gap-[20px] flex flex-col justify-center items-center">
                  <div className="bg-jobBg w-full p-[30px] rounded-[30px]">
                    <div>
                      <p className="opacity-70 text-[13px]">
                        Experience Length
                      </p>
                      <p className="font-[500]">{data?.YearsOfExperience}</p>
                    </div>

                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Work Level</p>
                      <p className="font-[500]">{data?.CareerLevel}</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Employment Type</p>
                      <p className="font-[500]">{data?.JobType}</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Qualification</p>
                      <p className="font-[500]">Degree</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Salary</p>
                      <p className="font-[500]">
                        {data?.HideSalary
                          ? "Hide"
                          : data?.Fromsalary + " - " + data?.Tosalary}
                      </p>
                    </div>
                  </div>
                  <div className="bg-jobBg mb-5  w-full  p-[30px] rounded-[30px]">
                    <div className="flex mb-5">
                      <img
                        className="block w-[60px] h-[60px] rounded-[14px] bg-center bg-cover bg-no-repeat flex-shrink-0"
                        src="/image/banner3.png"
                      />
                      <div className="ml-5">
                        <p className="break-words">
                          {data?.Employer?.CompanyName}
                        </p>
                        <p className="text-[#007bff] text-[13px]">
                          View Profile
                        </p>
                      </div>
                    </div>

                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Industry </p>
                      <p className="font-[500]">
                        {data?.Employer?.Industry?.Title}
                      </p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Company size</p>
                      <p className="font-[500]">
                        {data?.Employer?.NumberOfEmployee}
                      </p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Founded in</p>
                      <p className="font-[500]">2013</p>
                    </div>
                    <div className="mt-[1.5rem]">
                      <p className="opacity-70 text-[13px]">Location</p>
                      <p className="font-[500]">{data?.MapAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default JobDetailComponent;
