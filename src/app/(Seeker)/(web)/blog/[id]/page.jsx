"use client";
import { GetBlogs } from "@/modules/services/blog_services";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const { id: BlogId } = params;

  const [blogs, setBlog] = useState("");
  const FetchBlogData = async () => {
    try {
      const data = await GetBlogs(`/Blogs/${BlogId}?$expand=Category`);
      setBlog(data);
    } catch (e) {}
  };
  useEffect(() => {
    FetchBlogData();
  }, [BlogId]);
  return (
    <div>
      <div className="max-w-6xl px-[170px] py-[16px]">
        <h1 className="text-5xl font-bold leading-[3rem] tracking-tight">
          {blogs?.Heading}
        </h1>
        <p className="text-[#F69322] mt-6 text-lg">{blogs?.Category?.Name}</p>
      </div>
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="max-w-4xl">
          <div dangerouslySetInnerHTML={{ __html: blogs?.Content }} />
          <div className="w-full rounded-[30px] mt-12 mb-20">
            <img src={blogs?.ImageUrl} alt="" className=" rounded-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
