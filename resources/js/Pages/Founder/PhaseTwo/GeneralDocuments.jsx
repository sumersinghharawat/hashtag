import { DragAndDropBox } from '@/Components/DragAndDropBox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router } from '@inertiajs/react';
import * as React from 'react';
export default function GeneralDocuments({auth, company_info, step, registration_completed_step, foundersList }){

    const handleSaveAndContinue = () => {
        router.get(route('founder.dashboard.shareholder-details', company_info.id));
    }

    return (
        <CustomerDashboard auth={auth}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="">
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Undertaking Letter for Share Capital</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Upload the letter stating your commitment to the company's share capital requirements.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Undertaking for Management Consultancy</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Provide the declaration agreeing to management consultancy guidelines.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Declaration of Ultimate Beneficial Owners</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Submit a declaration identifying the company's ultimate beneficial owners.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Authorization Letter</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Upload the letter authorizing representatives to act on behalf of your company.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Business Plan</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Provide a detailed business plan outlining your company’s objectives and strategies.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                        </div>
                    </div>
                    <PrimaryButton
                        className="justify-center w-full mt-8 text-center"
                        onClick={() => { handleSaveAndContinue() }}
                    >
                        Save & Continue
                    </PrimaryButton>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
