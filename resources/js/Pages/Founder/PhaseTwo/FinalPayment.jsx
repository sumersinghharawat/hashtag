import { DragAndDropBox } from '@/Components/DragAndDropBox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router } from '@inertiajs/react';
import * as React from 'react';
export default function FinalPayment({auth, company_info, step, registration_completed_step, foundersList }){

    const handleSaveAndContinue = () => {
        router.get(route('founder.dashboard.final-review', company_info.id));
    }

    return (
        <CustomerDashboard auth={auth}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
            <h2 className="text-2xl font-extrabold">Pay</h2>
                <p className="pb-6 mt-4 mb-6 text-sm text-gray-500 border-b">Please review the total fee for the company license below and proceed with your payment.</p>

                {/* <form className="flex flex-wrap mt-4 align-top"> */}
                    <div className="flex justify-between w-full">
                        <div className="w-3/6 text-xl font-bold">
                            License Fee
                        </div>
                        <div className="w-3/6 text-2xl font-bold text-end">
                            AED 20,000
                            {/* <p className="text-base text-gray-500">one time fee</p> */}
                        </div>
                    </div>
                    <div className="flex justify-between w-full pb-6">
                        <div className="flex w-full">
                            <ul className="p-0 m-0 ml-8 text-base text-gray-500 list-none">
                                <li>DMCC Company Formation</li>
                                <li>Visa Costs</li>
                            </ul>
                            <ul className="p-0 m-0 ml-8 text-base text-gray-500 list-none">
                                <li>AED 12,000</li>
                                <li>AED 8,000</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full pt-4 text-base text-gray-500 border-t">
                    </div>
                    <div className="flex items-center justify-start w-full gap-2 mt-10">
                        {/* <SecondaryButton className="justify-center text-center" disabled={processing} onClick={goBack}>
                            Back
                        </SecondaryButton> */}
                        <PrimaryButton className="justify-center w-full text-center" onClick={()=>handleSaveAndContinue()}>
                            Pay Now & Submit Application
                        </PrimaryButton>
                    </div>
                {/* </form> */}
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
