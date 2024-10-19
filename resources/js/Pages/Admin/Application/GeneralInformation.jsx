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

export default function GeneralInformation({ auth, company_info, children }) {
    const { data, setData, post, put,processing, errors, reset } = useForm({
        application_form_field_id: null,
        description: null,
        status: null,
    });

    const [open, setOpen] = useState(false);

    const [Company1, setCompany1] = useState({});
    const [Company2, setCompany2] = useState({});
    const [Company3, setCompany3] = useState({});
    const [Industry, setIndustry] = useState({});
    const [Description, setDescription] = useState({});

    useEffect(() => {
            company_info?.application_fields.forEach((field) => {
                const { application_form_field_name, application_form_field_value, id, varification_status, agent_id, description } = field;
                switch (application_form_field_name) {
                    case 'company_name_1':
                        setCompany1({ id, value: application_form_field_value, status: varification_status, agent_id: agent_id, description: description });
                        break;
                    case 'company_name_2':
                        setCompany2({ id, value: application_form_field_value, status: varification_status, agent_id: agent_id, description: description });
                        break;
                    case 'company_name_3':
                        setCompany3({ id, value: application_form_field_value, status: varification_status, agent_id: agent_id, description: description });
                        break;
                    case 'industry':
                        setIndustry({ id, value: application_form_field_value, status: varification_status, agent_id: agent_id, description: description });
                        break;
                    case 'description':
                        setDescription({ id, value: application_form_field_value, status: varification_status, agent_id: agent_id, description: description });
                        break;
                    default:
                        break;
                }
            });
    }, [company_info])

    const openModal = (status, application_form_field_id) => {
        data.status = status;
        data.application_form_field_id =  application_form_field_id;
        data.description = null;
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const ChangeStatus = (e) => {
        e.preventDefault();
        setData('description', e.target.value);
        put(route('admin.dashboard.viewrequestupdate', { id: company_info.id }),{
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
                                <ApplicationLayout company_id={company_info?.id}  rejected_fields_count={company_info?.rejected_fields_count}>
                                    <div className="flex flex-col w-full">
                                        <div key={Company1.id} className="flex items-center border-b border-gray-200">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full font-semibold">Company Name 1</div>
                                                <div className="w-full">{Company1.value}</div>
                                                {Company1.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {Company1.description} </p>: ''}
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex justify-end gap-2">
                                                    {(auth.user.id !== parseInt(Company1.agent_id)) ?<>
                                                        {Company1.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{Company1.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company1.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company1.status}</p>}
                                                            </>
                                                    :
                                                    <>{Company1.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',Company1.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',Company1.id)}>Rejected</button>
                                                    </>:
                                                    <>
                                                    <p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company1.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company1.status}</p>
                                                    {/* {Company1.status === 'Cancel' ?<button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Cancel',Company2.id)}>Rejected</button>:<></>} */}
                                                    </>
                                                    }
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div key={Company2.id} className="flex items-center border-b border-gray-200">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full font-semibold">Company Name 2</div>
                                                <div className="w-full">{Company2.value}</div>
                                                {Company2.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {Company2.description} </p>: ''}
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex justify-end gap-2">
                                                {(auth.user.id !== parseInt(Company2.agent_id)) ?<>
                                                        {Company2.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{Company2.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company2.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company2.status}</p>}
                                                            </>
                                                    :
                                                    <>{Company2.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',Company2.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',Company2.id)}>Rejected</button>
                                                    </>:
                                                    <>
                                                    <p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company2.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company2.status}</p>
                                                    </>
                                                    }
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div key={Company3.id} className="flex items-center border-b border-gray-200">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full font-semibold">Company Name 3</div>
                                                <div className="w-full">{Company3.value}</div>
                                                {Company3.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {Company3.description} </p>: ''}
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex justify-end gap-2">
                                                {(auth.user.id !== parseInt(Company3.agent_id)) ?<>
                                                        {Company3.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{Company3.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company3.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company3.status}</p>}
                                                            </>
                                                    :
                                                    <>{Company3.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',Company3.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',Company3.id)}>Rejected</button>
                                                    </>:<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Company3.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Company3.status}</p>}
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div key={Industry.id} className="flex items-center border-b border-gray-200">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full font-semibold">Industry</div>
                                                <div className="w-full">{Industry.value}</div>
                                                {Industry.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {Industry.description} </p>: ''}
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex justify-end gap-2">
                                                {(auth.user.id !== parseInt(Industry.agent_id)) ?<>
                                                        {Industry.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{Industry.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Industry.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Industry.status}</p>}
                                                            </>
                                                    :
                                                    <>{Industry.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',Industry.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',Industry.id)}>Rejected</button>
                                                    </>:<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Industry.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Industry.status}</p>}
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div key={Description.id} className="flex items-center border-b border-gray-200">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full font-semibold">Description</div>
                                                <div className="w-full">{Description.value}</div>
                                                {Description.status === 'Rejected'?<p className="w-full text-yellow-500"><FontAwesomeIcon icon={faInfo} className="w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full" /> {Description.description} </p>: ''}
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex justify-end gap-2">
                                                {(auth.user.id !== parseInt(Description.agent_id)) ?<>
                                                        {Description.status === 'Under Review' ?
                                                            <p className={"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500"}>{Description.status}</p>
                                                            :<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Description.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Description.status}</p>}
                                                            </>
                                                    :
                                                    <>{Description.status === 'Under Review'?
                                                    <>
                                                        <button className="px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg" onClick={() => openModal('Verified',Description.id)}>Confirm</button>
                                                        <button className="px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg" onClick={() => openModal('Rejected',Description.id)}>Rejected</button>
                                                    </>:<p className={"px-4 py-2 m-2 text-green-100 rounded-lg"+(Description.status === 'Verified' ? " bg-green-600" : " bg-red-600")}>{Description.status}</p>}
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
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
                        {data.status=="Verified"?"Please confirm that you want to approve this request.":"Please enter your reason to Rejected this request."}
                    </p>
                    {data.status=="Rejected"?<div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextareaInput
                            id="description"
                            name="description"
                            value={data.description?data.description:''}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                            autoFocus
                            className="block w-full mt-1"
                            autoComplete="current-description"
                            placeholder="Description"
                        />

                        <InputError message={errors.company_status} className="mt-2" />
                    </div>:<></>}

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

