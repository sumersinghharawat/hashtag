import * as React from 'react';
import testimonialDummy from '../../images/testimonial-dummy.png';
import { Carousel } from 'flowbite-react';
import testimonialImage1 from './../../images/testimonials/image-1.png';
import testimonialImage2 from './../../images/testimonials/image-2.png';
import testimonialImage3 from './../../images/testimonials/image-3.png';
import '../../../css/testimonial.css'

export const Testimonial = (props) => {


    return (
        <div className='slider'>
            <div className="flex gap-8 slide-track">
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage1} className="w-11 h-11"/>
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ahmed Ali</h2>
                            <p className="text-sm text-gray-500">CEO of Fintech Innovations FZC</p>
                        </div>
                    </div>
                    <p>Kick Start's online platform made the process of starting a business in the UAE incredibly convenient. Their user-friendly interface, combined with their expert guidance, made the entire experience seamless. I'm grateful for their assistance and would definitely use their services again in the future.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage2} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Maria Garcia</h2>
                            <p className="text-sm text-gray-500">Founder of Education Solutions ME</p>
                        </div>
                    </div>
                    <p>Kick Start exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage3} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ali Khan</h2>
                            <p className="text-sm text-gray-500">CEO of Logistics Solutions FZE</p>
                        </div>
                    </div>
                    <p>I can't thank Kick Start enough for their support throughout the process of setting up my business in the UAE.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage1}  className="w-11 h-11"/>
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ahmed Ali</h2>
                            <p className="text-sm text-gray-500">CEO of Fintech Innovations FZC</p>
                        </div>
                    </div>
                    <p>I was impressed by Kick Start's dedication to customer satisfaction. They went above and beyond to address all my concerns and ensure that the process of obtaining my Emirates ID and UAE visa was smooth and stress-free.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage2} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Maria Garcia</h2>
                            <p className="text-sm text-gray-500">Founder of Education Solutions ME</p>
                        </div>
                    </div>
                    <p>Kick Start exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage3} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ali Khan</h2>
                            <p className="text-sm text-gray-500">CEO of Logistics Solutions FZE</p>
                        </div>
                    </div>
                    <p>I can't thank Kick Start enough for their support throughout the process of setting up my business in the UAE.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage1}  className="w-11 h-11"/>
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ahmed Ali</h2>
                            <p className="text-sm text-gray-500">CEO of Fintech Innovations FZC</p>
                        </div>
                    </div>
                    <p>I was impressed by Kick Start's dedication to customer satisfaction. They went above and beyond to address all my concerns and ensure that the process of obtaining my Emirates ID and UAE visa was smooth and stress-free.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage2} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Maria Garcia</h2>
                            <p className="text-sm text-gray-500">Founder of Education Solutions ME</p>
                        </div>
                    </div>
                    <p>Kick Start exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage3} className="w-11 h-11" />
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ali Khan</h2>
                            <p className="text-sm text-gray-500">CEO of Logistics Solutions FZE</p>
                        </div>
                    </div>
                    <p>I can't thank Kick Start enough for their support throughout the process of setting up my business in the UAE.</p>
                </div>
                <div className="flex flex-col w-3/12 gap-8 p-8 bg-white slide testimonial rounded-3xl" >
                    <div className="flex items-center gap-4">
                        <img src={testimonialImage1}  className="w-11 h-11"/>
                        <div className="flex flex-col justify-start">
                            <h2 className="text-2xl font-bold">Ahmed Ali</h2>
                            <p className="text-sm text-gray-500">CEO of Fintech Innovations FZC</p>
                        </div>
                    </div>
                    <p>I was impressed by Kick Start's dedication to customer satisfaction. They went above and beyond to address all my concerns and ensure that the process of obtaining my Emirates ID and UAE visa was smooth and stress-free.</p>
                </div>
            </div>
        </div>
    );
};
