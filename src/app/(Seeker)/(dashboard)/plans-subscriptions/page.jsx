import { Check, CircleCheck } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-[38px] font-bold">Buy Packages</h1>
        <p className="opacity-60 mb-[40px]"> Our Best recruitment plus employer branding packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4]?.map((str, index) => (
          <div className="max-w-sm rounded-xl overflow-hidden shadow-xl border border-black-1">
            <div className="px-2 py-8 text-center">
              <div className="mb-5 ">
                <h3 className="font-semibold text-[25px] leading-6">STATER PACK</h3>
                <span className="text-[18px] font-light">Basic Boost</span>
              </div>
              <div className="mt-8 mb-3">
                <span className="font-bold text-3xl">$10000+</span>
              </div>
              <div className=" mb-3">
                <span className="font-medium text-sm">Essentail Tools for a solid start</span>
              </div>
              <div className="mb-4 flex justify-center justify-items-center">
                <button className="bg-[#F69322] text-white px-10 py-2  font-bold text-2xl rounded w-[15rem] ">Order</button>
              </div>
              <div className="mb-4 mt-8">
                <a href="" className="underline text-sm text-[#F59321] font-semibold">Package Detail</a>
              </div>

              <ul className="text-left">
                <li className="flex my-5 text-gray-600 text-sm  items-center"> <span><CircleCheck  className="text-gray-600 mx-2"/></span>Sutable for Small Business and Micro Enterprises</li>
                <li className="flex my-5 text-gray-600 text-sm  items-center"><span><CircleCheck className="text-gray-600 mx-2"/></span>Limited Access to the  quilified applicants</li>
                <li className="flex my-5 text-gray-600 text-sm  items-center"><span><CircleCheck className="text-gray-600 mx-2" /></span>Basic Applicant Tracking System</li>
                <li className="flex my-5 text-gray-600 text-sm items-center"><span><CircleCheck  className="text-gray-600 mx-2" /></span>CV download</li>
                <li className="flex  my-5 text-gray-600 text-sm items-center" ><span><CircleCheck  className="text-gray-600 mx-2" /></span>Database Management</li>
                <li className="flex my-5  text-gray-600 text-sm  items-center"><span><CircleCheck className="text-gray-600 mx-2" /></span>User friendly job posting</li>
                <li className="flex my-5  text-gray-600 text-sm items-center"><span><CircleCheck  className="text-gray-600 mx-2"/></span>Job reports</li>
              </ul>

            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-100 mt-4 px-[100px] py-[10px] rounded-md flex  justify-between mx-auto">
        <div className="flex justify-center flex-col ">
          <h3 className="mb-4 font-semibold text-2xl">Contact our sale team for more info</h3>
          <p>Our team is happy to answer your questions.</p>
          <p className="mb-8">Let's explore how MyJobs can work for you.</p>
          <button className="bg-[#F69322] text-white px-4 py-2 w-[15rem] text-xl rounded  ">Contact Us</button>
        </div>
        <div>
          <img src="https://www.myjobscom.com/update_theme/images/_4141232-1.png" alt="" />
           </div>
      </div>
    </div>
  )
}

export default page