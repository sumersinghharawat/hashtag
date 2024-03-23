import ApplicationLogo from '@/Components/ApplicationLogo';
import { faArrowAltCircleLeft, faArrowRight, faBagShopping, faBank, faBold, faBolt, faBucket, faBuilding, faBuildingShield, faBuildingUn, faBuildingWheat, faBusinessTime, faChevronRight, faCube, faGreaterThan, faMinus, faPlus, faThunderstorm, faTruckArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Transition } from '@headlessui/react';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, Carousel } from '@material-tailwind/react';
import { FastEasyProcess } from './Shared/FastEasyProcess';
import { Testimonial } from './Shared/Testimonial';
import logo from '../images/Logo.png';
import serviceDummyImage from './../images/demo-service.png';
import freeConsultation from './../Icons/free-consultation.svg';
import footerImage from './../Icons/dubai-skeleton.svg';
import freeConsultationPerson from './../images/free-consultation-person.png';
import setupYourUaeCompany from './../Icons/setup-your-uae-company.svg';
import landingPageVideo from './../videos/landing-page-video.mp4';
import faqs from './../images/faqs.png';
import hashtag from './../images/hashtag.png';
import { PopUpForm } from './Shared/PopUpForm';

export default function Welcome({ auth, laravelVersion, phpVersion, emailSent }) {

    const [role, setRole] = useState('');
    const [popUp, setPopUp] = useState(false);
    const videoRef = useRef(null);

    const [packagesCount, setPackagesCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(0);

    const changePackage = (packageNumber) => {
        setPackagesCount(packageNumber);
    }

    const changeService = (serviceNumber) => {
        setServiceCount(serviceNumber);
    }

    const changeAccordion = (accordionNumber) => {
        setOpenAccordion(accordionNumber);
    }

    const showPopUp = () => {
        setPopUp(!popUp);
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


    useEffect(()=>{
        if (videoRef.current) {
            videoRef.current.playbackRate = 1;
        }
        if(auth.user?.roles){
            auth.user.roles.map((element)=>{
                setRole(element.name);
            })
        }
    });


    return (
        <>
            {popUp?<PopUpForm showPopUp={showPopUp} emailSent={emailSent}/>:<></>}
            <Head title="Welcome" />
            <div className="flex items-center justify-center gap-8 align-middle bg-black bg-center h-14">
                    <p className='text-white'>Have questions about company formation?</p> <button onClick={showPopUp} className='px-10 py-2 text-white bg-black border-2 border-white rounded-full'>Free consultation<FontAwesomeIcon style={{fontSize: "12px"}} className='ml-3' icon={faChevronRight} /></button>
            </div>
            <div className="flex items-center justify-between h-full mx-auto lg:container">
                <div className="flex items-center gap-14 text-start">
                    <Link href="/">
                        <ApplicationLogo className="object-contain h-20 fill-current w-36" />
                    </Link>
                    <a href="#services" className="text-base font-semibold leading-6 text-gray-900">
                        Services
                    </a>
                    <a href="#process" className="text-base font-semibold leading-6 text-gray-900">
                        Process
                    </a>
                    <a href="#pricing" className="text-base font-semibold leading-6 text-gray-900">
                        Pricing
                    </a>
                    <a href="#faqs" className="text-base font-semibold leading-6 text-gray-900">
                        FAQs
                    </a>
                    <a href="#testimonial" className="text-base font-semibold leading-6 text-gray-900">
                        Testimonials
                    </a>
                </div>
                <div className="p-6 text-end">
                    {auth.user ? (
                        <>{(role == "founder")?
                        <Link
                        href={route('founder.dashboard')}
                        className='primary-button'
                    >
                        My Profile
                    </Link>
                        :<Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>}</>
                    ) : (
                        <div className='flex items-center gap-8'>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-90 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Sign in
                            </Link>

                            <Link
                                href={route('register')}
                                className='primary-button'
                            >
                                Start your business<FontAwesomeIcon style={{fontSize: "12px"}} className='ml-3' icon={faChevronRight} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex items-center py-20 mx-auto lg:container'>
                <div className="w-6/12 mr-20">
                    <h2 className="mb-8 font-lg heading-1">Start Your UAE Business from Anywhere and Stay Fully Compliant.</h2>
                    <p className="mb-8 font-base">
                        At Kick Start, we believe that every startup deserves a chance to thrive. We're here to provide you with the tools, resources, and support you need to turn your innovative ideas into successful ventures.
                    </p>
                    <div className='flex items-center gap-10'>
                        <Link
                            href={route('register')}
                            className="primary-button"
                        >
                            Start your business<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} />
                        </Link>
                        <button type='button'
                            onClick={showPopUp}
                            className='px-10 py-4 text-black bg-gray-200 rounded-full secondary-button'
                        >
                            Free consultation
                        </button>
                    </div>

                </div>
                <div className="flex justify-center w-6/12 h-full">
                    <div className="relative mx-20 aspect-auto">
                        <img src={freeConsultationPerson} className="free-consulation-person"/>
                        <img src={freeConsultation} className="free-consulation"/>
                        <img src={setupYourUaeCompany} className="setup-your-uae-company"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between h-full mx-auto bg-sky-50 pt-36" id="services">
                <div className="mx-auto text-center" style={{maxWidth:"900px"}}>
                    <h3 className="pb-4 text-4xl font-bold">Form a Legal Entity in UAE</h3>
                    <p className='pb-4 '>At Kick Start, we understand the importance of choosing the right legal entity for your business. Our expert team will guide you through the process, helping you select the entity type that best suits your needs and goals. Whether you're considering a Freezone company, mainland business, or offshore entity, we've got you covered.</p>
                    <div className="flex justify-between pb-4 mx-auto" style={{maxWidth:"700px"}}>
                        <div className="px-4 py-2 text-black bg-teal-100 rounded-xl"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />Automated Platform</div>
                        <div className="px-4 py-2 text-black bg-cyan-100 rounded-xl"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />End to End Process</div>
                        <div className="px-4 py-2 text-black rounded-xl bg-rose-50"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />Company Registration</div>
                    </div>
                    <div className='py-8'>
                        <Link className="px-10 py-4 text-white bg-black rounded-full secondary-button" href={route('register')}>Start Now<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} /></Link>
                    </div>
                    <div className="px-2 pt-2 mt-10 overflow-hidden bg-white form-box">
                        <video className="w-full form-box" autoPlay muted  controls={false} loop  ref={videoRef}>
                            <source src={landingPageVideo} type="video/mp4"/>
                        </video>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col items-center justify-between h-full mx-auto py-36">
                <h3 className="pb-4 text-4xl font-bold">Unlock Your Business Potential</h3>
                <div className="flex gap-8 pt-16">
                    <div className="w-6/12 p-8 bg-emerald-100 rounded-3xl">
                        <span className="px-4 py-2 text-center rounded-lg bg-emerald-200"><FontAwesomeIcon style={{fontSize: "14px"}} className="mr-2" icon={faBuilding} />Visa</span>
                        <h4 className="mt-8 text-2xl font-bold">Get Your Emirates ID and UAE Visa</h4>
                        <p className="py-4">With our expertise, you can expect to receive both your Emirates ID and UAE visa within two weeks of application, allowing you to focus on building your business with confidence. Our service fee includes comprehensive assistance throughout the application process, fast-track processing for efficient results, dedicated support from our knowledgeable team, hassle-free documentation handling, and regular updates on the status of your application. This provides you with peace of mind knowing your visa and Emirates ID are in expert hands.</p>
                        <div className="flex items-center justify-between gap-5 mt-4">
                            <p className='hidden'><sup className='text-base'>*</sup>Included in Service Fee</p>
                            <Link className="hidden px-10 py-4 text-white bg-black rounded-full secondary-button">Formation<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} /></Link>
                        </div>
                    </div>
                    <div className="w-6/12 p-8 bg-cyan-50 rounded-3xl">
                        <span className="px-4 py-2 text-center rounded-lg bg-cyan-100 "><FontAwesomeIcon style={{fontSize: "14px"}} className="mr-2" icon={faBank} />Bank</span>
                        <h4 className="mt-8 text-2xl font-bold">Open Your Business Bank Account</h4>
                        <p className="py-4">Our team will handle all the necessary paperwork and liaise with the banks on your behalf, ensuring a hassle-free experience. Included in the service fee are assistance with all required documentation, expert coordination with banks for seamless processing, guidance through the account opening process, regular updates on the status of your account setup, and peace of mind knowing your business banking needs are efficiently managed. Let us streamline your banking journey and help you focus on growing your business.</p>
                        <div className="flex items-center justify-between gap-5 mt-4">
                            <p className='hidden'><sup className='text-base'>*</sup>Included in Service Fee</p>
                            <Link className="hidden px-10 py-4 text-white bg-black rounded-full secondary-button" href={route('register')}>Start Now<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <FastEasyProcess />
            <div className="container flex items-center justify-between h-full mx-auto py-36" id='pricing'>
                <div className="w-4/12">
                    <h3 className="pb-8 text-4xl font-bold">Our Pricing</h3>
                    <Link
                        href={route('register')}
                        className="primary-button"
                    >
                        Start your business<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} />
                    </Link>
                </div>
                <div className="w-8/12">
                    <div className="p-8 bg-white rounded-3xl">
                        <div className="relative flex items-center gap-4 mb-8">
                            <button  className={"px-10 py-4 rounded-full secondary-button "+(packagesCount==0?"text-white bg-black":"text-black bg-gray-100")} onClick={()=>{changePackage(0)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Freezone Company Formation
                            </button>
                            <button className={"px-10 py-4 rounded-full secondary-button "+(packagesCount==1?"text-white bg-black":"text-black bg-gray-100")} onClick={()=>{changePackage(1)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Mainland Company Formation
                            </button>
                        </div>
                        <div className="flex items-center w-full" style={{display:packagesCount==0?"flex":"none"}}>
                            <div className="w-6/12 h-full border-r-2">
                                <h2 className="text-2xl font-bold">Kick Start Service Fee</h2>
                                <ul className="mt-4 list-disc ms-5">
                                    <li>Expert Consultation</li>
                                    <li>Formation Filings</li>
                                    <li>Annual State Filings</li>
                                    <li>Business bank account opening</li>
                                    <li>Visa and Emirates ID support</li>
                                    <li>Lifetime Compliance Support</li>
                                </ul>
                                <span className="text-sm text-gray-500">State fee not included.</span>
                                <div className="flex items-center gap-2 mt-6">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                            </div>
                            <div className="w-6/12">
                                <div className="py-4 ml-8 border-b-2">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl font-bold">Trade License Fee</h2>
                                        <h2 className="text-2xl font-bold">$2500</h2>
                                    </div>
                                    <ul className="list-disc ms-5">
                                        <li>Trade License Fee</li>
                                        <li>Incorporation certificate</li>
                                        <li>Share percentage certificate</li>
                                    </ul>
                                </div>
                                <div className="mt-4 ml-8">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl font-bold">Visa Fee</h2>
                                        <h2 className="text-2xl font-bold">$1700</h2>
                                    </div>
                                    <ul className="list-disc ms-5">
                                        <li>1 Visa</li>
                                        <li>E-Channel Card</li>
                                        <li>Immigration Card</li>
                                        <li>Medical Test and Emirates ID</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full" style={{display:packagesCount==1?"flex":"none"}}>
                            <div className="w-6/12 h-full border-r-2">
                                <h2 className="text-2xl font-bold">Kick Start Service Fee</h2>
                                <ul className="mt-4 list-disc ms-5">
                                    <li>Expert Consultation</li>
                                    <li>Formation Filings</li>
                                    <li>Annual State Filings</li>
                                    <li>Business bank account opening</li>
                                    <li>Visa and Emirates ID support</li>
                                    <li>Lifetime Compliance Support</li>
                                </ul>
                                <span className="text-sm text-gray-500">State fee not included.</span>
                                <div className="flex items-center gap-2 mt-6">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                            </div>
                            <div className="w-6/12">
                                <div className="py-4 ml-8 border-b-2">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl font-bold">Trade License Fee</h2>
                                        <h2 className="text-2xl font-bold">$3500</h2>
                                    </div>
                                    <ul className="list-disc ms-5">
                                        <li>Trade License Fee</li>
                                        <li>Incorporation certificate</li>
                                        <li>Share percentage certificate</li>
                                    </ul>
                                </div>
                                <div className="mt-4 ml-8">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl font-bold">Visa Fee</h2>
                                        <h2 className="text-2xl font-bold">$2700</h2>
                                    </div>
                                    <ul className="list-disc ms-5">
                                        <li>3 Visa</li>
                                        <li>E-Channel Card</li>
                                        <li>Immigration Card</li>
                                        <li>Medical Test and Emirates ID</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full py-24 other-service-section">
                <div className="container flex items-center justify-between mx-auto ">
                    <div className="w-6/12 pe-36">
                        <div className="px-4 py-2 text-center text-black bg-teal-100 w-52 rounded-xl">
                            <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />Other Services
                        </div>
                        <h3 className="pb-8 mt-4 text-4xl font-bold">Other Add On Comprehensive Business Solutions Tailored for Your Business Success</h3>
                        <div className="flex flex-wrap gap-4 mr-4">
                            <button  className={"px-6 py-4 rounded-full secondary-button "+(serviceCount==0?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(0)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Accounting
                            </button>
                            <button  className={"px-6 py-4 rounded-full secondary-button "+(serviceCount==1?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(1)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBolt} />Legal Drafting Services
                            </button>
                            <button  className={"px-6 py-4 rounded-full secondary-button "+(serviceCount==2?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(2)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBagShopping} />Attestation Services
                            </button>
                            <button  className={"px-6 py-4 rounded-full secondary-button "+(serviceCount==3?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(3)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faUser} />PRO Services
                            </button>
                        </div>
                    </div>
                    <div className="w-6/12">
                        <div className={"flex-col justify-end gap-4 p-16"}  style={{display:serviceCount==0?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Accounting</h2>
                            <p>We offer a range of accounting services to help businesses in Dubai succeed. Our experienced and certified accountants team is dedicated to providing accurate and reliable financial solutions.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 p-16"}  style={{display:serviceCount==1?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Legal drafting services</h2>
                            <p>Legal drafters or attorneys manage legal drafting since they are versed in the legal issues that should be included in a document according to the law. In essence, it is a writer of legally binding texts. </p>
                        </div>
                        <div className={"flex-col justify-end gap-4 p-16"}  style={{display:serviceCount==2?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Attestation services</h2>
                            <p>Attestation services are often required for official or legal purposes, such as for use in foreign countries or for educational or employment purposes. Attestation services are typically provided by government agencies, embassies, and specialized companies.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 p-16"}  style={{display:serviceCount==3?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">PRO Services</h2>
                            <p>We are a team of professionals dedicated to helping businesses manage their public image. With years of experience in the industry, we have the knowledge and expertise to assist you with all of your PRO needs.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col items-center justify-between h-full mx-auto py-36" id='faqs'>
                <h3 className="pb-16 text-4xl font-bold">Frequently Asked Questions (FAQ)</h3>
                <div className="flex items-center">
                    <div className="flex justify-center w-6/12 h-full">
                        <div className="relative py-4 mx-20 aspect-auto">
                            <img src={faqs} className="w-full h-full" />
                        </div>
                    </div>
                    <div className="w-6/12">
                        <Accordion open={openAccordion === 0} icon={<FontAwesomeIcon icon={openAccordion === 0?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(0)} className="border-0">Can I incorporate a UAE company from anywhere in the world?</AccordionHeader>
                            <AccordionBody>Absolutely! Kick Start's online platform allows you to incorporate your UAE company from anywhere in the world. Our streamlined process ensures that distance is no barrier to starting your business in the UAE.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 1} icon={<FontAwesomeIcon icon={openAccordion === 1?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(1)} className="border-0">What is a Freezone company?</AccordionHeader>
                            <AccordionBody>A Freezone company is a business entity established within one of the many Freezones in the UAE. These zones offer various incentives such as 100% foreign ownership, tax exemptions, and simplified customs procedures, making them an attractive option for startups and businesses.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 2} icon={<FontAwesomeIcon icon={openAccordion === 2?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(2)} className="border-0">What is a Mainland company?</AccordionHeader>
                            <AccordionBody>A Mainland company is a business entity registered and licensed to operate within the mainland territory of the UAE. Unlike Freezone companies, Mainland companies can engage in business activities across the UAE without restrictions on geographic location.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 3} icon={<FontAwesomeIcon icon={openAccordion === 3?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(3)} className="border-0">Can I get a trade license without a visa?</AccordionHeader>
                            <AccordionBody>In most cases, a visa is required to obtain a trade license in the UAE. However, specific requirements may vary depending on the type of business and the jurisdiction. Our team will guide you through the visa application process to ensure compliance with UAE regulations.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 4} icon={<FontAwesomeIcon icon={openAccordion === 4?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(4)} className="border-0">How long does it take to set up a business with Kick Start?</AccordionHeader>
                            <AccordionBody>With Kick Start's efficient processes and expert assistance, you can expect to set up your business in the UAE within a matter of weeks. From company incorporation to obtaining your Emirates ID and UAE visa, our team works diligently to expedite the process and get your business up and running as quickly as possible.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 5} icon={<FontAwesomeIcon icon={openAccordion === 5?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(5)} className="border-0">Why are there three different charges?</AccordionHeader>
                            <AccordionBody>The charges include the service fee for Kick Start, the trade license fee charged by the respective authority (Freezone or Mainland), and the visa fee. Each fee covers specific aspects of the setup process, ensuring a smooth and compliant incorporation of your business in the UAE.</AccordionBody>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="h-full bg-blue-50 py-36" id="testimonial">
                <div className="container flex flex-col items-center justify-between h-full mx-auto">
                    <h3 className="pb-16 text-4xl font-bold">See what client say about Kick Start</h3>
                </div>
                <Testimonial />
            </div>
            <div className="h-full py-36">
                <div className="py-16 mx-auto bg-secondary rounded-3xl" style={{maxWidth:"1074px"}}>
                    <h3 className="pb-8 mx-48 text-5xl font-bold text-center text-white">Register your entity in UAE and keep it 100% compliant</h3>
                    <p className="pb-8 text-base text-center text-white">Turn your dream idea into your dream business.</p>
                    <div className="flex justify-center gap-8">
                        <Link href='/register'  className={"px-10 py-4 rounded-full secondary-button text-white bg-black"}>
                            Start your business
                        </Link>
                        <button  className={"px-10 py-4 rounded-full secondary-button text-black bg-white"} onClick={showPopUp}>
                            Free consultation
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-full py-40" style={{background:"url("+footerImage+")",backgroundSize:"110% 100%",backgroundPosition:"30% 100%",backgroundRepeat:"no-repeat"}}>
                <div className="container flex flex-col items-center justify-center py-4 mx-auto">
                    <ApplicationLogo className="object-contain h-20 fill-current w-46" />
                    <p>
                        Powered by
                    </p>
                    <img src={hashtag} className="h-full -m-4 w-ful" />
                </div>
            </div>
            <div className="bg-secondary">
                <div className="container flex justify-between py-4 mx-auto">
                    <div className="">
                        <p className="text-white">Copyrights © 2024 Kick Start | Developed by <a className='font-bold' href='https://www.nayagroup.com' target='_blank'>Naya Group</a></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-base leading-6 text-white">
                            Terms & Conditions
                        </Link>
                        <Link href="#" className="text-base leading-6 text-white">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}
