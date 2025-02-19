import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// import { Autoplay, Pagination, Navigation } from "swiper";

// import SwiperCore from 'swiper';
import testimonialImage1 from './../../images/testimonials/image-1.png';
import testimonialImage2 from './../../images/testimonials/image-2.png';
import testimonialImage3 from './../../images/testimonials/image-3.png';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../css/testimonial.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useCallback, useEffect, useState } from 'react';

// SwiperCore.use([Keyboard]);

export const Testimonial = (props) => {

    const sliderRef = useRef(null);


    const handlePrev = useCallback(() => {
        // console.log(sliderRef.current);
        if (!sliderRef.current) return;
        sliderRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        // console.log(sliderRef.current);
        if (!sliderRef.current) return;
        sliderRef.current.slideNext();
    }, []);



    const testimonials = [
        {
            image: testimonialImage1,
            name: 'Ahmed Ali',
            title: 'CEO of Fintech Innovations FZC',
            description: 'incorpX\'s online platform made the process of starting a business in the UAE incredibly convenient. Their user-friendly interface, combined with their expert guidance, made the entire experience seamless. I\'m grateful for their assistance and would definitely use their services again in the future.'
        },
        {
            image: testimonialImage2,
            name: 'Maria Garcia',
            title: 'Founder of Education Solutions ME',
            description: 'incorpX exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.'
        },
        {
            image: testimonialImage3,
            name: 'Ali Khan',
            title: 'CEO of Logistics Solutions FZE',
            description: 'I can\'t thank incorpX enough for their support throughout the process of setting up my business in the UAE.'
        },
        {
            image: testimonialImage1,
            name: 'Ahmed Ali',
            title: 'CEO of Fintech Innovations FZC',
            description: 'incorpX\'s online platform made the process of starting a business in the UAE incredibly convenient. Their user-friendly interface, combined with their expert guidance, made the entire experience seamless. I\'m grateful for their assistance and would definitely use their services again in the future.'
        },
        {
            image: testimonialImage2,
            name: 'Maria Garcia',
            title: 'Founder of Education Solutions ME',
            description: 'incorpX exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.'
        },
        {
            image: testimonialImage3,
            name: 'Ali Khan',
            title: 'CEO of Logistics Solutions FZE',
            description: 'I can\'t thank incorpX enough for their support throughout the process of setting up my business in the UAE.'
        },
        {
            image: testimonialImage1,
            name: 'Ahmed Ali',
            title: 'CEO of Fintech Innovations FZC',
            description: 'incorpX\'s online platform made the process of starting a business in the UAE incredibly convenient. Their user-friendly interface, combined with their expert guidance, made the entire experience seamless. I\'m grateful for their assistance and would definitely use their services again in the future.'
        },
        {
            image: testimonialImage2,
            name: 'Maria Garcia',
            title: 'Founder of Education Solutions ME',
            description: 'incorpX exceeded my expectations in every way. Their team was knowledgeable, responsive, and committed to delivering results. Thanks to their assistance, I was able to launch my business in the UAE with confidence.'
        },
        {
            image: testimonialImage3,
            name: 'Ali Khan',
            title: 'CEO of Logistics Solutions FZE',
            description: 'I can\'t thank incorpX enough for their support throughout the process of setting up my business in the UAE.'
        }
    ];


    return (
        <>
        <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    loop={true}
                    autoplay={{
                        delay: 100,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                    }}
                    speed={10000}
                    onSwiper={(swiper) => (sliderRef.current = swiper)}
                    modules={[Autoplay, Navigation]}
                    >
            {testimonials.map((testimonial, index) => {
                return <SwiperSlide key={index} className="my-24" slot={index==0?"container-start":index==testimonials.length-1?"container-end":""}>
                    <div className="flex flex-col w-full gap-8 p-8 bg-white h-80 rounded-3xl shadow-box">
                        <div className="flex items-center gap-4">
                            <img src={testimonial.image} className="w-11 h-11"/>
                            <div className="flex flex-col justify-start">
                                <h2 className="text-2xl font-bold">{testimonial.name}</h2>
                                <p className="text-sm text-gray-500">{testimonial.title}</p>
                            </div>
                        </div>
                        <p>{testimonial.description}</p>
                    </div>
                </SwiperSlide>
            })}
        </Swiper>
            <div className="flex items-center justify-center hidden gap-4">
                <button className={"flex items-center justify-center w-16 h-16 rounded-full "} onClick={handlePrev} style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className={"flex items-center justify-center w-16 h-16 rounded-full"} onClick={handleNext} style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );
};

