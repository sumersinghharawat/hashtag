import { faArrowAltCircleLeft, faArrowRight, faBagShopping, faBank, faBars, faBold, faBolt, faBucket, faBuilding, faBuildingShield, faBuildingUn, faBuildingWheat, faBusinessTime, faChevronRight, faClose, faCube, faGreaterThan, faMinus, faPlus, faThunderstorm, faTruckArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, Carousel } from '@material-tailwind/react';
import { FastEasyProcess } from './Shared/FastEasyProcess';
import { Testimonial } from './Shared/Testimonial';
import { PopUpForm } from './Shared/PopUpForm';

// AOS Animation
import aos from 'aos';
import 'aos/dist/aos.css';

// Assets
import serviceDummyImage from './../images/demo-service.png';
import herosectionImages from './../images/herosection-images.png';
import footerImage from './../Icons/uae-line-skyline.svg';
// import landingPageVideo from './../videos/landing-page-video.mp4';
import slideCheckpointVideo from './../videos/Process Steps.mp4';
import faqs from './../images/faqs.png';
import hashtag from './../images/hashtag.png';
import StepIcons from './../images/steps-icons.svg';
import rightTickCheck from '../Icons/right-tickcheck.svg';
import stepSlider from '../images/steps-slider.svg';
import burjKhalifa from '../images/burjkhalifa-image.png';
import approval from '../Icons/approval.svg';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ApplicationLogoLight from '@/Components/ApplicationLogoLight';

