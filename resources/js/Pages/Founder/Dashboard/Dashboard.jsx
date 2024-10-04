import { AddMoreIconCard } from "@/Components/AddMoreIconCard";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { VideoEmbed } from "@/Components/VideoEmbed";
import thumbnail from "../../../images/intro-video.jpeg";
import videosrc from "../../../videos/landing-page-video.mp4";
import { StepFromLayout } from "../PhaseTwo/Steps/StepFromLayout";
export default function Dashboard({ auth, request, company_info, step, registration_completed_step }) {

    useEffect(()=>{

        console.log(request);

    },[]);

    const handleNewApplication = () => {
        router.get(route('founder.dashboard.companyname'));
    }


    const handleContinueApplication = (id) => {
        router.get(route('founder.dashboard.review-registration',id));
    }

    return (
        <CustomerDashboard auth={auth}>
            <div className="flex w-full gap-4 px-8 align-bottom">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Welcome {auth.user.name}</h2>
                <p className="flex h-full mt-1 text-sm align-bottom"><b>Documents to Upload:</b>  {registration_completed_step?registration_completed_step:0}/10</p>
            </div>
            <div className="relative grid justify-between w-full h-full grid-flow-row grid-cols-2 gap-16 p-8">
                {company_info?
                <div className="sticky top-0 flex flex-col justify-between w-auto h-full cursor-pointer md:justify-start md:flex-row md:bg-white md:p-10 rounded-3xl">
                    <div className="flex">
                        <div className="flex flex-col w-1/2 gap-2 m-8 align-middle">
                            <div className="flex mt-1 text-lg font-semibold text-black align-middle">{company_info.company_name_1}</div>
                            <div className="flex -mt-1 text-black align-middle text-md">{company_info.industry}</div>
                            <div className="flex mt-1 text-black align-middle text-md">{company_info.description}</div>
                            <button className="w-3/5 mt-6 primary-button" onClick={()=>handleContinueApplication(company_info.id)}>Continue</button>
                        </div>
                        <div className="flex w-1/2 gap-2 m-8">
                            <div>
                                <StepFromLayout filledSteps={registration_completed_step} step={step}  />
                            </div>
                        </div>
                    </div>
                </div>:<AddMoreIconCard title={"New Registration"}  clickEvent={() => handleNewApplication()} />}
                <div className="sticky top-0 flex flex-col justify-between w-auto h-full overflow-hidden cursor-pointer md:justify-start md:flex-col md:bg-white rounded-3xl">
                    <VideoEmbed thumbnail={thumbnail} videolink={videosrc}/>
                    <div className="p-8">
                        <h2 className="flex mt-1 text-lg font-semibold text-black align-middle">Next Steps: Navigating Your Dashboard</h2>
                        <p className="flex mt-1 text-gray-800 align-middle text-md">Watch this quick tutorial to learn how to navigate and complete your company registration in the UAE.</p>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
};
