import { DragAndDropBox } from '@/Components/DragAndDropBox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, router } from '@inertiajs/react';
import * as React from 'react';
import iconArrowDownload from '../../../Icons/download-icon.svg';
import samplePdf from '../../../pdf/file-sample_150kB.pdf';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

export default function GeneralDocuments({auth, company_info, step, registration_completed_step, foundersList, errors, company_count }){

    const [documentBusinessPlanFileName, setDocumentBusinessPlanFileName] = React.useState(null);
    const [documentOtherDocumentFileName, setDocumentOtherDocumentFileName] = React.useState(null);

    React.useEffect(()=>{
        updatedocument();
    })

    const updatedocument = () => {
        setDocumentBusinessPlanFileName(company_info.documentBusinessPlanFileName);
        setDocumentOtherDocumentFileName(company_info.documentOtherDocumentFileName);
    }

    const handleSaveAndContinue = () => {
        router.put(route('founder.dashboard.general-documentstore', company_info.id),
            {
                BusinessPlanFile: documentBusinessPlanFileName,
                OtherDocumentFile: documentOtherDocumentFileName
            },
        );
    }

    const goBack = () => {
        router.get(route('founder.dashboard.review-registration',company_info.id));
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="">
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between">
                                <h2 className="text-2xl font-extrabold">Business Plan</h2>
                                <a href={samplePdf} target="_blank" className="flex justify-end gap-2 cursor-pointer text-primary"><img src={iconArrowDownload} style={{height:20,width:20}}/><div className="w-full">Download Sample</div></a>
                            </div>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Provide a detailed business plan outlining your company’s objectives and strategies.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Business Plan" updatedocument={()=>{updatedocument()}} auth={auth} uploaded_document_file={company_info.documentBusinessPlanFileUrl} uploaded_document_file_name={documentBusinessPlanFileName}/>
                            <InputError message={errors.BusinessPlanFile} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Other Documents</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Please upload any additional documents. This could include any other legal, financial, or company-related documentation.</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <DragAndDropBox company_info={company_info} document_type="Other Document" updatedocument={()=>{updatedocument()}} auth={auth} uploaded_document_file={company_info.documentOtherDocumentFileUrl} uploaded_document_file_name={documentOtherDocumentFileName}/>
                            <InputError message={errors.OtherDocumentFile} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <SecondaryButton className="justify-center text-center" onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton
                            className="justify-center w-full text-center"
                            onClick={() => { handleSaveAndContinue() }}
                        >
                            Save & Continue
                        </PrimaryButton>
                    </div>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