export default function Welcome({ auth, laravelVersion, phpVersion, emailSent, packages }) {

    const [role, setRole] = useState('');
    const [popUp, setPopUp] = useState(false);
    const videoRef = useRef(null);

    const [packagesCount, setPackagesCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

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

    const formatCurrency = (value) => {
        return 'AED ' + value.toLocaleString('en-US');
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


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1;
        }
        if (auth.user?.roles) {
            auth.user.roles.map((element) => {
                setRole(element.name);
            })
        }
    });

    useEffect(() => {
        aos.init();
    },[]);


    return (
        <div className="bg-[#00100D] overflow-hidden">
            {popUp ? <PopUpForm showPopUp={showPopUp} emailSent={emailSent} /> : <></>}
            <Head title="IncorpX" />
            {/* <div className="flex flex-col items-center justify-center h-24 gap-2 align-middle bg-black bg-center md:gap-8 md:h-14 md:flex-row">
                <p className='text-white'>Have questions about company formation?</p> <button onClick={showPopUp} className='px-10 py-2 text-white bg-black border-2 border-white rounded-full'>Free consultation<FontAwesomeIcon style={{ fontSize: "12px" }} className='ml-3' icon={faChevronRight} /></button>
            </div> */}
            <div className="relative flex items-center justify-between h-full px-2 mx-auto lg:container">
                <div className={openMenu ? 'block fixed top-0 left-0 w-full bg-black bg-opacity-35 h-screen z-[9997]' : 'transition-all w-0 hidden'}>
                    <FontAwesomeIcon icon={faClose} className='absolute right-12 top-4 text-3xl text-white md:hidden z-[9999]' onClick={() => { setOpenMenu(!openMenu) }} />
                    <div className='relative flex float-left transition-all flex-col items-top justify-start px-2 h-full gap-2 align-middle bg-black bg-center md:gap-8 md:h-14 md:flex-row z-[9998] w-[90%]'>
                        <Link href="/">
                            <ApplicationLogoLight className="object-contain h-20 fill-current w-36" />
                        </Link>
                        <div className="flex flex-col">
                            <a href="/" className="flex items-center justify-start w-full py-4 text-[18px] font-medium leading-6 text-left text-white border-b md:border-none md:py-0" onClick={() => { setOpenMenu(!openMenu) }} >
                                Home
                            </a>
                            <a href="#process" className="flex items-center justify-start w-full py-4 text-[18px] font-medium leading-6 text-left text-white border-b md:border-none md:py-0" onClick={() => { setOpenMenu(!openMenu) }} >
                                Process
                            </a>
                            <a href="#pricing" className="flex items-center justify-start w-full py-4 text-[18px] font-medium leading-6 text-left text-white border-b md:border-none md:py-0" onClick={() => { setOpenMenu(!openMenu) }} >
                                Pricing
                            </a>
                            <a href="#testimonial" className="flex items-center justify-start w-full py-4 text-[18px] font-medium leading-6 text-left text-white border-b md:border-none md:py-0" onClick={() => { setOpenMenu(!openMenu) }} >
                                Testimonials
                            </a>
                        </div>
                    </div>
                </div>
                <Link href="/">
                    <ApplicationLogoLight className="object-contain h-20 fill-current w-36" />
                </Link>
                <div className="flex items-center justify-between gap-14 text-start">
                    <div className={'absolute hidden flex-col items-center gap-0 md:flex md:flex-row text-start md:gap-14 md:relative w-screen md:w-auto bg-white md:bg-transparent left-0 top-16 md:top-auto mr-10'}>
                        <a href="/" className="flex items-center justify-center w-full py-4 text-[18px] font-medium leading-6 text-center text-white border-b md:border-none md:py-0">
                            Home
                        </a>
                        <a href="#process" className="flex items-center justify-center w-full py-4 text-[18px] font-medium leading-6 text-center text-white border-b md:border-none md:py-0">
                            Process
                        </a>
                        <a href="#pricing" className="flex items-center justify-center w-full py-4 text-[18px] font-medium leading-6 text-center text-white border-b md:border-none md:py-0">
                            Pricing
                        </a>
                        <a href="#testimonial" className="flex items-center justify-center w-full py-4 text-[18px] font-medium leading-6 text-center text-white border-b md:border-none md:py-0">
                            Testimonials
                        </a>
                    </div>
                {/* </div>
                <div className="px-0 md:p-6 text-end"> */}
                    {auth.user ? (
                        <>{(role == "founder") ?
                            <Link
                                href={route('founder.dashboard')}
                                className='primary-button'
                            >
                                My Profile
                            </Link>
                            : <Link
                                href={route('dashboard')}
                                className="font-semibold text-white-600 hover:text-white-900 text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>}</>
                    ) : (
                        <div className='flex items-center gap-8'>
                            <Link
                                href={route('login')}
                                className="hidden px-6 py-2 text-white border border-white text-[18px] font-medium rounded-3xl hover:text-gray-90 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 md:flex"
                            >
                                Sign in
                            </Link>

                            {/* <Link
                                href={route('register')}
                                className='primary-button'
                            >
                                Start your business<FontAwesomeIcon style={{ fontSize: "12px" }} className='ml-3' icon={faChevronRight} />
                            </Link> */}
                        </div>
                    )}
                </div>
                <FontAwesomeIcon icon={faBars} className='text-3xl text-white md:hidden' onClick={() => { setOpenMenu(!openMenu) }} />
            </div>


            <div className='flex flex-col items-center w-full h-full px-4 py-20 mx-auto md:flex-row lg:container hero-section'>
                <div className="flex flex-col justify-between w-full gap-0 lg:gap-24 md:mr-0 md:w-6/12 sm:m-0" data-aos="fade-right" data-aos-delay="500">
                    <div className='flex flex-col items-start gap-4'>
                        <h2 className="text-white text-5xl lg:text-[66.58px] font-light">Form a Legal</h2>
                        <h2 className=" lg:mb-10 text-white text-5xl lg:text-[66.58px] font-bold">Entity in UAE.</h2>
                        <Link
                            href={route('register')}
                            className="w-auto px-6 py-2 mt-4 mb-4 text-xl font-medium text-center text-white border border-white rounded-full lg:mt-16 lg:mb-24 font-mornope"
                        >
                            Get Started
                        </Link>
                    </div>
                    <p className="w-full text-xl font-normal text-white lg:mb-8 lg:w-5/12 font-mornope">
                        Complete your registration from anywhere, with user-friendly forms and straightforward steps.
                    </p>

                </div>
                <div className="w-1/12"></div>
                <div className="flex w-full h-full md:w-5/12" data-aos="fade-left" data-aos-delay="500">
                    <div className="relative flex flex-col w-full gap-0 mt-4 lg:gap-8 lg:mt-16">
                        <div className="flex items-center gap-2 px-2 py-1 text-lg rounded-full max-w-max" style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                            <img src={herosectionImages} className="object-contain h-5 lg:h-9" alt="incorpX" />
                            <span className="text-xl font-bold font-mornope">5k+</span> <span className="text-xl font-medium font-mornope">Happy Entrepreneurs</span>
                        </div>
                        <h2 className="font-extrabold text-4xl lg:text-[52px] font-mornope text-white mt-12 lg:mt-9 lg:leading-[71.03px]">Business Registration</h2>
                        <h2 className="font-light text-5xl lg:text-[91.24px] font-mornope text-white lg:leading-[91.24px] ml-[-5px]">Made Easier.</h2>
                        <Link href="#testimonial" className="flex items-center justify-end gap-2">
                            <span className="text-2xl text-white manrope">Tesimonials</span>
                            <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                                <FontAwesomeIcon icon={faArrowRight} className='text-3xl -rotate-45'/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col items-center justify-between mx-auto md:p-0 " id="services" data-aos="fade-up" data-aos-delay="500">
                <div className="mx-auto flex justify-center text-center lg:max-w-[900px] p-12">
                    <div className="flex flex-col items-center justify-center p-6 service-set service-set-1">
                        <img src={rightTickCheck} className="object-contain w-1/3 h-full" alt="incorpX" />
                        <h3 className="text-3xl">Your Company License is Ready!</h3>
                    </div>
                    <div className="p-10 text-left service-set service-set-2">
                        <p>95% To Complete</p>
                        <div className="relative mt-2 progress">
                            <div className="w-full h-6 bg-gray-200 rounded-full progress-bar"></div>
                            <div className="absolute top-0 h-6 bg-green-400 rounded-full w-9 possible-progress-bar"></div>
                        </div>
                        <img src={StepIcons} className="object-contain w-full h-full mt-4" alt="incorpX" />
                    </div>
                    <div className="px-10 text-left lg:py-24 service-set service-set-3">
                        <h3 className="text-sm font-bold lg:mb-4 lg:text-3xl inter-font">Company Name</h3>
                        <p className="text-sm font-normal lg:mb-4 inter-font">Please enter three name choices for your company in order of preference</p>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm">Name Your Company</label>
                            <input type="text" readOnly={true} className="mb-4 text-sm text-white bg-transparent border border-gray-300 lg:px-6 lg:py-5" placeholder="Company Name" value="Hertz L.L.C" />
                            <input type="text" readOnly={true} className="mb-4 text-sm text-white bg-transparent border border-gray-300 lg:px-6 lg:py-5" placeholder="Company Name" value="Hertz Real Estate L.L.C"/>
                            <input type="text" readOnly={true} className="mb-4 text-sm text-white bg-transparent border border-gray-300 lg:px-6 lg:py-5" placeholder="Company Name" value="Hashtag L.L.C"/>
                        </div>
                    </div>
                </div>
                <div className="ellipse-animation-bg">
                    <div className="ellipse-layer layer-1"></div>
                    <div className="ellipse-layer layer-2"></div>
                    <div className="ellipse-layer layer-3"></div>
                </div>

            </div>

            {/* <div className="flex flex-col items-center justify-between h-full px-4 pt-12 mx-auto bg-sky-50 md:pt-36 md:p-0" id="services">
                <div className="mx-auto text-center" style={{ maxWidth: "900px" }}>
                    <h3 className="pb-4 text-4xl font-bold">Form a Legal Entity in UAE</h3>
                    <p className='pb-4 text-center md:text-start'>At incorpX, we understand the importance of choosing the right legal entity for your business. Our expert team will guide you through the process, helping you select the entity type that best suits your needs and goals. Whether you're considering a Freezone company, mainland business, or offshore entity, we've got you covered.</p>
                    <div className="flex flex-col justify-between gap-4 pb-4 mx-auto md:flex-row" style={{ maxWidth: "700px" }}>
                        <div className="px-4 py-2 text-black bg-teal-100 rounded-xl"><FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faCube} />Automated Platform</div>
                        <div className="px-4 py-2 text-black bg-cyan-100 rounded-xl"><FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faCube} />End to End Process</div>
                        <div className="px-4 py-2 text-black rounded-xl bg-rose-50"><FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faCube} />24/7 Support</div>
                    </div>
                    <div className='py-8'>
                        <Link className="px-10 py-4 text-white bg-black rounded-full secondary-button" href={route('register')}>Start Now<FontAwesomeIcon style={{ fontSize: "12px" }} className="ml-3" icon={faChevronRight} /></Link>
                    </div>
                    <div className="px-1 pt-1 mt-10 overflow-hidden bg-white md:px-2 md:pt-2 form-box">
                        <video className="w-full form-box" autoPlay muted controls={false} loop ref={videoRef} playsInline>
                            <source src={landingPageVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div> */}

            <div className=" bg-primary">
                <div className="container flex flex-col items-center justify-between h-full px-4 mx-auto lg:py-14">
                    <div className="flex flex-col py-8 lg:pt-16 lg:gap-8 md:flex-row">
                        <div className="w-full lg:p-8 md:w-6/12" data-aos="fade-right" data-aos-delay="500">
                            <h3 className="pb-4 text-4xl lg:text-[64px] lg:leading-[87.42px] font-normal font-mornope">Global Access to</h3>
                            <h3 className="pb-4 text-4xl lg:text-[64px] font-bold lg:leading-[87.42px] font-mornope">UAE Legal Entity</h3>
                            <h3 className="pb-4 text-4xl lg:text-[64px] lg:leading-[87.42px] font-normal font-mornope">Formation.</h3>
                        </div>
                        <div className="w-full lg:p-8 md:w-1/12"></div>
                        <div className="w-full lg:p-8 lg:ml-24 md:w-5/12" data-aos="fade-left" data-aos-delay="500">
                            <p className="lg:py-4 font-normal text-[20px] font-mornope">Starting a business in the UAE has never been simpler or more accessible. Whether you're in Europe, Asia, the Americas, or anywhere else, we empower you to form your legal entity in the UAE remotely and efficiently, with full transparency and expert support throughout the entire process.</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col lg:gap-8 lg:pt-16 md:flex-row">
                        <div className="w-full p-8 md:w-6/12">
                            <div className=""  data-aos="fade-right" data-aos-delay="500">
                                <div className="h-24 lg:h-48 overflow-hidden bg-white rounded-[20px] -ml-6 p-0 lg:px-4 flex justify-center absolute top-1/4 shadow-inset-white slider-steps-video">
                                    {/* <img src={stepSlider} className="w-full animation-scroller-image" />
                                     */}
                                    <video className="w-full h-full -mt-[4px] overflow-hidden lg:-ml-1 form-box" style={{ objectFit: "contain", transform: "scale(1.1)" }} autoPlay muted controls={false} loop ref={videoRef} playsInline>
                                        <source src={slideCheckpointVideo} type="video/mp4" />
                                    </video>
                                </div>
                                <img src={burjKhalifa} className="w-full ml-12 lg:ml-[35%] image-burjkhalifa" />
                            </div>
                        </div>
                        <div className="w-full lg:p-8 md:w-1/12"></div>
                        <div className="w-full p-4 lg:p-8 md:w-6/12" data-aos="fade-left" data-aos-delay="500">
                            <h2 className="pb-4 text-[47px] leading-[64.2px] font-mornope">Effortless Online Entity Formation</h2>
                            <p className="py-4 font-normal text-[20px] font-mornope">We simplify the entire process, ensuring that you can form your business entirely online.</p>
                            <div className="flex flex-col gap-4 py-8">
                                <div className="flex flex-row flex-wrap gap-4 lg:flex-nowrap">
                                    <div className="flex flex-row items-center w-full gap-4 lg:w-1/2">
                                        <div className="h-16 w-16 rounded-[10px] flex justify-center items-center" style={{background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)"}}>
                                            <img src={approval} className="w-8 h-8" />
                                        </div>
                                        <p className="text-[20px] w-7/12 font-medium font-manrope">Full Document Handling</p>
                                    </div>
                                    <div className="flex flex-row items-center w-full gap-4 lg:w-1/2">
                                        <div className="h-16 w-16 rounded-[10px] flex justify-center items-center" style={{background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)"}}>
                                            <img src={approval} className="w-8 h-8" />
                                        </div>
                                        <p className="text-[20px] w-7/12 font-medium font-manrope">Bank Account Setup Consult</p>
                                    </div>
                                </div>
                                <div className="flex flex-row flex-wrap gap-4 lg:flex-nowrap">
                                    <div className="flex flex-row items-center w-full gap-4 lg:w-1/2">
                                        <div className="h-16 w-16 rounded-[10px] flex justify-center items-center" style={{background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)"}}>
                                            <img src={approval} className="w-8 h-8" />
                                        </div>
                                        <p className="text-[20px] w-7/12 font-medium font-manrope">Visa and Emirates ID</p>
                                    </div>
                                    <div className="flex flex-row items-center w-full gap-4 lg:w-1/2">
                                        <div className="h-16 w-16 rounded-[10px] flex justify-center items-center" style={{background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)"}}>
                                            <img src={approval} className="w-8 h-8" />
                                        </div>
                                        <p className="text-[20px] w-7/12 font-medium font-manrope">Tax Compliance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <FastEasyProcess />

            <div className="p-4 lg:py-24 bg-primary">
                <div className="overflow-hidden container relative w-full flex flex-col items-center justify-between h-full p-8 lg:p-24 bg-white md:mx-auto md:flex-row rounded-[25px]" id='pricing'>
                    <div className="z-10 w-full mb-8 md:w-6/12">
                        <h3 className="pb-8 text-4xl lg:text-[64px] lg:leading-[64.2px] font-manrope"><span className="font-bold">Transparent pricing tailored</span> to your business</h3>
                        <p className="text-xl font-manrope">Whether you want to start your business in UAE or keep it compliant with local laws - you can do it all with IncorpX.</p>
                    </div>
                    <div className="z-10 w-full lg:mb-8 md:w-2/12"></div>
                    <div className="z-10 w-full mb-4 md:w-4/12">
                        <div className="flex flex-col gap-4 bg-white rounded-[20px] p-4 lg:p-8 shadow-box">
                            <div className="flex flex-row items-center w-full gap-4 font-bold">
                                Incorporating your company in UAE
                            </div>
                            <div className="flex flex-row items-center w-full gap-4 text-[#686868] mb-16 ml-4">
                                <ul className="list-disc list-inside">
                                    <li>Business setup assistance</li>
                                    <li>Compliance management</li>
                                    <li>Documentation support</li>
                                    <li>Customer support and guidance</li>
                                    <li>Corporate Tax Registration</li>
                                </ul>
                            </div>
                            <div className="border-[0.5px] border-[#C9C9C9]"></div>
                            <div className="flex flex-row items-center w-full gap-4 text-2xl font-bold">$799</div>
                            <p className=" text-[#686868] mt-4">This is one time fee. Your formation fee will vary depending on the freezone you form in.</p>
                        </div>
                    </div>
                    <div className="absolute w-full h-full -bottom-3/4">
                        <div className="ellipse-layer layer-4"></div>
                        <div className="ellipse-layer layer-5"></div>
                        <div className="ellipse-layer layer-6"></div>
                    </div>
                </div>
            </div>

            {/* <div className="h-full px-4 py-16 md:py-24 other-service-section">
                <div className="container flex flex-col items-center justify-between mx-auto md:flex-row ">
                    <div className="w-full md:w-6/12 md:pe-36">
                        <div className="px-4 py-2 text-center text-black bg-teal-100 w-52 rounded-xl">
                            <FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faCube} />Other Services
                        </div>
                        <h3 className="pb-8 mt-4 text-4xl font-bold">Other Add On Comprehensive Business Solutions Tailored for Your Business Success</h3>
                        <div className="flex flex-wrap gap-4 mr-4">
                            <button className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button " + (serviceCount == 0 ? "text-white bg-black" : "text-black bg-white")} onClick={() => { changeService(0) }}>
                                <FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faBuilding} />Accounting
                            </button>
                            <button className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button " + (serviceCount == 1 ? "text-white bg-black" : "text-black bg-white")} onClick={() => { changeService(1) }}>
                                <FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faBolt} />Legal Drafting Services
                            </button>
                            <button className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button " + (serviceCount == 2 ? "text-white bg-black" : "text-black bg-white")} onClick={() => { changeService(2) }}>
                                <FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faBagShopping} />Attestation Services
                            </button>
                            <button className={"w-auto py-2 px-3 md:px-6 md:py-4 rounded-full secondary-button " + (serviceCount == 3 ? "text-white bg-black" : "text-black bg-white")} onClick={() => { changeService(3) }}>
                                <FontAwesomeIcon style={{ fontSize: "12px" }} className="mr-3" icon={faUser} />PRO Services
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-4 md:w-6/12 md:-0">
                        <div className={"flex-col justify-end gap-4 md:p-16"} style={{ display: serviceCount == 0 ? "flex" : "none" }}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Accounting</h2>
                            <p>We offer a range of accounting services to help businesses in Dubai succeed. Our experienced and certified accountants team is dedicated to providing accurate and reliable financial solutions.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"} style={{ display: serviceCount == 1 ? "flex" : "none" }}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Legal drafting services</h2>
                            <p>Legal drafters or attorneys manage legal drafting since they are versed in the legal issues that should be included in a document according to the law. In essence, it is a writer of legally binding texts. </p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"} style={{ display: serviceCount == 2 ? "flex" : "none" }}>
                            <img src={serviceDummyImage} />
                            <h2 className="text-2xl font-bold">Attestation services</h2>
                            <p>Attestation services are often required for official or legal purposes, such as for use in foreign countries or for educational or employment purposes. Attestation services are typically provided by government agencies, embassies, and specialized companies.</p>
                        </div>
                        <div className={"flex-col justify-end gap-4 md:p-16"} style={{ display: serviceCount == 3 ? "flex" : "none" }}>
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
                        <Accordion open={openAccordion === 0} icon={<FontAwesomeIcon icon={openAccordion === 0 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(0)} className="border-0">Can I incorporate a UAE company from anywhere in the world?</AccordionHeader>
                            <AccordionBody>Absolutely! incorpX's online platform allows you to incorporate your UAE company from anywhere in the world. Our streamlined process ensures that distance is no barrier to starting your business in the UAE.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 1} icon={<FontAwesomeIcon icon={openAccordion === 1 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(1)} className="border-0">What is a Freezone company?</AccordionHeader>
                            <AccordionBody>A Freezone company is a business entity established within one of the many Freezones in the UAE. These zones offer various incentives such as 100% foreign ownership, tax exemptions, and simplified customs procedures, making them an attractive option for startups and businesses.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 2} icon={<FontAwesomeIcon icon={openAccordion === 2 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(2)} className="border-0">What is a Mainland company?</AccordionHeader>
                            <AccordionBody>A Mainland company is a business entity registered and licensed to operate within the mainland territory of the UAE. Unlike Freezone companies, Mainland companies can engage in business activities across the UAE without restrictions on geographic location.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 3} icon={<FontAwesomeIcon icon={openAccordion === 3 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(3)} className="border-0">Can I get a trade license without a visa?</AccordionHeader>
                            <AccordionBody>In most cases, a visa is required to obtain a trade license in the UAE. However, specific requirements may vary depending on the type of business and the jurisdiction. Our team will guide you through the visa application process to ensure compliance with UAE regulations.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 4} icon={<FontAwesomeIcon icon={openAccordion === 4 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(4)} className="border-0">How long does it take to set up a business with incorpX?</AccordionHeader>
                            <AccordionBody>With incorpX's efficient processes and expert assistance, you can expect to set up your business in the UAE within a matter of weeks. From company incorporation to obtaining your Emirates ID and UAE visa, our team works diligently to expedite the process and get your business up and running as quickly as possible.</AccordionBody>
                        </Accordion>
                        <Accordion open={openAccordion === 5} icon={<FontAwesomeIcon icon={openAccordion === 5 ? faPlus : faMinus} />} className="px-6 my-4 bg-white rounded-3xl">
                            <AccordionHeader onClick={() => changeAccordion(5)} className="border-0">Why are there three different charges?</AccordionHeader>
                            <AccordionBody>The charges include the service fee for incorpX, the trade license fee charged by the respective authority (Freezone or Mainland), and the visa fee. Each fee covers specific aspects of the setup process, ensuring a smooth and compliant incorporation of your business in the UAE.</AccordionBody>
                        </Accordion>
                    </div>
                </div>
            </div> */}

            <div className="h-full py-12 overflow-hidden bg-white md:py-36" id="testimonial">
                <div className="container flex flex-col items-center justify-between h-full mx-auto">
                    <h3 className="w-full pt-4 text-4xl font-normal text-center capitalize lg:pb-16 lg:w-2/5 lg:text-6xl text-manrope">See what client say about incorpX</h3>
                </div>
                <div className='w-full'>
                    <Testimonial />
                </div>
            </div>

            <div className="relative overflow-hidden ">

                <div className="absolute left-0 z-0 w-screen top-1/4">
                    <div className="ellipse-layer layer-7"></div>
                </div>

                <div className="h-full py-12 md:py-36" id="process">
                    <div className="container relative z-10 flex flex-col items-center justify-between h-full mx-auto">
                        <h2 className="pb-16 text-6xl lg:text-[90px] font-normal text-center text-manrope">Register your entity in UAE</h2>
                        <div className="flex ">
                            <div className="flex items-center gap-2 px-24 text-lg rounded-full max-w-max" style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                                <span>Get Started</span>
                            </div>
                            <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ background: "linear-gradient(101.12deg, #B6D99C 0%, #78B948 176.3%)" }}>
                                <FontAwesomeIcon icon={faArrowRight} className='text-3xl -rotate-45'/>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-24 text-center gap-7">
                            <h2 className="text-[28px] font-medium w-full text-center text-manrope">Follow Us</h2>
                            <div className="flex flex-row gap-7">
                                <Link href='https://www.instagram.com/incorpX_UAE/' className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                                    <FontAwesomeIcon icon={faInstagram} className='text-xl text-white'/>
                                </Link>
                                <Link href='https://www.facebook.com/incorpX.UAE/' className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                                    <FontAwesomeIcon icon={faFacebook} className='text-xl text-white'/>
                                </Link>
                                <Link href='https://twitter.com/incorpX_UAE' className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                                    <FontAwesomeIcon icon={faTwitter} className='text-xl text-white'/>
                                </Link>
                                <Link href='https://www.linkedin.com/company/incorpx/' className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                                    <FontAwesomeIcon icon={faLinkedin} className='text-xl text-white'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 h-full pt-0 bg-bottom pb-60 md:py-40 footer-bg" style={{ backgroundImage: "url(" + footerImage + ")" }}>
                    <div className="container flex flex-col items-center justify-center py-4 mx-auto">
                        <ApplicationLogoLight className="object-contain h-20 mb-2 fill-current w-46" />
                        <img src={hashtag} className="h-full -m-4 lg:w-1/6" />
                    </div>
                </div>
                <div className="relative z-10 bg-black">
                    <div className="container flex flex-col items-center justify-center py-4 mx-auto md:justify-between md:flex-row">
                        <div className="text-center md:text-start">
                            <p className="text-xs text-white font-manrope">Copyrights © 2024 incorpX | Developed by <a className='font-bold' href='http://navyatechnomedia.com/' target='_blank'>Navya Technomedia</a></p>
                        </div>
                        <div className="flex items-center justify-center gap-4 md:justify-end">
                            <Link href="#" className="text-xs text-white font-manrope">
                                Terms & Conditions
                            </Link>
                            <Link href="#" className="text-xs text-white font-manrope">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
