import { DragAndDropBox } from '@/Components/DragAndDropBox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { faArrowDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router, useForm } from '@inertiajs/react';
import { Input } from '@material-tailwind/react';
import * as React from 'react';
export default function ShareholderDetails({auth, company_info, step, registration_completed_step, foundersList }){

    const { data, setData, post, errors, progress } = useForm({
        foundersList:foundersList
    });

    React.useEffect(()=>{

        console.log(data.foundersList);

    },[foundersList])


    const [activeFounderEdit, setActiveFounderEdit] = React.useState(0);

    const handleSaveAndContinue = () => {
        router.get(route('founder.dashboard.final-payment', company_info.id));
    }

    const handleActiveFounderEdit = (selectedFounder) => {

        if(selectedFounder === activeFounderEdit){
            setActiveFounderEdit(0);
        }else{
            setActiveFounderEdit(selectedFounder);
        }

    }

    return (
        <CustomerDashboard auth={auth}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="flex flex-col w-full">
                    {data.foundersList.map((founder, index)=>{

                    let job_titles = [{
                        name:'Project Manager',
                        value:'Project Manager'
                    }]

                    let education_qualification = [{
                        name:'PhD',
                        value:'PhD'
                    }]

                    return <div className="flex flex-col w-full border-t border-gray-300 founders founder-item" key={index}>
                        <div className="flex items-center justify-between w-full py-3 founder-acc-title" onClick={()=>{handleActiveFounderEdit(index+1)}}>
                            <div className='flex gap-2'>
                                <h3 className='text-lg font-bold text-green-500'>{founder.first_name+" "+founder.last_name} </h3>
                                <span className='text-lg text-green-500'>(Shareholder {index+1})</span>
                            </div> <FontAwesomeIcon icon={faChevronDown} style={{height: 24, width: 24}}/>
                        </div>
                        {activeFounderEdit==(index+1)?
                        <div className="founder-acc-form">
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Valid Passport Copy</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear, scanned copy of your valid passport.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Valid Passport Copy" auth={auth}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">UAE Visa Page (If Applicable)</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear copy of your UAE visa page if you hold a UAE residence visa.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Original NOC from Existing Sponsor (If Applicable)</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload the original No Objection Certificate (NOC) from your current sponsor, along with a copy of your husband's passport, if applicable.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Address Proof Copy</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a document confirming your full residential address, dated within the last 3 months. Accepted documents include a driving license, bank statement, or government ID. PO Box addresses are not accepted.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Signature Form</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload the specimen signature form</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Shareholders' Resolution</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload the shareholders' resolution for establishing the company</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Undertaking Letter for Share Capital" auth={auth}/>
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="type_of_freezone" className="text-base " value="Do you require visa for this stakeholder?" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="type_of_freezone"
                                            value="1"
                                            id="yes"
                                            checked={founder.visa_status === 1}
                                            className="radio-btn"
                                            onChange={(e) => setData('type_of_freezone', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="yes">Yes</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="type_of_freezone"
                                            value="0"
                                            id="no"
                                            checked={founder.visa_status === 0}
                                            className="radio-btn"
                                            onChange={(e) => setData('type_of_freezone', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="no">No</label>
                                    </div>
                                </div>

                                <InputError message={errors.type_of_freezone} className="mt-2" />
                            </div>
                            {founder.visa_status?<><div className="mt-4">
                                <InputLabel htmlFor="type_of_freezone" className="text-base " value="What’s the current visa status of stakeholder inside or outside the country?" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="type_of_freezone"
                                            value="Outside"
                                            id="outside"
                                            checked={founder.country_status === "outside"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('type_of_freezone', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="outside">Outside</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="type_of_freezone"
                                            value="Inside"
                                            id="inside"
                                            checked={founder.country_status === "Inside"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('type_of_freezone', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="inside">Inside</label>
                                    </div>
                                </div>

                                <InputError message={errors.type_of_freezone} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Select the Religion" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Islam: Shia"
                                            id="islam_shia"
                                            checked={founder.religion === "Islam: Shia"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="islam_shia">Islam: Shia</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Islam: Sunni"
                                            id="islam_sunni"
                                            checked={founder.religion === "Islam: Sunni"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="islam_sunni">Islam: Sunni</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Other"
                                            id="other"
                                            checked={founder.religion === "Other"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="other">Other</label>
                                    </div>
                                </div>

                                <InputError message={errors.type_of_freezone} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Marital Status" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Single"
                                            id="single"
                                            checked={founder.religion === "Single"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="single">Single</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Married"
                                            id="married"
                                            checked={founder.religion === "Married"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="married">Married</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="religion"
                                            value="Divorced"
                                            id="divorced"
                                            checked={founder.religion === "Divorced"}
                                            className="radio-btn"
                                            // onChange={(e) => setData('religion', e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="divorced">Divorced</label>
                                    </div>
                                </div>

                                <InputError message={errors.type_of_freezone} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Job Title" />
                                <div className="flex mt-4 mb-4">
                                    <SelectInput dropdown={job_titles} selectedvalue={""} readOnly></SelectInput>
                                </div>
                                <InputError message={errors.type_of_freezone} className="mt-2" />
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">HR Signatory Letter</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload the HR signatory letter required for your visa application.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Valid Passport Copy" auth={auth}/>
                                </div>
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Consultant Appointment Letter</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload the letter confirming your consultant’s appointment.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Valid Passport Copy" auth={auth}/>
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Job Title" />
                                <div className="flex mt-4 mb-4">
                                    <SelectInput dropdown={education_qualification} selectedvalue={""} readOnly></SelectInput>
                                </div>
                                <InputError message={errors.education_qualification} className="mt-2" />
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Educational Qualification</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload proof of your educational qualifications.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} document_type="Valid Passport Copy" auth={auth}/>
                                </div>
                            </div>


                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Monthly Salary Breakdown (AED)</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Provide a detailed breakdown of your monthly salary, including all allowances.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full gap-2 flex-nowrap">
                                    <div className='flex flex-wrap py-4 monthly-salary-breakdown'>
                                        <div className='w-1/2'>Name</div>
                                        <div className='w-1/2'>Amount</div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Basic Salary</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <TextInput value="" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Transportation Allowance</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <TextInput value="" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Accommodation Allowance</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <TextInput value="" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Other Allowances</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <TextInput value="" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :<></>}
                            <PrimaryButton
                                className="justify-center w-auto my-8 text-center"
                                onClick={() => { handleSaveAndContinue() }}
                            >
                                Save & Continue
                            </PrimaryButton>
                            </div>:<></>}
                        </div>
                    })}
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
