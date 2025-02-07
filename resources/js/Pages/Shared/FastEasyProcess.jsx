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

import step_image_1 from '../../images/step-1.png';
import step_image_2 from '../../images/step-2.png';
import step_image_3 from '../../images/step-3.png';
import step_image_4 from '../../images/step-4.png';

export const FastEasyProcess = (props) => {
    return (
        <div className="bg-primary" id='process'>
            <div className="container flex flex-row flex-wrap justify-between h-full mx-auto md:items-center md:flex-col md:py-36 py-14">
                <h3 className="w-full pb-4 font-manrope text-[64px] text-center">Fast & Easy Process</h3>

                <div className='flex-col justify-between hidden w-1/5 md:flex-row md:flex md:justify-center md:w-full process-lines'>
                    <div className='flex justify-center w-3/12 process' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_1} className='w-full' />
                    </div>
                    <div className='flex justify-center w-3/12 process' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_2} className='w-full' />
                    </div>
                    <div className='flex justify-center w-3/12 process' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_3} className='w-full' />
                    </div>
                    <div className='flex justify-center w-3/12 process' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_4} className='w-full' />
                    </div>
                </div>
                <div className='relative flex-col justify-between hidden w-full overflow-hidden md:flex-row md:flex md:justify-center md:w-full process-lines' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                    <div className="process-data"></div>
                    <div className='flex flex-col items-start justify-center w-3/12 process'>
                        <div className='w-32 text-center process-dot'>Step 1</div>
                        <div className='absolute h-[1px] bg-gray-200 process-line process-line-1'></div>
                    </div>
                    <div className='flex flex-col items-start justify-center w-3/12 process'>
                        <div className='w-32 text-center process-dot'>Step 2</div>
                        <div className='absolute h-[1px] bg-gray-200 process-line process-line-2'></div>
                    </div>
                    <div className='flex flex-col items-start justify-center w-3/12 process'>
                        <div className='w-32 text-center process-dot'>Step 3</div>
                        <div className='absolute h-[1px] bg-gray-200 process-line process-line-3'></div>
                    </div>
                    <div className='flex flex-col items-start justify-center w-3/12 process'>
                        <div className='w-32 text-center process-dot'>Step 4</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full gap-4 md:flex-row md:w-full steps md:gap-0 ">
                    <div className="w-4/5 py-4 mx-auto md:py-2 md:mx-12 md:w-3/12 md:m-0 step-1 rounded-3xl" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_1} className='block w-full lg:hidden' />
                        <h4 className="mt-0 mb-2 text-[28px] font-manrope font-medium">Create Your Account</h4>
                        <p className="text-base font-manrope">Sign up quickly and easily to begin your business journey in the UAE.</p>
                    </div>
                    <div className="w-4/5 py-4 mx-auto md:py-2 md:mx-12 md:w-3/12 md:m-0 step-2 rounded-3xl" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_2} className='block w-full lg:hidden' />
                        <h4 className="mt-0 mb-2 text-[28px] font-manrope font-medium">Enter Basic Information</h4>
                        <p className="text-base font-manrope">Provide basic information about your company.</p>
                    </div>
                    <div className="w-4/5 py-4 mx-auto md:py-2 md:mx-12 md:w-3/12 md:m-0 step-3 rounded-3xl" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_3} className='block w-full lg:hidden' />
                        <h4 className="mt-0 mb-2 text-[28px] font-manrope font-medium">Upload Document</h4>
                        <p className="text-base font-manrope">Easily upload the required documents to your dashboard</p>
                    </div>
                    <div className="w-4/5 py-4 mx-auto md:py-2 md:mx-12 md:w-3/12 md:m-0 step-4 rounded-3xl" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" transition="ease-in-out">
                        <img src={step_image_4} className='block w-full lg:hidden' />
                        <h4 className="mt-0 mb-2 text-[28px] font-manrope font-medium">Trade License Issued</h4>
                        <p className="text-base font-manrope">Sit back while we file the legal paperwork with UAE authorities.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
