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
export default function ShareholderDetails({auth, company_info, step, registration_completed_step, foundersList, job_titles, education_qualification, company_count }){

    const { data, setData, post, put, errors, progress } = useForm({
        foundersList:foundersList
    });

    const [founderSplitList, setFounderSplitList] = React.useState(foundersList);
    const [founderRoles, setFounderRoles] = React.useState(null);
    const [jobTitlesUpdateList, setJobTitlesUpdateList] = React.useState([{'name':'Select Your Job Title', 'value':null}]);
    const [educationQualification, setEducationQualification] = React.useState([{'name':'Select Your Education Qualification', 'value':null}]);

    React.useEffect(()=>{

        console.log(foundersList);

        // Make List of Job title
        const job_titles_update_list = job_titles.map((element) => {
            if (element.title) {
                return { 'name': element.title, 'value': element.title };
            }
            return null;
        }).filter(Boolean);
        const updatedJobTitles = [{ 'name': 'Select Your Job Title', 'value': null }, ...job_titles_update_list];
        setJobTitlesUpdateList(updatedJobTitles);

        // Make List of Education Qualification
        const education_qualification_update_list = education_qualification.map((element) => {
            if (element.title) {
                return { 'name': element.title, 'value': element.title };
            }
            return null;
        }).filter(Boolean);
        const updatedEducationQualification = [{ 'name':'Select Your Education Qualification', 'value': null }, ...education_qualification_update_list];
        setEducationQualification(updatedEducationQualification);

        updateStateInFounderList();

    },[foundersList])


    const [activeFounderEdit, setActiveFounderEdit] = React.useState(0);

    const handleSaveAndContinue = () => {

        updateStateInFounderList();

        put(route('founder.dashboard.shareholder-detailsstore', company_info.id));
    }


    const updateStateInFounderList = async () => {
        const updatedFoundersList = foundersList.map((element, index) => {
            const splitData = founderSplitList[index];

            element.father_name = splitData.father_name?splitData.father_name:element.father_name;
            element.mother_name = splitData.mother_name?splitData.mother_name:element.mother_name;
            element.manager = splitData.manager?splitData.manager:element.manager;
            element.religion = splitData.religion?splitData.religion:element.religion;
            element.visa_status = parseInt(splitData.visa_status)?parseInt(splitData.visa_status):element.visa_status;
            element.marital_status = splitData.marital_status?splitData.marital_status:element.marital_status;
            element.job_title = splitData.job_title?splitData.job_title:element.job_title;
            element.educational_qualification = splitData.educational_qualification?splitData.educational_qualification:element.educational_qualification;
            element.country_status = splitData.country_status?splitData.country_status:element.country_status;
            element.basic_salary = splitData.basic_salary?splitData.basic_salary:element.basic_salary;
            element.transportation_allowance = splitData.transportation_allowance?splitData.transportation_allowance:element.transportation_allowance;
            element.accommodation_allowance = splitData.accommodation_allowance?splitData.accommodation_allowance:element.accommodation_allowance;
            element.other_allowances = splitData.other_allowances?splitData.other_allowances:element.other_allowances;

            return element; // If no splitData, return the original element
        });

        // Update the state with the new list
        // setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList); // Make sure to update the correct data here
        setFounderSplitList(updatedFoundersList); // Make sure to update the correct data here
    };


    const handleActiveFounderEdit = (selectedFounder) => {

        if(selectedFounder === activeFounderEdit){
            setActiveFounderEdit(0);
        }else{
            setActiveFounderEdit(selectedFounder);
        }

    }

    const updateManager = async (value, id) => {

        const updatedFoundersList = founderSplitList.map(obj => {
            // var managerStatus = obj.manager == 'No Manager' ? 'Manager' : 'No Manager';
            if (obj.id === id) {
                let founder_roles = obj.manager;
                if(founder_roles == 'No Manager'){
                    founder_roles = "";
                }

                // Split roles into an array if there are existing roles
                let rolesArray = founder_roles ? founder_roles.split(',') : [];

                // Check if the value exists in the roles array
                if (rolesArray.includes(value)) {
                    if(value == founder_roles){
                        rolesArray = [];
                        rolesArray.push("No Manager");
                    }else{
                        rolesArray = rolesArray.filter(role => role !== value);
                    }
                } else {
                    // If the role doesn't exist, add it
                    rolesArray.push(value);
                }

                // Join the roles back into a string
                founder_roles = rolesArray.length ? rolesArray.join(',') : 'No Manager';

                // Update the object with the new roles
                obj = { ...obj, manager: founder_roles };
                return obj;
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const UpdateVisaStatus = async (id,value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, visa_status: parseInt(value) };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateCountryStatus = async (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, country_status: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateReligionStatus = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, religion: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateMarriageStatus = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, marital_status: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateJobTitle = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, job_title: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }
    const updateEducationalQualification = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, educational_qualification: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateFatherName = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, father_name: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateMotherName = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, mother_name: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateBasicSalary = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, basic_salary: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateTransportationAllowance = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, transportation_allowance: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateAccommodationAllowance = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, accommodation_allowance: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const updateOtherAllowancesName = (id, value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, other_allowances: value };
                return obj;
            }
            return obj;
        });
        setFounderSplitList(updatedFoundersList);
        setData('foundersList', updatedFoundersList);
    }

    const checkFounderRole = (value,id) => {
        let founderRoleExist = false;
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                const rolesArray = obj.manager.split(',').map(role => role.trim());
                founderRoleExist = rolesArray.includes(value);
                return obj;
            }
            return obj;
        });
        return founderRoleExist;
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="flex flex-col w-full">
                    {Object.keys(errors).length?<div className="text-red-500">Please fill complete details for each shareholders.</div>:<></>}
                    {founderSplitList.map((founder, index)=>{
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
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <div className="flex py-2 border-t border-b border-gray-300">
                                        <div className="w-full text-center">
                                            <InputLabel htmlFor="founder_role_director" className="text-base " value="Director" />
                                        </div>
                                        <div className="w-full text-center">
                                            <InputLabel htmlFor="founder_role_secretary" className="text-base " value="Secretary" />
                                        </div>
                                        <div className="w-full text-center">
                                            <InputLabel htmlFor="founder_role_manager" className="text-base " value="Manager" />
                                        </div>
                                    </div>
                                    <div className="flex py-4 border-b border-gray-300">
                                        <div className="w-full text-center">
                                            <input
                                                id="founder_role_director"
                                                name="founder_role"
                                                onChange={(e) => updateManager(e.target.value, founder.id)}
                                                checked={checkFounderRole("Director", founder.id)}
                                                type="checkbox"
                                                value="Director"
                                                className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                            />
                                        </div>
                                        <div className="w-full text-center">
                                            <input
                                                id="founder_role_secretary"
                                                name="founder_role"
                                                onChange={(e) => updateManager(e.target.value, founder.id)}
                                                checked={checkFounderRole("Secretary", founder.id)}
                                                type="checkbox"
                                                value="Secretary"
                                                className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                            />
                                        </div>
                                        <div className="w-full text-center">
                                            <input
                                                id="founder_role_manager"
                                                name="founder_role"
                                                onChange={(e) => updateManager(e.target.value, founder.id)}
                                                checked={checkFounderRole("Manager", founder.id)}
                                                type="checkbox"
                                                value="Manager"
                                                className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Valid Passport Copy</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear, scanned copy of your valid passport.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList()} document_type="Valid Passport Copy" auth={auth} uploaded_document_file={founder.documentValidPassportCopyFileUrl} uploaded_document_file_name={founder.documentValidPassportCopyFileName} founder_id={founder.id}/>
                                    <InputError message={errors["foundersList."+index+".documentValidPassportCopyFileName"]} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <div className="flex gap-2 items-bottom">
                                        <h2 className="text-2xl font-extrabold">UAE Visa Page</h2>
                                        <p className="m-0 mt-2 text-black text-md">(If Applicable)</p>
                                    </div>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear copy of your UAE visa page if you hold a UAE residence visa.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList()} document_type="UAE Visa Page" auth={auth} uploaded_document_file={founder.documentUAEVisaPageFileUrl} uploaded_document_file_name={founder.documentUAEVisaPageFileName} founder_id={founder.id}/>
                                    <InputError message={errors["foundersList."+index+".documentUAEVisaPageFileName"]} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Address Proof Copy</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload a document confirming your full residential address, dated within the last 3 months. Accepted documents include a utility bills, bank statement, or government ID. PO Box addresses are not accepted.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList()} document_type="Address Proof Copy" auth={auth} uploaded_document_file={founder.documentAddressProofCopyFileUrl} uploaded_document_file_name={founder.documentAddressProofCopyFileName} founder_id={founder.id}/>
                                    <InputError message={errors["foundersList."+index+".documentAddressProofCopyFileName"]} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="visa_status" className="text-base " value="Do you require visa for this stakeholder?" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="visa_status"
                                            value="1"
                                            id="yes"
                                            checked={parseInt(founder.visa_status) === 1}
                                            className="radio-btn"
                                            onChange={(e) => UpdateVisaStatus(founder.id,e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="yes">Yes</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="visa_status"
                                            value="-1"
                                            id="no"
                                            checked={parseInt(founder.visa_status) === -1}
                                            className="radio-btn"
                                            onChange={(e) => UpdateVisaStatus(founder.id,e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="no">No</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="visa_status"
                                            value="0"
                                            id="later"
                                            checked={parseInt(founder.visa_status) === 0 || founder.visa_status == null}
                                            className="radio-btn"
                                            onChange={(e) => UpdateVisaStatus(founder.id,e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="later">Later</label>
                                    </div>
                                </div>
                            </div>
                            {founder.visa_status===1?<><div className="mt-4">
                                <InputLabel htmlFor="type_of_freezone" className="text-base " value="What’s the current visa status of stakeholder inside or outside the country?" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="type_of_freezone"
                                            value="Outside"
                                            id="outside"
                                            checked={founder.country_status === "Outside"}
                                            className="radio-btn"
                                            onChange={(e) => updateCountryStatus(founder.id, e.target.value)}
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
                                            onChange={(e) => updateCountryStatus(founder.id, e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="inside">Inside</label>
                                    </div>
                                </div>

                                <InputError message={errors["foundersList."+index+".country_status"]} className="mt-2" />
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
                                            onChange={(e) => updateReligionStatus(founder.id, e.target.value)}
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
                                            onChange={(e) => updateReligionStatus(founder.id, e.target.value)}
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
                                            onChange={(e) => updateReligionStatus(founder.id, e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="other">Other</label>
                                    </div>
                                </div>

                                <InputError message={errors["foundersList."+index+".religion"]} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="marital_status" className="text-base " value="Marital Status" />
                                <div className="flex mt-4 mb-4">
                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="marital_status"
                                            value="Single"
                                            id="single"
                                            checked={founder.marital_status === "Single"}
                                            className="radio-btn"
                                            onChange={(e) => updateMarriageStatus(founder.id, e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="single">Single</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="marital_status"
                                            value="Married"
                                            id="married"
                                            checked={founder.marital_status === "Married"}
                                            className="radio-btn"
                                            onChange={(e) => updateMarriageStatus(founder.id, e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="married">Married</label>
                                    </div>

                                    <div className="col-auto">
                                        <input
                                            type="radio"
                                            name="marital_status"
                                            value="Divorced"
                                            id="divorced"
                                            checked={founder.marital_status === "Divorced"}
                                            className="radio-btn"
                                            onChange={(e) => updateMarriageStatus(founder.id, e.target.value)}
                                        />
                                        <label className="radio-btn-input" htmlFor="divorced">Divorced</label>
                                    </div>
                                </div>

                                <InputError message={errors["foundersList."+index+".marital_status"]} className="mt-2" />
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <p className="mt-2 rounded-sm col-12 col-md-12">
                                        <InputLabel htmlFor="father_name" className="text-base " value="Father's Name" />
                                        <TextInput
                                            id="father_name"
                                            name="father_name"
                                            value={founder.father_name}
                                            className="block w-full py-4 mt-2 bg-transparent"
                                            autoComplete="father_name"
                                            placeholder='Father’s Name'
                                            isFocused={false}
                                            onChange={(e) => updateFatherName(founder.id, e.target.value)}
                                        />
                                        <InputError message={errors["foundersList."+index+".father_name"]} className="mt-2" />
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <p className="mt-2 rounded-sm col-12 col-md-12">
                                        <InputLabel htmlFor="mother_name" className="text-base " value="Mother's Name" />
                                        <TextInput
                                            id="mother_name"
                                            name="mother_name"
                                            value={founder.mother_name}
                                            className="block w-full py-4 mt-2 bg-transparent"
                                            autoComplete="mother_name"
                                            placeholder='Mother’s Name'
                                            isFocused={false}
                                            onChange={(e) => updateMotherName(founder.id, e.target.value)}
                                        />
                                        <InputError message={errors["foundersList."+index+".mother_name"]} className="mt-2" />
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Job Title" />
                                <div className="flex mt-4 mb-4">
                                    <SelectInput dropdown={jobTitlesUpdateList} selectedvalue={founder.job_title} onChange={(e)=>{ updateJobTitle(founder.id, e.target.value) }}></SelectInput>
                                </div>
                                <InputError message={errors["foundersList."+index+".job_title"]} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="religion" className="text-base " value="Education Qualification" />
                                <div className="flex mt-4 mb-4">
                                    <SelectInput dropdown={educationQualification} selectedvalue={founder.educational_qualification} onChange={(e)=>{updateEducationalQualification(founder.id, e.target.value)}}></SelectInput>
                                </div>
                                <InputError message={errors["foundersList."+index+".educational_qualification"]} className="mt-2" />
                            </div>

                            <div className="flex flex-col w-full h-full py-6">
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-extrabold">Educational Qualification</h2>
                                    <p className="mt-2 mb-4 text-sm text-gray-500">Upload proof of your educational qualifications.</p>
                                </div>
                                <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                    <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList()} document_type="Educational Qualification" auth={auth} uploaded_document_file={founder.documentEducationalQualificationFileUrl} uploaded_document_file_name={founder.documentEducationalQualificationFileName} founder_id={founder.id}/>
                                    <InputError message={errors["foundersList."+index+".documentEducationalQualificationFileName"]} className="mt-2" />
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
                                            <TextInput
                                                id="basic_salary"
                                                name="basic_salary"
                                                value={founder.basic_salary}
                                                className="block w-full py-4 mt-2 bg-transparent"
                                                autoComplete="basic_salary"
                                                placeholder='Basic Salary'
                                                isFocused={false}
                                                onChange={(e) => updateBasicSalary(founder.id, e.target.value)}
                                            />
                                            <InputError message={errors["foundersList."+index+".basic_salary"]} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Transportation Allowance</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                            <TextInput
                                                id="transportation_allowance"
                                                name="transportation_allowance"
                                                value={founder.transportation_allowance}
                                                className="block w-full py-4 mt-2 bg-transparent"
                                                autoComplete="transportation_allowance"
                                                placeholder='Transportation Allowance'
                                                isFocused={false}
                                                onChange={(e) => updateTransportationAllowance(founder.id, e.target.value)}
                                            />
                                            <InputError message={errors["foundersList."+index+".transportation_allowance"]} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Accommodation Allowance</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                            <TextInput
                                                id="accommodation_allowance"
                                                name="accommodation_allowance"
                                                value={founder.accommodation_allowance}
                                                className="block w-full py-4 mt-2 bg-transparent"
                                                autoComplete="accommodation_allowance"
                                                placeholder='Accommodation Allowance'
                                                isFocused={false}
                                                onChange={(e) => updateAccommodationAllowance(founder.id, e.target.value)}
                                            />
                                            <InputError message={errors["foundersList."+index+".accommodation_allowance"]} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='w-1/2'>
                                            <div className=''>Other Allowances</div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                            <TextInput
                                                id="other_allowances"
                                                name="other_allowances"
                                                value={founder.other_allowances}
                                                className="block w-full py-4 mt-2 bg-transparent"
                                                autoComplete="other_allowances"
                                                placeholder='Other Allowances'
                                                isFocused={false}
                                                onChange={(e) => updateOtherAllowancesName(founder.id, e.target.value)}
                                            />
                                            <InputError message={errors["foundersList."+index+".other_allowances"]} className="mt-2" />
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
