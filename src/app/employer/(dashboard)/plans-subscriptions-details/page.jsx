import { Check, CircleCheck } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="mb-10">
                <h1 className="text-[38px] font-bold">Buy Packages</h1>
                <p className="opacity-60 mb-[40px]"> Our Best recruitment plus employer branding packages</p>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-8">
                <div className="col-span-2"></div>
                <div className="col-span-1 text-center"><h5 className="text-lg font-semibold">STARTER</h5> <span className="text-xs ">Basic Boost</span></div>
                <div className="col-span-1 text-center"><h5 className="text-lg font-semibold">PRO</h5> <span className="text-xs ">Career Catalyst
                </span></div>
                <div className="col-span-1 text-center"><h5 className="text-lg font-semibold">PREMIUM</h5> <span className="text-xs ">Executive Edge</span></div>
                <div className="col-span-1 text-center"><h5 className="text-lg font-semibold">ENTERPRISE</h5> <span className="text-xs ">Ultimate Talent Solution</span></div>

            </div>
            {
                [1, 2].map((item) =>
                    <div className="bg-blue-100  grid grid-cols-1  mt-4 p-2 border border-balck-1 shadow-md rounded-md flex  justify-between mx-auto">
                        <div className="grid grid-cols-24 mb-3 px-2">
                            <h4 className="text-xl font-semibold mt-8">JOB ADVERTISEMENTS</h4>
                        </div>

                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Number of Job Units Per Month</div>
                            <div className="col-span-1  text-xs text-center">3</div>
                            <div className="col-span-1 text-xs text-center">7</div>
                            <div className="col-span-1 text-xs text-center">10</div>
                            <div className="col-span-1 text-xs text-center">Unlimited</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Job Listing</div>
                            <div className="col-span-1  text-xs text-center">Standard Listing</div>
                            <div className="col-span-1 text-xs text-center">Prior Listing</div>
                            <div className="col-span-1 text-xs text-center">Premium Listing With Higher Visibility</div>
                            <div className="col-span-1 text-xs text-center">Fully Customizable Advertising Campaigns</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Social Media Promotion of Job Ads With Targeted Audience
                            </div>
                            <div className="col-span-1  text-xs text-center">Normal</div>
                            <div className="col-span-1 text-xs text-center">Higher Visibility
                            </div>
                            <div className="col-span-1 text-xs text-center">Higher Visibility
                            </div>
                            <div className="col-span-1 text-xs text-center">Highest Visibility
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Job Alert Email to Jobseekers</div>
                            <div className="col-span-1  text-xs text-center">Standard Alert</div>
                            <div className="col-span-1 text-xs text-center">Customizable Alert</div>
                            <div className="col-span-1 text-xs text-center">Customizable Alert</div>
                            <div className="col-span-1 text-xs text-center">Fully Customizable Email Campaings</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Logo Placement on Job Ads</div>
                            <div className="col-span-1  text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">B2B Email as Featured Companies</div>
                            <div className="col-span-1  text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Email Notifications for New Applicants</div>
                            <div className="col-span-1  text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Analystic & Reporting</div>
                            <div className="col-span-1  text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">API Integration with HR Systems</div>
                            <div className="col-span-1  text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Exclusive Access to Premium Advertising Placements</div>
                            <div className="col-span-1  text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 p-2">
                            <div className="col-span-2 text-base font-medium ">Comprehensive Analytics & Reporting on Campaign Performance</div>
                            <div className="col-span-1  text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">-</div>
                            <div className="col-span-1 text-xs text-center">Yes</div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default page