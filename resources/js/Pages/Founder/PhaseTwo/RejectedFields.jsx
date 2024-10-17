import { DragAndDropBox } from '@/Components/DragAndDropBox';
import InputError from '@/Components/InputError';
import * as React from 'react';
import iconArrowDownload from '../../../Icons/download-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import samplePdf from '../../../pdf/file-sample_150kB.pdf';

export const RejectedFields = ({ rejectedFields, auth, company_info, errors }) => {

    const {data, setData} = useForm({
        company_name_1: company_info.company_name_1,
        company_name_2: company_info.company_name_2,
        company_name_3: company_info.company_name_3,
    });


    return (
        <div>
            {rejectedFields.map((field) => (
                <div key={field.id} className="w-full">
                    {/* {JSON.stringify(field)} */}
                    {(field.application_form_field_name === 'company_name_1') ?<>
                        <div>
                        <InputLabel htmlFor="company_name" className="text-base" value="Name your company" />

                        <div className="flex flex-row items-center w-full gap-2">
                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                        </div>
                        <TextInput
                            id="company_name"
                            name="company_name_1"
                            value={data.company_name_1}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 1'
                            onChange={(e) => setData('company_name_1', e.target.value)}
                        />

                        <InputError message={''} className="mt-2" />
                    </div>
                    </>:<></>}
                    {field.application_form_field_name === 'company_name_2' ?<>
                    <div>

                        <div className="flex flex-row items-center w-full gap-2">
                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                        </div>
                        <TextInput
                            id="company_name"
                            name="company_name_2"
                            value={data.company_name_2}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 2'
                            onChange={(e) => setData('company_name_2', e.target.value)}
                        />

                        <InputError message={''} className="mt-2" />
                    </div>
                    </>:<></>}
                    {field.application_form_field_name === 'company_name_3' ?<>
                    <div>

                        <div className="flex flex-row items-center w-full gap-2">
                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                        </div>
                        <TextInput
                            id="company_name"
                            name="company_name_3"
                            value={data.company_name_3}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 3'
                            onChange={(e) => setData('company_name_3', e.target.value)}
                        />

                        <InputError message={''} className="mt-2" />
                    </div>
                    </>:<></>}
                    {/* {field.application_form_field_name === 'Business Plan' ?
                        <div className="flex flex-col w-full h-full pb-6">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-2xl font-extrabold">Business Plan</h2>
                                    <a href={samplePdf} target="_blank" className="flex justify-end gap-2 cursor-pointer text-primary"><img src={iconArrowDownload} style={{ height: 20, width: 20 }} /><div className="w-full">Download Sample</div></a>
                                </div>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Provide a detailed business plan outlining your company’s objectives and strategies.</p>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                            </div>
                            <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                {field.document}
                                <DragAndDropBox company_info={company_info} document_type="Business Plan" updatedocument={() => { updatedocument() }} auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    }
                    {field.application_form_field_name === 'Other Document' ?
                        <div className="flex flex-col w-full h-full pb-6">
                            <div className="flex flex-col w-full">
                                <h2 className="text-2xl font-extrabold">Other Documents</h2>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Please upload any additional documents. This could include any other legal, financial, or company-related documentation.</p>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                            </div>
                            <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                <DragAndDropBox company_info={company_info} document_type="Other Document" updatedocument={() => { updatedocument() }} auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    } */}
                    {/* {field.application_form_field_name === 'UAE Visa Page' ?
                        <div className="flex flex-col w-full h-full pb-6">
                            <div className="flex flex-col w-full">
                                <div className="flex gap-2 items-bottom">
                                    <h2 className="text-2xl font-extrabold">UAE Visa Page</h2>
                                    <p className="m-0 mt-2 text-black text-md">(If Applicable)</p>
                                </div>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear copy of your UAE visa page if you hold a UAE residence visa.</p>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                            </div>
                            <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                <DragAndDropBox company_info={company_info} updatedocument={() => { }} document_type="UAE Visa Page" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={field.founder_id} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    }
                    {field.application_form_field_name === 'Address Proof Copy' ?
                        <div className="flex flex-col w-full h-full pb-6">
                            <div className="flex flex-col w-full">
                                <h2 className="text-2xl font-extrabold">Address Proof Copy</h2>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Upload a document confirming your full residential address, dated within the last 3 months. Accepted documents include a utility bills, bank statement, or government ID. PO Box addresses are not accepted.</p>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                            </div>
                            <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                <DragAndDropBox company_info={company_info} updatedocument={() => updateStateInFounderList()} document_type="Address Proof Copy" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={field.founder_id} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    }
                    {field.application_form_field_name === 'Educational Qualification' ?
                        <div className="flex flex-col w-full h-full pb-6">
                            <div className="flex flex-col w-full">
                                <h2 className="text-2xl font-extrabold">Educational Qualification</h2>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Upload proof of your educational qualifications.</p>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                            </div>
                            <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                <DragAndDropBox company_info={company_info} updatedocument={() => updateStateInFounderList()} document_type="Educational Qualification" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={field.founder_id} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    } */}
                </div>
            ))}

            <div className="flex items-center justify-start mt-10">
                <PrimaryButton className="justify-center w-full text-center">
                    Submit
                </PrimaryButton>
            </div>
        </div>
    );
};
