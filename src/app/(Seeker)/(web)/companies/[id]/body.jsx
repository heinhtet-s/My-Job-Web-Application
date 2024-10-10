"use client";
import CardLayout from "@/components/share/CardLayout";
import { Earth } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import QrModal from "@/components/share/QrModal";
import { QrCode } from "lucide-react";
import useFullUrl from "@/lib/useFullUrl";
import { useSession } from "next-auth/react";
import { CreateViewCount } from "@/modules/services/employer_service";

const CompanyDetail = ({ companyLists }) => {
  const params = useParams();
  const { id: JobId } = params;

  const [qrOpenModal, setQrOpenModal] = useState(false);
  const handleOpenQrModal = () => {
    setQrOpenModal(false);
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "loading") {
      handeAddViewCount();
    }
  }, [session, JobId]);
  const handeAddViewCount = async () => {
    try {
      await CreateViewCount({
        EmployerId: JobId,
        SeekerId: session?.user?.Id,
        View: "Seeker",
      });
    } catch (e) {}
  };
  const getLocation = useFullUrl();
  const data = companyLists?.value?.filter((el) => el?.Id === JobId)?.[0];

  return (
    <div>
      <div
        className=" bg-cover bg-center bg-no-repeat h-[460px] relative "
        style={{
          backgroundImage: "url('/image/banner3.png')",
        }}
      >
        <div className="bg-[rgba(0,0,0,0.3)] absolute inset-0 z-10"></div>
        <div className="absolute left-0 right-0 bottom-[60px] z-20">
          <CardLayout>
            <div className="flex  items-center">
              <img
                src={
                  data?.CompanyLogo ? data.CompanyLogo : "/image/no-image.png"
                }
                className="w-[120px] h-[120px]"
              />
              <div className="ml-[20px]">
                <div className="flex items-center gap-[10px]">
                  <p className="text-[34px] font-[700] text-white">
                    {data?.CompanyName}
                  </p>
                  <button
                    onClick={() => {
                      setQrOpenModal(true);
                    }}
                    className="w-[50px] bg-white flex justify-center items-center h-[50px] rounded-[10px] p-0 cursor-pointer outline-offset-4 text-black border border-primary"
                  >
                    <QrCode />
                  </button>
                </div>
                <div className="flex items-center">
                  <Earth
                    width="12px"
                    color="white"
                    height="12px"
                    className="mt-[3px] ml-[5px]"
                  />
                  <p className="text-white font-light">{data?.MapAddress}</p>
                </div>
              </div>
            </div>
          </CardLayout>
        </div>
      </div>
      <div className="mt-100 py-20">
        <CardLayout>
          <div className="grid mt-[15px]   gap-8 grid-cols-12">
            <div className=" lg:col-span-7 xl:col-span-8">
              <div>
                <h1 className="font-bold text-[28px] tracking-[-1px] mb-[30px]">
                  About Me
                </h1>
                <div
                  className="font-light leading-[1.7rem]"
                  dangerouslySetInnerHTML={{ __html: data?.About }}
                ></div>
                <p></p>
              </div>
            </div>
            <div className=" lg:col-span-6 xl:col-span-4">
              <div className="p-[30px] rounded-[30px] bg-[#f7e2cb] ">
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Industry </p>
                  <p className="font-[500]">{data?.Industry?.TitleEng}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Company size</p>
                  <p className="font-[500]">{data?.NumberOfEmployee}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Founded in</p>
                  <p className="font-[500]">
                    {" "}
                    {data?.EstablishedIn
                      ? moment(data?.EstablishedIn)?.format("D/MM/YYYY")
                      : "-"}
                  </p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Phone </p>
                  <p className="font-[500]">
                    {session?.user?.Id === JobId
                      ? data?.CompanyPhoneNum
                      : "locked"}
                  </p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Email </p>
                  <p className="font-[500]">{data?.Email}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Location </p>
                  <p className="font-[500]">{data?.MapAddress}</p>
                </div>
                <div className="mt-[1.5rem]">
                  <p className="opacity-70 text-[13px]">Website</p>
                  <p className="font-[500]">{data?.WebsiteAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </CardLayout>
        <QrModal
          qrVal={getLocation}
          openModal={qrOpenModal}
          handleModalClose={handleOpenQrModal}
        />
      </div>
    </div>
  );
};

export default CompanyDetail;
