"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
  doc,
  updateDoc,
  startAfter,
  Timestamp,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../../../../firebaseConfig";
import { GetEmployersList } from "@/modules/services/employer_service";
import { cn } from "@/lib/utils";
import axios from "axios";

const Page = () => {
  const { data: session } = useSession();
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [employerData, setEmployerData] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [initialMessagesCount, setInitialMessagesCount] = useState(20);
  const [messageText, setMessageText] = useState("");
  const [lastVisibleMessageDoc, setLastVisibleMessageDoc] = useState(null);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false); // Loading state for infinite scroll
  const scrollRef = useRef();
  const [infoData, setInfoData] = useState({});

  const seekerId = session?.user?.Id;
  const fetchInfoData = async () => {
    if (!session?.user?.Id) {
      return;
    }
    try {
      const personalData = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/seekers/getSeekerById?id=${session?.user?.Id}`
      );
      console.log(personalData.data);
      setInfoData(personalData.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchInfoData();
  }, [session?.user?.Id]);
  const messagesEndRef = useRef(null);
  const scrollToBttom = () => {
    if (scrollRef.current) {
      console.log(scrollRef.current.offsetHeight);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  // Fetch chat rooms with real-time updates
  useEffect(() => {
    if (seekerId) {
      const roomsRef = collection(db, "chat");
      const q = query(
        roomsRef,
        where("seekerId", "==", seekerId),
        orderBy("lastMessageTime", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const rooms = querySnapshot.docs.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));
        setChatRooms(rooms);
      });

      return () => unsubscribe();
    }
  }, [seekerId]);

  const handleSendMessage = async () => {
    try {
      const chatDocRef = doc(db, "chat", selectedRoomId);
      await updateDoc(chatDocRef, {
        isEmployerRead: false,
        isSeekerRead: true,
        lastMessage: messageText,
        lastMessageTime: Timestamp.now(),
      });

      const messagesRef = collection(db, "chat", selectedRoomId, "Message");
      await addDoc(messagesRef, {
        chatRoomId: selectedRoomId,
        message: messageText,
        senderId: seekerId,
        timestamp: Timestamp.now(),
      });
      setMessageText("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const getChatData = async (id) => {
    setSelectedRoomId(id);
    setLastVisibleMessageDoc(null);
    setChatHistory([]);
    try {
      const chatDocRef = doc(db, "chat", id);
      await updateDoc(chatDocRef, {
        isSeekerRead: true,
      });

      const chattingCollectionRef = collection(db, "chat", id, "Message");
      const queryRef = query(
        chattingCollectionRef,
        orderBy("timestamp", "desc"),
        limit(initialMessagesCount)
      );

      const unsubscribe = onSnapshot(queryRef, (snap) => {
        const updatedChats = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatHistory(updatedChats);
        const lastDoc = snap.docs[snap.docs.length - 1];
        setLastVisibleMessageDoc(lastDoc);
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollToBttom();
  }, [chatHistory]);
  // Infinite scroll logic
  const loadMoreMessages = async () => {
    if (!lastVisibleMessageDoc || !selectedRoomId || loadingMoreMessages)
      return;

    setLoadingMoreMessages(true); // Set loading to true before fetching

    const messagesRef = collection(db, "chat", selectedRoomId, "Message");
    const q = query(
      messagesRef,
      orderBy("timestamp", "desc"),
      startAfter(lastVisibleMessageDoc),
      limit(initialMessagesCount)
    );

    const querySnapshot = await getDocs(q);
    const moreMessages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (moreMessages.length > 0) {
      setChatHistory((prevMessages) => [...prevMessages, ...moreMessages]);
      setLastVisibleMessageDoc(
        querySnapshot.docs[querySnapshot.docs.length - 1]
      );
    }

    setLoadingMoreMessages(false); // Set loading to false after fetching
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      loadMoreMessages();
    }
  };

  const handleRoomSelect = (roomId) => {
    setMessages([]);
    setLastVisible(null);
    getChatData(roomId);
  };

  useEffect(() => {
    if (chatRooms?.length > 0) {
      fetchEmployerData(
        chatRooms?.map((el) => {
          return el?.employerId;
        })
      );
    }
  }, [chatRooms?.length]);

  const fetchEmployerData = async (Id) => {
    try {
      const res = await GetEmployersList(
        `?$filter=Id in (${Id})&$select=CompanyName,CompanyLogo,Id`
      );
      setEmployerData(res?.value);
    } catch (e) {
      console.log(e);
    }
  };

  const showMessageComponent = (data) => {
    if (data?.senderId === seekerId) {
      return (
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src={infoData?.ImageUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">{data?.message}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
          <p className="text-white">{data?.message}</p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src={
              employerData?.find((el) => el?.Id === data?.senderId)
                ?.CompanyLogo || "image/no-image.png"
            }
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        height: "calc(100vh - 184px)",
      }}
      className="flex overflow-hidden"
    >
      <div className="w-1/4 bg-white border-r border-gray-300">
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className={cn(
                "flex mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md",
                room.id === selectedRoomId
                  ? "bg-primary hover:bg-widgetHoverColor "
                  : "bg-white"
              )}
              onClick={() => handleRoomSelect(room.id)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={
                    employerData?.find((el) => el?.Id === room?.employerId)
                      ?.CompanyLogo || "image/no-image.png"
                  }
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2
                  className={cn(
                    "text-lg font-semibold",
                    room.id === selectedRoomId && "text-white"
                  )}
                >
                  {
                    employerData?.find((el) => el?.Id === room?.employerId)
                      ?.CompanyName
                  }
                </h2>
                <p
                  className={cn(
                    "text-gray-600",
                    room.id === selectedRoomId && "text-white"
                  )}
                >
                  {room?.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 flex flex-col justify-between">
        <div
          ref={scrollRef}
          className="flex-1 p-3 overflow-y-auto"
          onScroll={handleScroll} // Infinite scroll handler
        >
          {loadingMoreMessages && (
            <div className="flex justify-center items-center">
              <p>Loading more messages...</p>
            </div>
          )}
          <div className="flex flex-col-reverse">
            {chatHistory?.map((data, i) => {
              return (
                <div key={i} className="">
                  {showMessageComponent(data)}
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
        <div className="p-3 flex items-center bg-white border-t border-gray-300">
          <input
            type="text"
            className="flex-1 bg-gray-100 rounded-lg p-3 mr-2"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
