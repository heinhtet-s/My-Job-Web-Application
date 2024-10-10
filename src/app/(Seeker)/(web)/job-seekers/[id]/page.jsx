"use client";
import CardLayout from "@/components/share/CardLayout";
import axios from "axios";
import { QrCode } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ApiReq from "@/lib/axiosHandler";
import QrModal from "@/components/share/QrModal";
import { usePathname } from "next/navigation";
import useFullUrl from "@/lib/useFullUrl";
import { Button } from "@/components/ui/button";
import MessageModal from "@/components/share/MessageModal";
import { db } from "../../../../../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { GetCandidate } from "@/modules/services/employer_jobposts";
import { CreateViewCount } from "@/modules/services/employer_service";
const page = () => {
  const { data: session, status } = useSession();
  const [qrOpenModal, setQrOpenModal] = useState(false);
  const handleOpenQrModal = () => {
    setQrOpenModal(false);
  };
  const getLocation = useFullUrl();
  const router = usePathname();
  const params = useParams();
  const { id: SeekerId } = params;
  const [loading, setLoading] = useState(true);
  const [functionalArea, setFuncaionalArea] = useState([]);
  const [infoData, setInfoData] = useState({});
  const [careerInfo, setCareerInfo] = useState([]);
  const [showSendMessage, setShowMessage] = useState(false);
  const getFunctionalArea = async () => {
    try {
      const data = await ApiReq.get("api/functional_area/get");

      setFuncaionalArea(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(status !== "loading" && session?.user?.role === "employeer");
    if (status !== "loading" && session?.user?.role === "employeer") {
      handeAddViewCount();
    }
  }, [session, SeekerId]);
  const handeAddViewCount = async () => {
    try {
      console.log("hellow");
      await CreateViewCount({
        EmployerId: session?.user?.Id,
        SeekerId: SeekerId,
        View: "Employer",
      });
    } catch (e) {
      console.log("fwef");
    }
  };
  const fetchInfoData = async () => {
    try {
      const personalData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/seekers/detail?id=${SeekerId}`
      );

      setInfoData(personalData.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const getCareerInfoData = async () => {
    try {
      const data = await ApiReq.get(
        `api/seeker_info/career_info_list/getById?id=${SeekerId}`
      );

      setCareerInfo(data?.data?.[0]);
    } catch (e) {
      console.log(e);
    }
  };
  const handleShowSendMessage = async () => {
    console.log("dfekjfoew");
    if (session?.user?.role !== "employeer") {
      setShowMessage(false);
      return;
    }
    try {
      const data = await GetCandidate(
        `/$count?$filter=EmployerId eq ${session?.user?.Id} and SeekerId eq ${SeekerId}`
      );
      if (data > 0) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }
    } catch (e) {
      console.log(e, "kjijojiojoxw");
    }
  };
  useEffect(() => {
    if (session?.user?.Id) {
      handleShowSendMessage();
    }
  }, [session?.user?.Id]);
  const [messageOpen, setMessageOpen] = useState(false);
  useEffect(() => {
    fetchInfoData();
    getCareerInfoData();
    getFunctionalArea();
  }, []);
  const handleMessagClose = () => {
    setMessageOpen(false);
  };
  const handleSendMessage = async (message) => {
    const chatRoomRef = collection(db, "chat"); // Change this to your chat room collection name
    const seekerId = SeekerId; // Ensure this is defined
    const employerId = session?.user?.Id; // Ensure this is defined

    try {
      // Check if the room exists
      const roomQuery = query(
        chatRoomRef,
        where("seekerId", "==", seekerId),
        where("employerId", "==", employerId)
      );
      const querySnapshot = await getDocs(roomQuery);

      let chatRoomId;

      if (querySnapshot.empty) {
        // Create a new chat room
        const roomDoc = await addDoc(chatRoomRef, {
          seekerId: seekerId,
          employerId: employerId,
          isEmployerRead: true,
          isSeekerRead: false,
          lastMessage: message,
          lastMessageTime: Timestamp.now(),
          createdAt: new Date(), // Optional: track when the room was created
        });
        chatRoomId = roomDoc.id;
        console.log("Chat room created with ID:", chatRoomId);
      } else {
        chatRoomId = querySnapshot.docs[0].id;
        const chatDocRef = doc(db, "chat", chatRoomId);
        await updateDoc(chatDocRef, {
          isEmployerRead: true,
          isSeekerRead: false,
          lastMessage: message,
          lastMessageTime: Timestamp.now(),
        });
        // Use the existing room
        // Assuming you only expect one room
      }

      // Now, add the message to the messages collection (or wherever you store messages)
      const messagesRef = collection(db, "chat", chatRoomId, "Message"); // Change this to your messages collection name
      await addDoc(messagesRef, {
        chatRoomId: chatRoomId,
        message: message,
        senderId: session?.user?.Id, // Assuming the sender is the seeker; adjust as necessary
        timestamp: Timestamp.now(), // Optional: track when the message was sent
      });
      toast.success("Message sent successfully.");
      handleMessagClose();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  if (loading) {
    return <></>;
  }
  return (
    <>
      <CardLayout>
        <div className="grid pt-[15px]   gap-8 grid-cols-12">
          <div className="col-span-9 relative">
            <div
              className=" bg-cover bg-center bg-no-repeat rounded-[30px] h-[460px] w-full relative "
              style={{
                backgroundImage: "url('/image/banner3.png')",
              }}
            >
              <div className="bg-[rgba(0,0,0,0.3)] absolute inset-0 z-10 rounded-[60px]"></div>
              <div className="left-[30px] bottom-[30px] z-10 absolute flex items-center   ">
                <div
                  className="w-[120px] h-[120px] overflow-hidden  rounded-[60px] bg-center bg-contain bg-no-repeat flex-shrink-0"
                  style={{
                    backgroundImage: infoData?.seekerData?.ImageUrl
                      ? `url(${infoData?.seekerData?.ImageUrl})`
                      : "url('/image/no-image.png')",
                  }}
                />
                <div className="ml-[20px]">
                  <div className="font-bold text-[34px] flex gap-2 items-center tracking-[-1px] text-white">
                    {infoData?.seekerData?.FirstName +
                      " " +
                      infoData?.seekerData?.LastName}
                    <button
                      onClick={() => {
                        setQrOpenModal(true);
                      }}
                      className="w-[50px] bg-white flex justify-center items-center h-[50px] rounded-[10px] p-0 cursor-pointer outline-offset-4 text-black border border-primary"
                    >
                      <QrCode />
                    </button>
                  </div>
                  <p className="text-white font-thin">
                    Business Development & Management
                  </p>
                </div>
              </div>
            </div>
            <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
              About{" "}
              {infoData?.seekerData?.FirstName +
                " " +
                infoData?.seekerData?.LastName}
            </p>
            <p className="mb-[1rem] opacity-60">
              {infoData?.seekerData?.AboutMe}
            </p>
            <div className="mt-[48px]">
              <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
                Skills & Languages{" "}
              </p>
              <div className="flex  gap-4">
                {infoData?.lanData?.map((el) => {
                  return (
                    <div className="text-[13px] inline-block rounded-[50px] px-[17px] py-[7px] no-underline mr-[5px] mb-[10px] bg-[rgb(238,249,255)] text-black">
                      {el?.LanguageName} - {el?.LanguageLevel}
                    </div>
                  );
                })}
                {infoData?.skillData?.map((el) => {
                  return (
                    <div className="text-[13px] inline-block rounded-[50px] px-[17px] py-[7px] no-underline mr-[5px] mb-[10px] bg-[rgb(238,249,255)] text-black">
                      {el?.Name}
                    </div>
                  );
                })}

                <div className="text-[13px] inline-block rounded-[50px] px-[17px] py-[7px] no-underline mr-[5px] mb-[10px] bg-[rgb(238,249,255)] text-black">
                  English - Intermediate
                </div>
              </div>
            </div>
            <div>
              <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
                Work Experience
              </p>
              <ol className="relative border-s mb-[20px] border-gray-200 dark:border-gray-700">
                {infoData?.expData?.map((el) => {
                  return (
                    <li className="mb-10 ms-4">
                      <div className="absolute w-3 h-3 bg-gray-200 broder  rounded-full  -start-1.5 border-[4px] border-blue-800 dark:border-gray-900 dark:bg-gray-700"></div>
                      <time className="text-[13px] inline-block rounded-[50px] px-[10px] py-[2px] no-underline  bg-[rgb(238,249,255)] text-black">
                        {moment(el?.StartDate)?.format("YYYY")} -{" "}
                        {el?.Active
                          ? "current"
                          : moment(el?.EndDate)?.format("YYYY")}
                      </time>
                      <h3 className="text-[16px]  font-[600] text-gray-900 dark:text-white">
                        {el?.Title}
                      </h3>
                      <h3 className="text-[14px] font-[500] opacity-70 ">
                        {el?.CompanyName}
                      </h3>
                      <p className="mb-4 text-[14px]  text-gray-500 font-[300] ">
                        {el?.JobDescription}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div>
              <p className="text-primary mt-[20px] font-bold text-[28px] tracking-[-1px] mb-[30px]">
                Education & Training
              </p>
              <ol className="relative border-s mb-[20px] border-gray-200 dark:border-gray-700">
                {infoData?.eduData?.map((el) => {
                  return (
                    <li className="mb-10 ms-4">
                      <div className="absolute w-3 h-3 bg-gray-200 broder  rounded-full  -start-1.5 border-[4px] border-blue-800 dark:border-gray-900 dark:bg-gray-700"></div>

                      <time className="text-[13px] inline-block rounded-[50px] px-[10px] py-[2px] no-underline  bg-[rgb(238,249,255)] text-black">
                        {moment(el?.EndDate)?.format("YYYY")}
                      </time>
                      <h3 className="text-[16px]  font-[600] text-gray-900 dark:text-white">
                        {el?.Title}
                      </h3>
                      <h3 className="text-[14px] font-[500] opacity-70 ">
                        {el?.University}
                      </h3>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-jobBg w-full p-[30px] mb-[10px] rounded-[30px]">
              <p className="text-primary font-[600] mb-[20px]">
                Personal Information
              </p>
              <div>
                <p className="opacity-70 text-[13px]">Date of Birth</p>
                <p className="font-[500]">
                  {session?.user?.Id === SeekerId ||
                  session?.user?.role === "employeer"
                    ? infoData?.seekerData?.DateOfBirth
                    : "locked"}
                </p>
              </div>

              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Email</p>
                <p className="font-[500]">
                  {session?.user?.Id === SeekerId ||
                  session?.user?.role === "employeer"
                    ? infoData?.seekerData?.Email
                    : "locked"}
                </p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Location</p>
                <p className="font-[500]">
                  {" "}
                  {session?.user?.Id === SeekerId ||
                  session?.user?.role === "employeer"
                    ? infoData?.seekerData?.Address
                    : "locked"}
                </p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Phone</p>
                <p className="font-[500]">
                  {" "}
                  {session?.user?.Id === SeekerId ||
                  session?.user?.role === "employeer"
                    ? infoData?.seekerData?.PhoneNum ||
                      infoData?.seekerData?.ContactPhoneNumber
                    : "locked"}
                </p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Mobile Phone</p>
                <p className="font-[500]">
                  {" "}
                  {session?.user?.Id === SeekerId ||
                  session?.user?.role === "employeer"
                    ? infoData?.seekerData?.PhoneNum ||
                      infoData?.seekerData?.ContactPhoneNumber
                    : "locked"}
                </p>
              </div>
            </div>
            <div className="bg-jobBg w-full p-[30px] mb-[10px] rounded-[30px]">
              <p className="text-primary font-[600] mb-[20px]">
                Career Information
              </p>
              <div>
                <p className="opacity-70 text-[13px]">Professional Headline</p>
                <p className="font-[500]">{careerInfo?.CurrentPosition}</p>
              </div>

              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Years of Experience</p>
                <p className="font-[500]">{careerInfo?.YearsOfExperience}</p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Career Level</p>
                <p className="font-[500]">{careerInfo?.CareerLevel}</p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">
                  Preferred Functional Area
                </p>
                <p className="font-[500]">
                  {
                    functionalArea?.filter(
                      (el) => el?.Id === careerInfo?.CurrentFunctionalArea
                    )?.[0]?.TitleEng
                  }
                </p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]">Preferred Job Type</p>
                <p className="font-[500]">{careerInfo?.JobType}</p>
              </div>
              <div className="mt-[1.5rem]">
                <p className="opacity-70 text-[13px]"> Expected Salary</p>
                <p className="font-[500]">{careerInfo?.ExpectedSalary}</p>
              </div>
              {showSendMessage && (
                <Button
                  onClick={() => {
                    setMessageOpen(true);
                  }}
                  className=" mt-[20px]  border-primary ms-auto text-primary bg-transparent"
                  variant="outline"
                >
                  Send Message
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardLayout>
      <QrModal
        qrVal={getLocation}
        openModal={qrOpenModal}
        handleModalClose={handleOpenQrModal}
      />
      <MessageModal
        openModal={messageOpen}
        handleModalClose={handleMessagClose}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
};

export default page;
