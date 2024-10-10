"use client";
import SearchIcon from "@/asset/Icon/SearchIcon";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  GetCategories,
  GetBlogs,
} from "../../../../modules/services/blog_services";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");

  const FetchBlogData = async () => {
    try {
      let url = "/Blogs";
      // Create an array to hold filter conditions
      const filters = [];

      // Append the heading filter if provided
      if (search) {
        filters.push(`contains(tolower(Heading), tolower('${search}'))`);
      }

      // Append the category ID filter if provided
      if (categoryId) {
        filters.push(`CategoryId eq ${categoryId}`);
      }

      // If there are filters, append them as query parameters
      if (filters.length > 0) {
        const filterQuery = filters.join(" and ");
        url += `?$filter=${filterQuery}`;
      }

      const data = await GetBlogs(url);
      console.log(data);
      setBlogData(data?.value);
    } catch (e) {
      console.log(e);
    }
  };
  const FetchCategoryData = async () => {
    try {
      const data = await GetCategories("/Categories");
      setCategory(data?.value);
    } catch (e) {}
  };
  const router = useRouter();
  useEffect(() => {
    FetchBlogData();
  }, [categoryId]);
  useEffect(() => {
    FetchCategoryData();
  }, []);
  return (
    <div className="py-[70px]">
      <div className="max-w-7xl mx-auto">
        <div className="py-[60px]">
          <h1 className="text-5xl font-bold tracking-tighter">
            Top Career Advice
          </h1>
          <p className="text-lg opacity-70 mt-3">
            Browse the latest career advices
          </p>
        </div>
        {/* <div className="w-full py-[100px] text-center bg-gray-200 mb-16 rounded-3xl">
          Carousel
        </div> */}
        <div className="relative">
          <Swiper
            style={{
              width: "100%",
            }}
            className="BlogSwiper"
            spaceBetween={50}
            navigation={true}
            // effect="fade" // Add fade effect
            // fadeEffect={{ crossFade: true }} // Optional: for smoother transitions
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            autoplay={{
              delay: 10000,
            }}
            speed={700}
            modules={[Autoplay, Navigation]} // Add EffectFade module
          >
            {blogData?.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="rounded-[30px] overflow-hidden"
                >
                  <div
                    style={{
                      backgroundImage: `url(${item?.ImageUrl})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="bg-[#ffefdc] mb-[20px]  h-[460px] w-full relative  rounded-[30px]  overflow-hidden"
                  >
                    <div className="absolute inset-0 z-[2] flex justify-center items-center text-center">
                      <div className="bg-[rgba(0,0,0,0.3)] absolute inset-0 z-[-1]"></div>
                      <div className="flex justify-center items-center w-1/2">
                        <div className="flex flex-col gap-4">
                          <p className="text-[13px] font-[300] opacity-[0.7] text-white">
                            {moment(item?.CreatedAt).format("DD MMM YYYY")}
                          </p>
                          <p className="font-[700] text-[34px] text-white">
                            {item?.Heading}
                          </p>
                          <p
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "white !important",
                            }}
                            className=" text-[16px] font-[300] text-child-white opacity-[0.7] text-white"
                            dangerouslySetInnerHTML={{ __html: item?.Content }}
                          />

                          <button
                            onClick={() => {
                              router.push(`blog/${item?.Id}`);
                            }}
                            className="bg-primary w-fit mx-auto text-white text-[18px] font-medium px-5 py-2.5 transition duration-300 ease-in-out hover:bg-widgetHoverColor rounded-full"
                          >
                            Read Article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {blogData?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/blog/${item?.Id}`);
                    }}
                    className="border border-gray-200 rounded-[30px] h-[260px] flex mb-8"
                  >
                    <div className=" rounded-[30px] h-[260px] w-[360px]">
                      <div
                        className="w-full h-full rounded-[30px] object-cover bg-center"
                        style={{
                          backgroundImage: `url(${item?.ImageUrl})`,
                        }}
                      ></div>
                    </div>
                    <div className="p-[30px] w-[500px]">
                      <div className="flex justify-between">
                        <div>
                          <p className=" hover:text-[#f69322] text-sm font-medium ">
                            Category :{" "}
                          </p>
                          <p
                            href="ww.com"
                            className="text-[#F69322] hover:text-[#c36d0b]"
                          >
                            {
                              category?.find(
                                (el) => el?.Id === item?.CategoryId
                              )?.Name
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-xs">
                            {moment(item?.CreatedAt).format("DD MMM YYYY")}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="font-semibold text-lg my-6  hover:text-[#f69322] ">
                          {item?.Heading}
                        </p>
                      </div>
                      <div className="mt-4 text-sm opacity-70">
                        <p
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          dangerouslySetInnerHTML={{ __html: item?.Content }}
                        ></p>
                      </div>
                      <div className="mt-4 ">
                        <p className="flex text-[#F69322] hover:text-[#c36d0b] ">
                          Read More{" "}
                          <ChevronRight
                            color="#F69322"
                            className="hover:text-[#c36d0b]"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="bg-[#E0F6F9] p-[30px] rounded-[30px]">
                <h3 className="text-lg font-semibold my-4">Search Articles</h3>
                <div className="w-full bg-white py-4 rounded-l-full shadow-lg">
                  <div className="w-full flex items-center h-8 ps-4">
                    <span className="w-10 h-full">
                      <Search color="gray" />
                    </span>
                    <input
                      type="text"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="Search...."
                      className="focus:outline-none focus:border-none w-full h-full  ring-0 focus:ring-0 border-none outline-none"
                    />
                    <button
                      onClick={FetchBlogData}
                      className="w-14  h-[64px] bg-[#0D6EFD] flex items-center justify-center"
                    >
                      <Search color="white"></Search>
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mt-4">Categories</h3>
                <div className="flex flex-col my-4">
                  <p
                    onClick={() => {
                      setCategoryId("");
                    }}
                    className="opacity-80 cursor-pointer hover:text-[#f69322] transition-all ease-in-out duration-300 mb-1"
                  >
                    All
                  </p>
                  {category?.map((el) => {
                    return (
                      <p
                        onClick={() => {
                          setCategoryId(el?.Id);
                        }}
                        className="opacity-80 cursor-pointer hover:text-[#f69322] transition-all ease-in-out duration-300 mb-1"
                      >
                        {el?.Name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
