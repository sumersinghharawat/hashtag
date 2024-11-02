import * as React from 'react';
import { DragAndDropBox } from '@/Components/DragAndDropBox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router } from '@inertiajs/react';
import underreviewimage from '../../../Icons/under-progress.svg';
import { RejectedFields } from './RejectedFields';

export default function UnderReview({auth, company_info, step, registration_completed_step, foundersList, company_count, rejectedFields, listindusties }){

    const handleSaveAndContinue = () => {
        router.get(route('founder.dashboard.shareholder-details', company_info.id));
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                {(rejectedFields.company_rejected_fields.length != 0 || rejectedFields.founder_rejected_fields.length != 0)?<RejectedFields rejectedFields={rejectedFields} auth={auth} company_info={company_info} listindusties={listindusties} errors={{}} foundersList={foundersList}/>:
                <div className='flex flex-col flex-wrap items-center justify-center h-full'>
                    <img src={underreviewimage} className='w-2/3 h-full'/>
                    <h2 className="pt-8 pb-6 text-2xl font-extrabold">Company Formation in Progress</h2>
                    <p className="w-3/5 pb-6 mb-6 text-sm text-center text-gray-500">Thank you for completing your application. Your company formation is now under process. Once your company license is ready, we will notify you.</p>
                </div>}
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
