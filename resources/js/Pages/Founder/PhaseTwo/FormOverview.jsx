import { AddMoreIconCard } from "@/Components/AddMoreIconCard";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { StepFromLayout } from "./Steps/StepFromLayout";
import { VideoEmbed } from "@/Components/VideoEmbed";
import thumbnail from "../../../images/intro-video.jpeg";
import videosrc from "../../../videos/landing-page-video.mp4";
import PrimaryButton from "@/Components/PrimaryButton";
import { Phase2FormDetails } from "@/Layouts/Phase2FormDetails";
export default function FormOverview({ auth, company_info, step, registration_completed_step, foundersList }) {

    useEffect(() => {
    }, []);

    const handleNewApplication = () => {
        router.get(route('founder.dashboard.companyname'));
    }

    const handleSaveAndContinue = () => {
        router.put(route('founder.dashboard.review-registrationstore', company_info.id));
    }

    return (
        <CustomerDashboard auth={auth}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="">
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Company Name</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Please enter three name choices for your company in order of preference</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <p className="text-black text-md">Name Your Company</p>
                            <p className="p-2 mt-4 border border-gray-400 rounded-sm col-12 col-md-12">{company_info.company_name_1}</p>
                            <p className="p-2 mt-4 border border-gray-400 rounded-sm col-12 col-md-12">{company_info.company_name_2}</p>
                            <p className="p-2 mt-4 border border-gray-400 rounded-sm col-12 col-md-12">{company_info.company_name_3}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Company Details</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Please enter three name choices for your company in order of preference</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full">
                            <div className="flex flex-col mt-4 md:ml-8">
                                <div className="flex flex-wrap py-2">
                                    <div className="w-4/12 font-semibold">Industry</div><div className="w-1/12">:</div><div className="w-7/12"> {company_info.industry}</div>
                                </div>
                                <div className="flex flex-wrap py-2">
                                    <div className="w-4/12 font-semibold">Description</div><div className="w-1/12">:</div><div className="w-7/12">{company_info.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-full md:w-3/6">
                                <h2 className="text-2xl font-extrabold">Ownership & Visa</h2>
                            </div>
                            {/* <div className="flex justify-end w-3/6 h-full">
                                        <Link
                                            className="px-10 py-4 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button"
                                            href="/founder/foundersdetail"
                                        >
                                            Edit
                                        </Link>
                                    </div> */}
                        </div>
                        <div className="w-full mt-2 founder-list">
                            <div className="pb-4 mt-4 rounded-lg md:ml-8">
                                <table className="w-full bg-transparent table-auto rounded-2xl">
                                    <thead>
                                        <tr className="p-5 rounded-2xl">
                                            <th align="start" className="p-2">
                                                Name
                                            </th>
                                            <th>Split</th>
                                            <th>Manager</th>
                                            <th>Visa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foundersList.map((element, index) => {
                                            return (
                                                <tr key={index} className="px-4 border-t border-b rounded-2xl">
                                                    <td className="p-2">
                                                        {element.first_name + " " + element.last_name}
                                                    </td>
                                                    <td align="center" className="p-2">
                                                        {element.ownership_percentage}
                                                        <span className="p-3">%</span>
                                                    </td>
                                                    <td align="center">
                                                        <div className="relative flex justify-center gap-x-3">
                                                            <div className="flex items-center h-6">
                                                                <input
                                                                    id="manager"
                                                                    name="manager"
                                                                    disabled={true}
                                                                    checked={element.manager}
                                                                    type="checkbox"
                                                                    className="w-5 h-5 text-gray-400 border-gray-300 rounded focus:ring-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td align="center">
                                                        <div className="relative flex justify-center gap-x-3">
                                                            <div className="flex items-center h-6">
                                                                <input
                                                                    id="manager"
                                                                    name="manager"
                                                                    disabled={true}
                                                                    checked={element.visa_status}
                                                                    type="checkbox"
                                                                    className="w-5 h-5 text-gray-400 border-gray-300 rounded focus:ring-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <PrimaryButton
                                    className="justify-center w-full mt-8 text-center"
                                    onClick={() => { handleSaveAndContinue() }}
                                >
                                    Save & Continue
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
