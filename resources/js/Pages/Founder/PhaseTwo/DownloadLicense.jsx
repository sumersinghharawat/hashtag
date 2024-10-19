import * as React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, router } from '@inertiajs/react';
import downloadlicense from '../../../images/downloadlicense.jpg';
import { redirect } from 'react-router-dom';

export default function DownloadLicense({auth, company_info, step, registration_completed_step, foundersList, company_count, rejectedFields, listindusties }){

    const handleSaveAndContinue = () => {
        router.get(route('founder.dashboard.shareholder-details', company_info.id));
    }

    const handleDownloadAllDocuments = () => {
        router.get(route('founder.dashboard.download-all-documents', company_info.id));
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step+1} step={step} name={auth.user.name}>
                <div className='flex flex-col flex-wrap items-center justify-center h-full'>
                    <img src={downloadlicense} className='w-48 h-full p-6 bg-white rounded-lg shadow'/>
                    <h2 className="pt-8 pb-6 text-2xl font-extrabold">Your Company License is Ready!</h2>
                    <p className="w-3/5 pb-6 mb-6 text-sm text-center text-gray-500">Congratulations! Your company license has been successfully issued. You can now download your license document by clicking the button below.</p>
                    <PrimaryButton onClick={()=>handleDownloadAllDocuments()} >Download All Documents Pack</PrimaryButton>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
