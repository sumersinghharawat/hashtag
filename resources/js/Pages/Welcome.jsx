import ApplicationLogo from '@/Components/ApplicationLogo';
import { faArrowAltCircleLeft, faArrowRight, faBagShopping, faBank, faBars, faBold, faBolt, faBucket, faBuilding, faBuildingShield, faBuildingUn, faBuildingWheat, faBusinessTime, faChevronRight, faCube, faGreaterThan, faMinus, faPlus, faThunderstorm, faTruckArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Transition } from '@headlessui/react';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, Carousel } from '@material-tailwind/react';
import { FastEasyProcess } from './Shared/FastEasyProcess';
import { Testimonial } from './Shared/Testimonial';
import logo from '../images/incorpX-logo.png';
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
    const [openMenu, setOpenMenu] = useState(true);

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
            <div className="flex flex-col items-center justify-center h-24 gap-2 align-middle bg-black bg-center md:gap-8 md:h-14 md:flex-row">
                    <p className='text-white'>Have questions about company formation?</p> <button onClick={showPopUp} className='px-10 py-2 text-white bg-black border-2 border-white rounded-full'>Free consultation<FontAwesomeIcon style={{fontSize: "12px"}} className='ml-3' icon={faChevronRight} /></button>
            </div>
            <div className="relative flex items-center justify-between h-full px-2 mx-auto lg:container">
                <div className={openMenu?'hidden':'hidden'}></div>
                <Link href="/">
                    <ApplicationLogo className="object-contain h-20 fill-current w-36" />
                </Link>
                <div className="flex items-center justify-between gap-14 text-start">
                    <div className={'absolute hidden flex-col items-center gap-0 md:flex md:flex-row text-start md:gap-14 md:relative w-screen md:w-auto bg-white md:bg-transparent left-0 top-16 md:top-auto'}>
                        <a href="#services" className="flex items-center justify-center w-full py-4 text-base font-semibold leading-6 text-center text-gray-900 border-b md:border-none md:py-0">
                            Services
                        </a>
                        <a href="#process" className="flex items-center justify-center w-full py-4 text-base font-semibold leading-6 text-center text-gray-900 border-b md:border-none md:py-0">
                            Process
                        </a>
                        <a href="#pricing" className="flex items-center justify-center w-full py-4 text-base font-semibold leading-6 text-center text-gray-900 border-b md:border-none md:py-0">
                            Pricing
                        </a>
                        <a href="#faqs" className="flex items-center justify-center w-full py-4 text-base font-semibold leading-6 text-center text-gray-900 border-b md:border-none md:py-0">
                            FAQs
                        </a>
                        <a href="#testimonial" className="flex items-center justify-center w-full py-4 text-base font-semibold leading-6 text-center text-gray-900 border-b md:border-none md:py-0">
                            Testimonials
                        </a>
                    </div>
                </div>
                <div className="px-0 md:p-6 text-end">
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
                                className="hidden font-semibold text-gray-600 hover:text-gray-90 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 md:flex"
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
                <FontAwesomeIcon icon={faBars} className='text-3xl md:hidden' onClick={()=>{setOpenMenu(!openMenu)}}/>
            </div>
            <div className='flex flex-col items-center w-full h-full px-4 py-20 mx-auto md:flex-row lg:container'>
                <div className="w-full md:mr-20 md:w-6/12 sm:m-0">
                    <h2 className="mb-8 font-base md:font-lg heading-1">Start Your UAE Business from Anywhere and Stay Fully Compliant.</h2>
                    <p className="mb-8 font-base">
                        At incorpX, we believe that every startup deserves a chance to thrive. We're here to provide you with the tools, resources, and support you need to turn your innovative ideas into successful ventures.
                    </p>
                    <div className='flex flex-col items-start gap-4 md:gap-10 md:items-center md:flex-row'>
                        <Link
                            href={route('register')}
                            className="w-full text-center primary-button"
                        >
                            Start your business<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} />
                        </Link>
                        <button type='button'
                            onClick={showPopUp}
                            className='w-full px-10 py-3 text-black bg-gray-200 rounded-full md:py-4 secondary-button'
                        >
                            Free consultation
                        </button>
                    </div>

                </div>
                <div className="flex justify-center w-full h-full md:w-6/12">
                    <div className="relative mt-16 md:mx-20 md:aspect-auto">
                        <img src={freeConsultationPerson} className="w-full free-consulation-person"/>
                        <img src={freeConsultation} className="free-consulation"/>
                        <img src={setupYourUaeCompany} className="setup-your-uae-company"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between h-full px-4 pt-12 mx-auto bg-sky-50 md:pt-36 md:p-0" id="services">
                <div className="mx-auto text-center" style={{maxWidth:"900px"}}>
                    <h3 className="pb-4 text-4xl font-bold">Form a Legal Entity in UAE</h3>
                    <p className='pb-4 text-center md:text-start'>At incorpX, we understand the importance of choosing the right legal entity for your business. Our expert team will guide you through the process, helping you select the entity type that best suits your needs and goals. Whether you're considering a Freezone company, mainland business, or offshore entity, we've got you covered.</p>
                    <div className="flex flex-col justify-between gap-4 pb-4 mx-auto md:flex-row" style={{maxWidth:"700px"}}>
                        <div className="px-4 py-2 text-black bg-teal-100 rounded-xl"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />Automated Platform</div>
                        <div className="px-4 py-2 text-black bg-cyan-100 rounded-xl"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />End to End Process</div>
                        <div className="px-4 py-2 text-black rounded-xl bg-rose-50"><FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />24/7 Support</div>
                    </div>
                    <div className='py-8'>
                        <Link className="px-10 py-4 text-white bg-black rounded-full secondary-button" href={route('register')}>Start Now<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} /></Link>
                    </div>
                    <div className="px-1 pt-1 mt-10 overflow-hidden bg-white md:px-2 md:pt-2 form-box">
                        <video className="w-full form-box" autoPlay muted  controls={false} loop  ref={videoRef} playsInline>
                            <source src={landingPageVideo} type="video/mp4"/>
                        </video>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col items-center justify-between h-full px-4 mx-auto py-14 md:py-36">
                <h3 className="pb-4 text-4xl font-bold">Unlock Your Business Potential</h3>
                <div className="flex flex-col gap-8 pt-16 md:flex-row">
                    <div className="w-full p-8 md:w-6/12 bg-emerald-100 rounded-3xl">
                        <span className="px-4 py-2 text-center rounded-lg bg-emerald-200"><FontAwesomeIcon style={{fontSize: "14px"}} className="mr-2" icon={faBuilding} />Visa</span>
                        <h4 className="mt-8 text-2xl font-bold">Get Your Emirates ID and UAE Visa</h4>
                        <p className="py-4">With our expertise, you can expect to receive both your Emirates ID and UAE visa within two weeks of application, allowing you to focus on building your business with confidence. Our service fee includes comprehensive assistance throughout the application process, fast-track processing for efficient results, dedicated support from our knowledgeable team, hassle-free documentation handling, and regular updates on the status of your application. This provides you with peace of mind knowing your visa and Emirates ID are in expert hands.</p>
                        <div className="flex items-center justify-between gap-5 mt-4">
                            <p className='hidden'><sup className='text-base'>*</sup>Included in Service Fee</p>
                            <Link className="hidden px-10 py-4 text-white bg-black rounded-full secondary-button">Formation<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} /></Link>
                        </div>
                    </div>
                    <div className="w-full p-8 md:w-6/12 bg-cyan-50 rounded-3xl">
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
            <div className="container flex flex-col items-center justify-between h-full px-4 py-8 md:mx-auto md:flex-row md:py-36" id='pricing'>
                <div className="w-full mb-8 md:w-4/12">
                    <h3 className="pb-8 text-4xl font-bold">Our Pricing</h3>
                    <Link
                        href={route('register')}
                        className="primary-button"
                    >
                        Start your business<FontAwesomeIcon style={{fontSize: "12px"}} className="ml-3" icon={faChevronRight} />
                    </Link>
                </div>
                <div className="w-full md:w-8/12">
                    <div className="w-full p-8 bg-white rounded-3xl">
                        <div className="relative flex flex-col items-center w-full gap-4 mb-8 md:flex-row">
                            <button  className={"px-2 py-2 md:px-10 md:py-4 rounded-full secondary-button "+(packagesCount==0?"text-white bg-black":"text-black bg-gray-100")} onClick={()=>{changePackage(0)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Freezone Company Formation
                            </button>
                            <button className={"px-2 py-2 md:px-10 md:py-4 rounded-full secondary-button "+(packagesCount==1?"text-white bg-black":"text-black bg-gray-100")} onClick={()=>{changePackage(1)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Mainland Company Formation
                            </button>
                        </div>
                        <div className="flex flex-col items-center md:flex-row" style={{display:packagesCount==0?"flex":"none"}}>
                            <div className="w-full h-full pb-4 border-b-2 md:border-b-0 md:w-6/12 md:border-r-2">
                                <h2 className="text-2xl font-bold">incorpX Service Fee</h2>
                                <div className="flex items-center gap-2 mt-2 md:hidden">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                                <ul className="mt-4 list-disc ms-5">
                                    <li>Expert Consultation</li>
                                    <li>Formation Filings</li>
                                    <li>Annual State Filings</li>
                                    <li>Business bank account opening</li>
                                    <li>Visa and Emirates ID support</li>
                                    <li>Lifetime Compliance Support</li>
                                </ul>
                                <span className="text-sm text-gray-500">State fee not included.</span>
                                <div className="items-center hidden gap-2 mt-6 md:flex">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                            </div>
                            <div className="w-full md:w-6/12">
                                <div className="py-4 border-b-2 md:ml-8">
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
                                <div className="mt-4 md:ml-8">
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
                        <div className="flex flex-col items-center w-full md:flex-row" style={{display:packagesCount==1?"flex":"none"}}>
                            <div className="w-full h-full pb-4 border-b-2 md:border-b-0 md:w-6/12 md:border-r-2">
                                <h2 className="text-2xl font-bold">incorpX Service Fee</h2>
                                <div className="flex items-center gap-2 mt-2 md:hidden">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                                <ul className="mt-4 list-disc ms-5">
                                    <li>Expert Consultation</li>
                                    <li>Formation Filings</li>
                                    <li>Annual State Filings</li>
                                    <li>Business bank account opening</li>
                                    <li>Visa and Emirates ID support</li>
                                    <li>Lifetime Compliance Support</li>
                                </ul>
                                <span className="text-sm text-gray-500">State fee not included.</span>
                                <div className="items-center hidden gap-2 mt-6 md:flex">
                                    <h2 className="text-2xl font-bold">$599</h2><span className="text-gray-500">one time fee</span>
                                </div>
                            </div>
                            <div className="w-full h-full md:w-6/12">
                                <div className="py-4 border-b-2 md:ml-8">
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
                                <div className="mt-4 md:ml-8">
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
            <div className="h-full px-4 py-16 md:py-24 other-service-section">
                <div className="container flex flex-col items-center justify-between mx-auto md:flex-row ">
                    <div className="w-full md:w-6/12 md:pe-36">
                        <div className="px-4 py-2 text-center text-black bg-teal-100 w-52 rounded-xl">
                            <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faCube} />Other Services
                        </div>
                        <h3 className="pb-8 mt-4 text-4xl font-bold">Other Add On Comprehensive Business Solutions Tailored for Your Business Success</h3>
                        <div className="flex flex-wrap gap-4 mr-4">
                            <button  className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button "+(serviceCount==0?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(0)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBuilding} />Accounting
                            </button>
                            <button  className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button "+(serviceCount==1?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(1)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBolt} />Legal Drafting Services
                            </button>
                            <button  className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button "+(serviceCount==2?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(2)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faBagShopping} />Attestation Services
                            </button>
                            <button  className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button "+(serviceCount==3?"text-white bg-black":"text-black bg-white")} onClick={()=>{changeService(3)}}>
                                <FontAwesomeIcon style={{fontSize: "12px"}} className="mr-3" icon={faUser} />PRO Services
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-4 md:w-6/12 md:-0">
                        <div className={"flex-col justify-end gap-4 md:p-16"}  style={{display:serviceCount==0?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Accounting</h2>
                            <p>We offer a range of accounting services to help businesses in Dubai succeed. Our experienced and certified accountants team is dedicated to providing accurate and reliable financial solutions.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"}  style={{display:serviceCount==1?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Legal drafting services</h2>
                            <p>Legal drafters or attorneys manage legal drafting since they are versed in the legal issues that should be included in a document according to the law. In essence, it is a writer of legally binding texts. </p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"}  style={{display:serviceCount==2?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Attestation services</h2>
                            <p>Attestation services are often required for official or legal purposes, such as for use in foreign countries or for educational or employment purposes. Attestation services are typically provided by government agencies, embassies, and specialized companies.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"}  style={{display:serviceCount==3?"flex":"none"}}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">PRO Services</h2>
                            <p>We are a team of professionals dedicated to helping businesses manage their public image. With years of experience in the industry, we have the knowledge and expertise to assist you with all of your PRO needs.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col items-center justify-between h-full px-4 py-16 mx-auto md:py-36" id='faqs'>
                <h3 className="pb-4 text-4xl font-bold md:pb-16">Frequently Asked Questions (FAQ)</h3>
                <div className="flex flex-col items-center md:flex-row">
                    <div className="flex justify-center w-full h-full md:w-6/12">
                        <div className="relative py-4 md:mx-20 aspect-auto">
                            <img src={faqs} className="w-full h-full" />
                        </div>
                    </div>
                    <div className="w-full md:w-6/12">
                        <Accordion open={openAccordion === 0} icon={<FontAwesomeIcon icon={openAccordion === 0?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(0)} className="border-0">Can I incorporate a UAE company from anywhere in the world?</AccordionHeader>
                            <AccordionBody>Absolutely! incorpX's online platform allows you to incorporate your UAE company from anywhere in the world. Our streamlined process ensures that distance is no barrier to starting your business in the UAE.</AccordionBody>
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
                            <AccordionHeader onClick={() => changeAccordion(4)} className="border-0">How long does it take to set up a business with incorpX?</AccordionHeader>
                            <AccordionBody>With incorpX's efficient processes and expert assistance, you can expect to set up your business in the UAE within a matter of weeks. From company incorporation to obtaining your Emirates ID and UAE visa, our team works diligently to expedite the process and get your business up and running as quickly as possible.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 5} icon={<FontAwesomeIcon icon={openAccordion === 5?faPlus:faMinus}/>} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(5)} className="border-0">Why are there three different charges?</AccordionHeader>
                            <AccordionBody>The charges include the service fee for incorpX, the trade license fee charged by the respective authority (Freezone or Mainland), and the visa fee. Each fee covers specific aspects of the setup process, ensuring a smooth and compliant incorporation of your business in the UAE.</AccordionBody>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="h-full px-4 py-12 bg-blue-50 md:py-36" id="testimonial">
                <div className="container flex flex-col items-center justify-between h-full mx-auto">
                    <h3 className="pb-16 text-4xl font-bold">See what client say about incorpX</h3>
                </div>
                <div className='w-full overflow-hidden'>
                    <Testimonial />
                </div>
            </div>
            <div className="h-full px-4 py-12 md:py-36">
                <div className="w-full py-8 mx-auto md:py-16 bg-secondary rounded-3xl" style={{maxWidth:"1074px"}}>
                    <h3 className="px-4 text-3xl font-bold text-center text-white md:pb-16 md:text-5xl md:mx-48">Register your entity in UAE and keep it 100% compliant</h3>
                    <p className="pb-8 text-base text-center text-white">Turn your dream idea into your dream business.</p>
                    <div className="flex flex-col justify-center gap-4 px-4 md:gap-8 md:flex-row">
                        <Link href='/register'  className={"px-10 py-4 rounded-full secondary-button text-white bg-black text-center"}>
                            Start your business
                        </Link>
                        <button  className={"px-10 py-4 rounded-full secondary-button text-black bg-white"} onClick={showPopUp}>
                            Free consultation
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-full pt-0 pb-60 md:py-40 footer-bg" style={{background:"url("+footerImage+")"}}>
                <div className="container flex flex-col items-center justify-center py-4 mx-auto">
                    <ApplicationLogo className="object-contain h-20 fill-current w-46" />
                    <p>
                        Powered by
                    </p>
                    <img src={hashtag} className="h-full -m-4 w-ful" />
                </div>
            </div>
            <div className="bg-secondary">
                <div className="container flex flex-col items-center justify-center py-4 mx-auto md:justify-between md:flex-row">
                    <div className="text-center md:text-start">
                        <p className="text-white">Copyrights © 2024 incorpX | Developed by <a className='font-bold' href='https://www.nayagroup.com' target='_blank'>Naya Group</a></p>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:justify-end">
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
