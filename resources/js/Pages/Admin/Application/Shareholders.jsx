import SelectInput from "@/Components/SelectInput";
import Dashboard from "@/Pages/Dashboard";
import { useForm } from "@inertiajs/react";
import { ApplicationLayout } from "./ApplicationLayout";
import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Shareholders({ auth, company_info, children }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        application_form_field_id: null,
        description: null,
        status: null,
    });

    const [open, setOpen] = useState(false);
    const [shareholders, setShareholders] = useState({});

    useEffect(() => {

        if (company_info) {
            const applicationFields = company_info?.application_fields || [];
            const shareholdersTemp = {};
            applicationFields.forEach((field) => {
                const { application_form_field_name, application_form_field_value, id, varification_status, founder_id, agent_id, description } = field;
                if (founder_id != null && founder_id != 0) {
                    const index = founder_id;
                    shareholdersTemp[index] = [...(shareholdersTemp[index] || []), { id, name: application_form_field_name, value: application_form_field_value, status: varification_status, founder_id: founder_id, agent_id: agent_id, description: description }];
                }
            });
            setShareholders(shareholdersTemp);
        }
    }, [company_info])

    const openModal = (status, application_form_field_id) => {
        data.status = status;
        data.application_form_field_id = application_form_field_id;
        data.description = null;
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const ChangeStatus = (e) => {
        e.preventDefault();
        setData('description', e.target.value);
        put(route('admin.dashboard.viewrequestupdate', { id: company_info.id }), {
            preserveScroll: false,
            onSuccess: () => {
                closeModal();
            }
        }
        );
    }

    return (
        <Dashboard auth={auth.user}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10">
                            <div className="flex flex-col justify-between px-4 sm:px-0">
                                <div className="w-4/5">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                                    <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">Personal details and application.</p>
                                </div>
                                <ApplicationLayout company_id={company_info?.id} rejected_fields_count={company_info?.rejected_fields_count}>
                                    <div className="flex flex-col w-full">
                                        {Object.keys(shareholders).map((key, index) => {
                                            return <div key={key}>
                                                <div className="mt-4">
                                                    <h2 className="text-xl font-semibold leading-7 text-gray-900">Shareholder Details {key}</h2>
                                                    <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500 border-b border-gray-200">
                                                        Shareholder Name: {company_info.founders[index].first_name} {company_info.founders[index].last_name}
                                                    </p>
                                                </div>
                                                {shareholders[key].map(shareholder => (
                                                    <div key={shareholder.id} className="flex items-center border-b border-gray-200">
                                                        <div className="flex flex-col w-full">
                                                            {shareholder.name == 'manager' ?
                                                                <><p className="font-semibold text-md">Shareholder Role</p><p className="text-md">{shareholder.value}</p>
                                                                {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                 </> :
                                                                (shareholder.name == 'ownership_percentage' ?
                                                                    <><p className="font-semibold text-md">Shareholder Own</p><p className="text-md">{shareholder.value}%</p>
                                                                    {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                    </> :
                                                                    (shareholder.name == 'Valid Passport Copy' ?
                                                                        <><p className="font-semibold text-md">Valid Passport Copy</p><p className="text-md">{shareholder.value ? <a href={shareholder.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Document</a> : 'No'}</p>
                                                                        {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                        </> :
                                                                        (shareholder.name == 'UAE Visa Page' ?
                                                                            <><p className="font-semibold text-md">UAE Visa Page</p><p className="text-md">{shareholder.value ? <a href={shareholder.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Document</a> : 'No'}</p>
                                                                            {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                            </> :
                                                                            (shareholder.name == 'Address Proof Copy' ?
                                                                                <><p className="font-semibold text-md">Address Proof Copy</p><p className="text-md">{shareholder.value ? <a href={shareholder.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Document</a> : 'No'}</p>
                                                                                {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                                </> :
                                                                                (shareholder.name == 'visa_status' ?
                                                                                    <><p className="font-semibold text-md">Visa Status</p><p className="text-md">{shareholder.value ==1? 'Yes' : 'No'}</p>
                                                                                    {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                                    </> :
                                                                                    (shareholder.name == 'Educational Qualification' ?
                                                                                        <><p className="font-semibold text-md">Educational Qualification</p><p className="text-md">{shareholder.value ? <a href={shareholder.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Document</a> : 'No'}</p>
                                                                                        {shareholder.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {shareholder.description} </p>: ''}
                                                                                        </> :
                                                                                        <><p className="font-semibold text-md">{shareholder.name}</p><p className="text-md">{shareholder.value}</p></>
                                                                                    ))
                                                                            ))
                                                                    ))
                                                            }
                                                        </div>
                                                        <div className="w-1/2">
                                                            <div className="flex justify-end gap-2">
                                                            {(auth.user.id !== parseInt(shareholder.agent_id)) ?<>
                                                        {shareholder.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{shareholder.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(shareholder.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{shareholder.status}</p>}
                                                            </>
                                                    :
                                                    <>{shareholder.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',shareholder.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',shareholder.id)}>Rejected</button>
                                                    </>:<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(shareholder.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{shareholder.status}</p>}
                                                    </>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        })}
                                    </div>
                                </ApplicationLayout>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={open} onClose={closeModal}>
                <form onSubmit={ChangeStatus} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to change the status?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        {data.status == "Verified" ? "Please confirm that you want to approve this request." : "Please enter your reason to reject this request."}
                    </p>
                    {data.status == "Rejected" ? <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextareaInput
                            id="description"
                            name="description"
                            value={data.description ? data.description : ''}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                            autoFocus
                            className="block w-full mt-1"
                            autoComplete="current-description"
                            placeholder="Description"
                        />

                        <InputError message={errors.company_status} className="mt-2" />
                    </div> : <></>}

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <button className={"ms-3 py-4 px-6 rounded-full text-white "+(data.status=='Rejected'?'bg-red-600':'bg-secondary')} disabled={processing}>
                            {data.status}
                        </button>
                    </div>
                </form>
            </Modal>
        </Dashboard>
    );
};

