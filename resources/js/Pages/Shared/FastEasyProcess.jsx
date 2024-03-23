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
            <div className="container flex flex-col items-center justify-between h-full mx-auto py-36">
                <h3 className="pb-4 text-4xl font-bold">Fast & Easy Process</h3>
                <div className="flex justify-between w-full mt-16 steps-counts">
                    <div className="w-3/12 text-lg font-bold text-center step-count-1">
                        Step 1
                    </div>
                    <div className="w-3/12 text-lg font-bold text-center step-count-2">
                        Step 2
                    </div>
                    <div className="w-3/12 text-lg font-bold text-center step-count-3">
                        Step 3
                    </div>
                    <div className="w-3/12 text-lg font-bold text-center step-count-4">
                        Step 4
                    </div>
                </div>
                <div className='flex justify-center w-full process-lines'>
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
                <div className="flex justify-between w-full steps">
                    <div className="w-3/12 p-8 mx-12 text-center bg-white step-1 rounded-3xl">
                        <h4 className="mb-2 text-xl font-bold">Submit Details</h4>
                        <p>Provide us with your business details and requirements to initiate the process.</p>
                    </div>
                    <div className="w-3/12 p-8 mx-12 text-center bg-white step-2 rounded-3xl">
                        <h4 className="mb-2 text-xl font-bold">Pay Service Fee</h4>
                        <p>Once your details are submitted, proceed to pay the service fee to initiate company registration process.</p>
                    </div>
                    <div className="w-3/12 p-8 mx-12 text-center bg-white step-3 rounded-3xl">
                        <h4 className="mb-2 text-xl font-bold">Upload Documents</h4>
                        <p>Upload the necessary documents required for company registration, and our team will handle the entire process.</p>
                    </div>
                    <div className="w-3/12 p-8 mx-12 text-center bg-white step-4 rounded-3xl">
                        <h4 className="mb-2 text-xl font-bold">Trade License Issued</h4>
                        <p>Upon successful verification and processing, you will receive your issued trade license.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
