import * as React from 'react';
import FounderAuthenticatedLayout from '@/Layouts/FounderAuthenticatedLayout';
import womenPng from '../../../images/women-png.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionBody, AccordionHeader, Carousel, company_count } from '@material-tailwind/react';

export default function Support({auth, company_count}) {

    const [openAccordion, setOpenAccordion] = React.useState(0);


    const changeAccordion = (accordionNumber) => {
        setOpenAccordion(accordionNumber);
    }

    return (
        <>
        <FounderAuthenticatedLayout
            company_count={company_count}
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Founder Dashboard</h2>}
        >
            <div className="md:py-12">
                <div className="bg-gray-200">
                    <div className="container flex items-center mx-auto md:w-2/3">
                        <div className="w-8/12">
                            <h2 className="text-4xl font-semibold">We're here to help!</h2>
                            <p className="mt-4 pr-11">Whether you have questions, need assistance, or require more information, our dedicated support team is ready to assist you. Reach out to us via email, phone, or chat, and we’ll ensure you get the help you need.</p>
                        </div>
                        <div className="w-4/12">
                            <img src={womenPng} />
                        </div>
                    </div>
                </div>
                <div className="container flex items-center mx-auto md:w-2/3">
                    <div className="flex w-full mb-12 -mt-12 bg-white shadow-xl p-9 rounded-3xl">
                        <div className="flex flex-wrap w-2/5 gap-6 border-r">
                            <div className="w-full">
                                <a href="" className="text-primary">info@incorpx.com</a>
                                <p>Email Us</p>
                            </div>
                            <div className="w-full">
                                <a href="" className="text-primary">+971 50 000 0000</a>
                                <p>Call Us</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-3/5 gap-4 pl-10">
                            <h3 className="text-2xl font-bold">Chat Now</h3>
                            <p className="text-gray-500">Chat for quick help on product issues, your account, and more.</p>
                            <PrimaryButton className='h-12 gap-2 p-0 leading-3 w-max'>Chat Now <FontAwesomeIcon icon={faChevronRight} style={{height:14, width:14}} /></PrimaryButton>
                            <p className="text-gray-500">Availability: Monday to Saturday, 9AM - 7PM</p>
                        </div>
                    </div>
                </div>
                <div className="container flex flex-col items-center mx-auto md:w-2/3">
                    <div className="flex flex-col w-full gap-4 pl-10">
                        <h2 className="text-4xl font-semibold">FAQs</h2>
                        <p className="mt-4 pr-11">Welcome to our Frequently Asked Questions page. Here, you’ll find detailed answers to the most common inquiries about our services. Explore the sections below to get quick, helpful information and resolve your queries with ease.</p>
                    </div>
                    <div className="w-full p-10 mt-8 bg-white shadow-xl md:w-full rounded-3xl">
                        <Accordion open={openAccordion === 0} icon={<FontAwesomeIcon icon={openAccordion === 0?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(0)} className="border-0">Can I incorporate a UAE company from anywhere in the world?</AccordionHeader>
                            <AccordionBody>Absolutely! incorpX's online platform allows you to incorporate your UAE company from anywhere in the world. Our streamlined process ensures that distance is no barrier to starting your business in the UAE.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 1} icon={<FontAwesomeIcon icon={openAccordion === 1?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(1)} className="border-0">What is a Freezone company?</AccordionHeader>
                            <AccordionBody>A Freezone company is a business entity established within one of the many Freezones in the UAE. These zones offer various incentives such as 100% foreign ownership, tax exemptions, and simplified customs procedures, making them an attractive option for startups and businesses.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 2} icon={<FontAwesomeIcon icon={openAccordion === 2?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(2)} className="border-0">What is a Mainland company?</AccordionHeader>
                            <AccordionBody>A Mainland company is a business entity registered and licensed to operate within the mainland territory of the UAE. Unlike Freezone companies, Mainland companies can engage in business activities across the UAE without restrictions on geographic location.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 3} icon={<FontAwesomeIcon icon={openAccordion === 3?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(3)} className="border-0">Can I get a trade license without a visa?</AccordionHeader>
                            <AccordionBody>In most cases, a visa is required to obtain a trade license in the UAE. However, specific requirements may vary depending on the type of business and the jurisdiction. Our team will guide you through the visa application process to ensure compliance with UAE regulations.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 4} icon={<FontAwesomeIcon icon={openAccordion === 4?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(4)} className="border-0">How long does it take to set up a business with incorpX?</AccordionHeader>
                            <AccordionBody>With incorpX's efficient processes and expert assistance, you can expect to set up your business in the UAE within a matter of weeks. From company incorporation to obtaining your Emirates ID and UAE visa, our team works diligently to expedite the process and get your business up and running as quickly as possible.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 5} icon={<FontAwesomeIcon icon={openAccordion === 5?faPlus:faMinus}/>} className="px-6 my-4 bg-gray-100 rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(5)} className="border-0">Why are there three different charges?</AccordionHeader>
                            <AccordionBody>The charges include the service fee for incorpX, the trade license fee charged by the respective authority (Freezone or Mainland), and the visa fee. Each fee covers specific aspects of the setup process, ensuring a smooth and compliant incorporation of your business in the UAE.</AccordionBody>
                        </Accordion>
                    </div>
                </div>
            </div>
        </FounderAuthenticatedLayout>
        </>
    );
};
