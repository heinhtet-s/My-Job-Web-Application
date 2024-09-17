"use client";
import DotIcon from "@/asset/Icon/DotIcon";
import PrimaryBtn from "@/components/ui/primaryBtn";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import ApiReq from "@/lib/axiosHandler";
import { CircleUser, FileText, Mail } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [overviewData, setOverviewData] = useState({});
  const fetchOverviewData = async () => {
    try {
      const data = await ApiReq.get(
        "api/dashboard/overview?include=totalJob,onlineJob,offlineJob,sportlightJob,totalApplication,JobView"
      );
      setOverviewData(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOverviewData();
  }, []);
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Welcome</h1>
      <p className="opactiy-70 mb-[30px]">
        Find your dream careers on Myjobs.com.mm
      </p>
      <div
        className="border bg-[#002745] rounded-[20px]"
        style={{
          flex: "1 1 auto",
          padding: "1rem 1rem",
        }}
      >
        <div className=" flex float-right text-white text-[13px] justify-end">
          Last Login: &nbsp; &nbsp;
          <span className="text-white">
            {" "}
            {session?.user?.LastLogin
              ? moment(session?.user?.LastLogin).format("DD MMM YYYY")
              : moment().format("DD MMM YYYY")}
          </span>
        </div>
        <div className="grid  grid-cols-12 items-center  gap-4 lg:grid-cols-12 xl:grid-cols-12">
          <div className="col-span-6 lg:col-span-5 xl:col-span-3 flex flex-col justify-center items-center">
            <img
              src="/image/no-image.png"
              className="w-[150px] h-[150px]  rounded-[20px] "
            />
            {/* <p className="text-[1.5rem] mb-[0.5rem[">
              {session?.user?.FirstName
                ? session?.user?.FirstName + "  " + session?.user?.LastName
                : session?.user?.email}
            </p> */}
          </div>
          <div className="col-span-9 flex items-center gap-8">
            <div className=" flex-wrap lg:flex-nowrap flex gap-[10px] ">
              <div>
                <div className="mb-2">
                  <p className="mb-1 text-white text-[25px] font-[600]  break-words ">
                    {session?.user?.CompanyName}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="mb-1 font-[300]  text-white break-words ">
                    {session?.user?.MapAddress}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "1 1 300px",
              }}
            >
              <PrimaryBtn
                handleClick={() => {
                  router.push(`/companies/${session?.user?.Id}`);
                }}
                text="Public Profile"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="45"
              height="53"
              viewBox="0 0 45 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.9601 0C29.0734 0 29.1846 0.00954279 29.2927 0.0278682L29.6539 0.030084C30.1922 0.030084 30.7068 0.249117 31.0815 0.637042L44.4478 14.5628C44.8014 14.9296 44.9997 15.4231 44.9997 15.9324V40.121C45.0469 46.7421 39.8903 52.152 33.2587 52.4211L12.0969 52.4238H11.8093C5.34402 52.2776 0.158766 47.0488 0.000796516 40.6466L0 11.8499C0.153059 5.3027 5.56027 0.030084 12.06 0.030084L28.6275 0.0278682C28.7356 0.00954279 28.8467 0 28.9601 0ZM26.9806 3.98745L12.0653 3.98851C7.69254 3.98851 4.06134 7.52998 3.95842 11.8974V40.121C3.86078 44.6415 7.42336 48.3651 11.899 48.4653H33.1795C37.5839 48.2833 41.0726 44.623 41.0411 40.1368L41.0409 18.4278L35.7369 18.4304C30.9076 18.4172 26.9809 14.4799 26.9809 9.65591L26.9806 3.98745ZM28.4671 33.2721C29.5597 33.2721 30.4463 34.1588 30.4463 35.2513C30.4463 36.3439 29.5597 37.2306 28.4671 37.2306H14.2168C13.1243 37.2306 12.2376 36.3439 12.2376 35.2513C12.2376 34.1588 13.1243 33.2721 14.2168 33.2721H28.4671ZM23.0707 23.3708C24.1633 23.3708 25.05 24.2575 25.05 25.35C25.05 26.4425 24.1633 27.3292 23.0707 27.3292H14.2144C13.1219 27.3292 12.2352 26.4425 12.2352 25.35C12.2352 24.2575 13.1219 23.3708 14.2144 23.3708H23.0707ZM30.939 6.20681L30.9393 9.65591C30.9393 12.3054 33.0953 14.4641 35.7422 14.472L38.8717 14.4694L30.939 6.20681Z"
                fill="#F08000"
              />
            </svg>
          </div>

          <div>
            <p className="text-[36px] font-bold text-primary">
              {overviewData?.totalJob}
            </p>
            <p className="text-[14px] font-[300]">Total Jobs</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="45"
              height="53"
              viewBox="0 0 45 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.9632 0C29.0768 0 29.1881 0.00958084 29.2965 0.0279778L29.6531 0.0300818C30.1914 0.0300818 30.7061 0.249099 31.0808 0.636996L44.4506 14.5617C44.8016 14.9285 44.9997 15.422 44.9997 15.9312V40.1814C45.0417 46.8021 39.8796 52.1825 33.2475 52.42H11.7652C5.32512 52.2816 0.160204 47.0782 0.000965038 40.7045L0 11.8491C0.155708 5.30232 5.56061 0.0300818 12.0581 0.0300818L28.6299 0.0279778C28.7383 0.00958084 28.8496 0 28.9632 0ZM26.9823 3.98716L12.066 3.98822C7.69301 3.98822 4.06159 7.52943 3.95867 11.8966V40.1814C3.86366 44.67 7.40007 48.3642 11.847 48.4619H33.1789C37.5836 48.3035 41.0699 44.67 41.041 40.1946L41.0408 18.4265L35.7404 18.4291C30.9082 18.4159 26.9839 14.4789 26.9839 9.65522L26.9823 3.98716ZM21.4834 18.8906C22.0297 18.8906 22.5246 19.1123 22.8828 19.4705L22.8856 19.4722L29.0769 25.6891C29.8476 26.4649 29.8449 27.7157 29.0717 28.4862C28.2958 29.2567 27.0422 29.2567 26.2716 28.4809L23.4617 25.6593L23.4628 36.8104C23.4628 37.9029 22.576 38.7895 21.4834 38.7895C20.3908 38.7895 19.5041 37.9029 19.5041 36.8104L19.503 25.6593L16.6969 28.4809C16.3116 28.8714 15.8022 29.0641 15.2955 29.0641C14.7914 29.0641 14.2847 28.8714 13.8994 28.4862C13.1261 27.7157 13.1209 26.4649 13.8941 25.6891L20.0802 19.4722L20.1685 19.3908C20.2067 19.3569 20.2462 19.3243 20.2869 19.2934L20.0802 19.4722C20.1538 19.3983 20.233 19.3318 20.3168 19.2725C20.6427 19.0323 21.0466 18.8906 21.4834 18.8906ZM30.9409 6.20636L30.9425 9.65522C30.9425 12.3045 33.096 14.463 35.7457 14.471L38.8715 14.4683L30.9409 6.20636Z"
                fill="#198754"
              />
            </svg>
          </div>

          <div>
            <p className="text-[36px] font-bold text-[#198754]">
              {overviewData?.onlineJob}
            </p>
            <p className="text-[14px] font-[300]">Online Jobs</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="45"
              height="53"
              viewBox="0 0 45 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.9613 0C29.0748 0 29.1862 0.00958041 29.2945 0.0279765L29.6543 0.0298166C30.1926 0.0298166 30.7072 0.248824 31.0819 0.636704L44.4484 14.5661C44.802 14.9329 45 15.4263 45 15.9355V40.4749C45.0131 46.9897 39.7193 52.3488 33.2011 52.4174L12.0654 52.42H11.9889C8.82212 52.42 5.82688 51.193 3.56527 48.9555C1.28518 46.7021 0.0184729 43.694 0 40.4854V11.8483C0 5.33348 5.30172 0.0298166 11.82 0.0298166L28.628 0.0279765C28.7363 0.00958041 28.8477 0 28.9613 0ZM26.981 3.98698L11.82 3.98778C7.48416 3.98778 3.95848 7.51564 3.95848 11.8483V40.4749C3.97167 42.6148 4.82142 44.6307 6.34939 46.1427C7.87473 47.6493 9.978 48.5148 12.0522 48.462C12.0615 48.462 12.1387 48.4614 12.2155 48.4607L33.1799 48.4594C37.5132 48.4119 41.0494 44.8313 41.0415 40.4775L41.0415 18.4256L35.7355 18.4283C30.9062 18.4151 26.982 14.4782 26.982 9.65478L26.981 3.98698ZM18.8416 22.8298L22.017 26.0064L25.1941 22.8298C25.9673 22.0567 27.2182 22.0567 27.9914 22.8298C28.7647 23.6029 28.7647 24.8536 27.9914 25.6267L24.8144 28.8034L27.9883 31.9753C28.7615 32.7484 28.7615 33.9991 27.9883 34.7723C27.603 35.1601 27.0963 35.3528 26.5896 35.3528C26.0829 35.3528 25.5762 35.1601 25.1909 34.7723L22.017 31.6003L18.8447 34.7723C18.4594 35.1601 17.9527 35.3528 17.4461 35.3528C16.9394 35.3528 16.4327 35.1601 16.0474 34.7723C15.2742 33.9991 15.2742 32.7484 16.0474 31.9753L19.2197 28.8034L16.0442 25.6267C15.271 24.8536 15.271 23.6029 16.0442 22.8298C16.8175 22.0567 18.0683 22.0567 18.8416 22.8298ZM30.9394 6.20608L30.9405 9.65478C30.9405 12.304 33.0939 14.4624 35.7408 14.4703L38.8696 14.4677L30.9394 6.20608Z"
                fill="#DC3545"
              />
            </svg>
          </div>
          <div>
            <p className="text-[36px] font-bold text-[#DC3545]">
              {" "}
              {overviewData?.offlineJob}
            </p>
            <p className="text-[14px] font-[300]">Offline Jobs</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="45"
              height="53"
              viewBox="0 0 45 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.9023 0C39.8606 0 45 4.22186 45 11.5768V48.1277C45 49.6616 44.1707 51.042 42.7763 51.814C41.3871 52.5885 39.7127 52.6036 38.3077 51.8492L22.5673 43.3828L6.68173 51.8668C5.99507 52.2339 5.24238 52.42 4.48706 52.42C3.70796 52.42 2.92887 52.2214 2.22108 51.8241C0.829274 51.0521 0 49.6716 0 48.1403V11.1167C0 4.05088 5.14203 0 14.1082 0H30.9023ZM30.9023 3.77177H14.1082C7.37631 3.77177 3.9615 6.24101 3.9615 11.1167V48.1403C3.9615 48.3767 4.10411 48.5049 4.22296 48.5703C4.3418 48.6407 4.52931 48.691 4.74588 48.5753L21.6007 39.5734C22.2029 39.254 22.9397 39.2515 23.5445 39.5759L40.2541 48.5627C40.4733 48.6834 40.6608 48.6281 40.7797 48.5602C40.8985 48.4923 41.0385 48.3641 41.0385 48.1277L41.0375 11.2903C41.0176 9.1261 40.5778 3.77177 30.9023 3.77177ZM32.0612 16.9189C33.1546 16.9189 34.042 17.7638 34.042 18.8048C34.042 19.8458 33.1546 20.6906 32.0612 20.6906H12.7344C11.641 20.6906 10.7536 19.8458 10.7536 18.8048C10.7536 17.7638 11.641 16.9189 12.7344 16.9189H32.0612Z"
                fill="#002745"
              />
            </svg>
          </div>
          <div>
            <p className="text-[36px] font-bold text-[#002745]">
              {" "}
              {overviewData?.sportlightJob}
            </p>
            <p className="text-[14px] font-[300]">Spotlight Jobs</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="50"
              height="53"
              viewBox="0 0 50 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.464 0C20.7615 0.00253617 22.9502 1.15396 24.3224 3.0789L26.5232 6.15274C27.2213 7.12662 28.3302 7.70741 29.4898 7.70994H36.3241C45.654 7.70994 50 12.729 50 23.5052L49.9324 36.1023C49.9299 46.1658 43.9726 52.42 34.3818 52.42H15.582C5.97188 52.42 0 46.1633 0 36.0947V16.3152C0 5.48826 4.58762 0 13.6324 0H18.464ZM18.4616 3.80425H13.6324C6.6169 3.80425 3.62371 7.54763 3.62371 16.3152V36.0947C3.62371 44.1699 7.87071 48.6158 15.582 48.6158H34.3818C42.0737 48.6158 46.3086 44.1699 46.3086 36.0947V36.0871L46.3763 23.495C46.3763 14.8746 43.5594 11.5142 36.3241 11.5142H29.4874C27.1948 11.5117 25.006 10.3628 23.629 8.44036L21.4234 5.36145C20.7301 4.38503 19.6212 3.80678 18.4616 3.80425ZM35.5515 30.9737C36.5517 30.9737 37.3634 31.8258 37.3634 32.8758C37.3634 33.9258 36.5517 34.7779 35.5515 34.7779H14.4494C13.4493 34.7779 12.6376 33.9258 12.6376 32.8758C12.6376 31.8258 13.4493 30.9737 14.4494 30.9737H35.5515Z"
                fill="#0969C3"
              />
            </svg>
          </div>
          <div>
            <p className="text-[36px] font-bold text-[#0969C3]">
              {overviewData?.JobApplication}
            </p>
            <p className="text-[14px] font-[300]">Total Applications</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="50"
              height="40"
              viewBox="0 0 50 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.0066 0C35.3464 0.0074511 44.6313 7.2077 49.8463 19.2636C50.0513 19.733 50.0513 20.2645 49.8463 20.7339C44.6338 32.7923 35.3464 39.9925 25.0066 40H24.9916C14.6517 39.9925 5.36681 32.7923 0.151873 20.7339C-0.0506244 20.2645 -0.0506244 19.733 0.151873 19.2636C5.36681 7.2077 14.6542 0.0074511 24.9916 0H25.0066ZM24.9991 3.72555C16.4092 3.72803 8.57427 9.79572 3.92433 19.9988C8.57427 30.2043 16.4067 36.272 24.9991 36.2745C33.5915 36.272 41.4239 30.2043 46.0738 19.9988C41.4239 9.79572 33.5915 3.72803 24.9991 3.72555ZM24.9983 10.2845C30.3907 10.2845 34.7782 14.6434 34.7782 20.0007C34.7782 25.3556 30.3907 29.712 24.9983 29.712C19.6059 29.712 15.2209 25.3556 15.2209 20.0007C15.2209 14.6434 19.6059 10.2845 24.9983 10.2845ZM24.9983 14.0101C21.6734 14.0101 18.9709 16.6974 18.9709 20.0007C18.9709 23.3016 21.6734 25.9865 24.9983 25.9865C28.3233 25.9865 31.0282 23.3016 31.0282 20.0007C31.0282 16.6974 28.3233 14.0101 24.9983 14.0101Z"
                fill="#FFC107"
              />
            </svg>
          </div>

          <div>
            <p className="text-[36px] font-bold text-[#FFC107]">
              {overviewData?.jobView}
            </p>
            <p className="text-[14px] font-[300]">Total Job Views</p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="50"
              height="45"
              viewBox="0 0 50 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M36.4163 0C44.1605 0 50 6.27 50 14.5846V30.4338C50 34.6892 48.4837 38.5338 45.7279 41.2615C43.2558 43.7054 40.0488 45 36.4535 45H13.5395C9.95116 45 6.74651 43.7077 4.27209 41.2615C1.51628 38.5338 0 34.6892 0 30.4338V14.5846C0 6.27 5.83953 0 13.5837 0H36.4163ZM36.4163 3.46154H13.5837C7.73488 3.46154 3.48837 8.13923 3.48837 14.5846V30.4338C3.48837 33.7638 4.64186 36.7385 6.73488 38.8085C8.53953 40.5969 10.8953 41.5385 13.5465 41.5385H36.4163C36.4209 41.5338 36.4395 41.5385 36.4535 41.5385C39.107 41.5385 41.4605 40.5969 43.2651 38.8085C45.3605 36.7385 46.5116 33.7638 46.5116 30.4338V14.5846C46.5116 8.13923 42.2651 3.46154 36.4163 3.46154ZM40.0814 14.1434C40.6884 14.8842 40.5744 15.9734 39.8279 16.578L29.493 24.9134C28.186 25.9426 26.6233 26.4572 25.0628 26.4572C23.507 26.4572 21.9558 25.9472 20.6581 24.9272L10.2279 16.5826C9.47674 15.9826 9.36046 14.8911 9.96279 14.148C10.5698 13.4072 11.6674 13.2895 12.4163 13.8872L22.8372 22.2226C24.1465 23.2518 25.9907 23.2518 27.3093 22.2134L37.6256 13.8918C38.3744 13.2849 39.4721 13.4003 40.0814 14.1434Z"
                fill="black"
              />
            </svg>
          </div>
          <div>
            <p className="text-[36px] font-bold text-[#17171D]">100</p>
            <p className="text-[14px] font-[300] text-[#17171D]">
              Unread messages
            </p>
          </div>
        </div>
        <div className=" gap-[10px] mt-[20px] py-[30px] bg-[#e6f0f9] col-span-3 flex items-center justify-center  relative rounded-[30px] overflow-hidden px-[15px] ">
          <div
            style={{ flex: "0 0 100px" }}
            className="w-[100px]   bg-white h-[100px] flex items-center justify-center rounded-[30px] "
          >
            <svg
              width="50"
              height="43"
              viewBox="0 0 50 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.8977 0C44.3326 0 50 5.092 50 12.67V30.33C50 37.908 44.3326 43 35.8977 43H14.1023C5.66744 43 0 37.908 0 30.33V12.67C0 5.092 5.66744 0 14.1023 0H35.8977ZM35.8977 3H14.1023C7.65581 3 3.48837 6.794 3.48837 12.67V30.33C3.48837 36.206 7.65581 40 14.1023 40H35.8977C42.3465 40 46.5116 36.206 46.5116 30.33V12.67C46.5116 6.794 42.3465 3 35.8977 3ZM14.2351 16.405C15.1979 16.405 15.9793 17.077 15.9793 17.905V31.625C15.9793 32.453 15.1979 33.125 14.2351 33.125C13.2723 33.125 12.4909 32.453 12.4909 31.625V17.905C12.4909 17.077 13.2723 16.405 14.2351 16.405ZM25.0886 9.837C26.0514 9.837 26.8328 10.509 26.8328 11.337V31.623C26.8328 32.451 26.0514 33.123 25.0886 33.123C24.1258 33.123 23.3444 32.451 23.3444 31.623V11.337C23.3444 10.509 24.1258 9.837 25.0886 9.837ZM35.7637 23.655C36.7265 23.655 37.5079 24.327 37.5079 25.155V31.623C37.5079 32.451 36.7265 33.123 35.7637 33.123C34.8009 33.123 34.0195 32.451 34.0195 31.623V25.155C34.0195 24.327 34.8009 23.655 35.7637 23.655Z"
                fill="#019180"
              />
            </svg>
          </div>
          <div>
            <p className="text-[36px] font-bold text-[#002745]">100</p>
            <p className="text-[14px] font-[300]">Average Applications /jobs</p>
          </div>
        </div>
      </div>
      {/* <p className="text-[24px] font-[600] mt-[20px] ">Recent Notifications</p> */}
    </div>
  );
};

export default page;
