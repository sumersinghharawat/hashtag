import * as React from 'react';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: ".process-line-1",
      start: "top top",
      end: "bottom 30%",
      markers:true
    },
});


export const FastEasyProcess = (props) => {
    return (
        <div className="bg-blue-50" id='process'>
            <div className="container flex flex-row flex-wrap justify-between h-full mx-auto md:items-center md:flex-col md:py-36 py-14">
                <h3 className="w-full pb-4 text-4xl font-bold text-center">Fast & Easy Process</h3>
                <div className="flex-col justify-between hidden w-1/5 gap-4 md:flex md:flex-row md:mt-16 md:w-full steps-counts md:gap-0">
                    <div className="items-center justify-center hidden w-full h-full text-lg font-bold text-center md:flex md:w-3/12 step-count-1">
                        Step 1
                    </div>
                    <div className="items-center justify-center hidden w-full h-full text-lg font-bold text-center md:flex md:w-3/12 step-count-2">
                        Step 2
                    </div>
                    <div className="items-center justify-center hidden w-full h-full text-lg font-bold text-center md:flex md:w-3/12 step-count-3">
                        Step 3
                    </div>
                    <div className="items-center justify-center hidden w-full h-full text-lg font-bold text-center md:flex md:w-3/12 step-count-4">
                        Step 4
                    </div>
                </div>
                <div className='flex-col justify-between hidden w-1/5 md:flex-row md:flex md:justify-center md:w-full process-lines'>
                    <div className='flex justify-center w-3/12 process'>
                        <div className='process-dot'></div>
                        <div className='absolute h-1 bg-gray-200 process-line process-line-1'></div>
                    </div>
                    <div className='flex justify-center w-3/12 process'>
                        <div className='process-dot'></div>
                        <div className='absolute h-1 bg-gray-200 process-line process-line-2'></div>
                    </div>
                    <div className='flex justify-center w-3/12 process'>
                        <div className='process-dot'></div>
                        <div className='absolute h-1 bg-gray-200 process-line process-line-3'></div>
                    </div>
                    <div className='flex justify-center w-3/12 process'>
                        <div className='process-dot'></div>
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full gap-4 md:flex-row md:w-full steps md:gap-0">
                    <div className="w-4/5 p-4 mx-auto text-center bg-white md:p-8 md:mx-12 md:w-3/12 md:m-0 step-1 rounded-3xl">
                        <div className="flex items-center justify-center py-2 text-base font-bold text-center text-white bg-black rounded-full min-w-min md:hidden md:w-3/12">
                            Step 1
                        </div>
                        <h4 className="mt-6 mb-2 text-xl font-bold">Submit Details</h4>
                        <p>Provide us with your business details and requirements to initiate the process.</p>
                    </div>
                    <div className="w-4/5 p-4 mx-auto text-center bg-white md:p-8 md:mx-12 md:w-3/12 md:m-0 step-2 rounded-3xl">
                        <div className="flex items-center justify-center py-2 text-base font-bold text-center text-white bg-black rounded-full min-w-min md:hidden md:w-3/12">
                            Step 2
                        </div>
                        <h4 className="mt-6 mb-2 text-xl font-bold">Pay Service Fee</h4>
                        <p>Once your details are submitted, proceed to pay the service fee to initiate company registration process.</p>
                    </div>
                    <div className="w-4/5 p-4 mx-auto text-center bg-white md:p-8 md:mx-12 md:w-3/12 md:m-0 step-3 rounded-3xl">
                        <div className="flex items-center justify-center py-2 text-base font-bold text-center text-white bg-black rounded-full min-w-min md:hidden md:w-3/12">
                            Step 3
                        </div>
                        <h4 className="mt-6 mb-2 text-xl font-bold">Share Documents</h4>
                        <p>Share the necessary documents required for company registration, and our team will handle the entire process.</p>
                    </div>
                    <div className="w-4/5 p-4 mx-auto text-center bg-white md:p-8 md:mx-12 md:w-3/12 md:m-0 step-4 rounded-3xl">
                        <div className="flex items-center justify-center py-2 text-base font-bold text-center text-white bg-black rounded-full min-w-min md:hidden md:w-3/12">
                            Step 4
                        </div>
                        <h4 className="mt-6 mb-2 text-xl font-bold">Trade License Issued</h4>
                        <p>Upon successful verification and processing, you will receive your issued trade license.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
