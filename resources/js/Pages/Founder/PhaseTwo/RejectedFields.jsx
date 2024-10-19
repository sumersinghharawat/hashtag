import { DragAndDropBox } from '@/Components/DragAndDropBox';
import InputError from '@/Components/InputError';
import * as React from 'react';
import iconArrowDownload from '../../../Icons/download-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import samplePdf from '../../../pdf/file-sample_150kB.pdf';
import TextareaInput from '@/Components/TextareaInput';

export const RejectedFields = ({ rejectedFields, auth, company_info, listindusties, foundersList }) => {


    const [activeFounderEdit, setActiveFounderEdit] = React.useState(1);
    const [founderSplitList, setFounderSplitList] = React.useState(foundersList);

    const {data, setData, post, put, processing, errors} = useForm({
        company_name_1: company_info.company_name_1,
        company_name_2: company_info.company_name_2,
        company_name_3: company_info.company_name_3,
        company_industry: company_info.industry?company_info.industry:'',
        company_description: company_info.description?company_info.description:'',
        rejected_fields: rejectedFields?rejectedFields:'',
        foundersList: founderSplitList,
    });

    React.useEffect(()=>{
        // updateStateInFounderList(founderSplitList);

    },[founderSplitList])

    const handleActiveFounderEdit = (selectedFounder) => {
        if(selectedFounder === activeFounderEdit){
            setActiveFounderEdit(0);
        }else{
            setActiveFounderEdit(selectedFounder);
        }
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

    const CheckIndustryName = (e) => {
        const options = Array.from(listindusties).map((option) =>
            option.name.toLowerCase()
        );

        if (!options.includes(e.target.value.toLowerCase())) {
            errors.company_industry = 'Please choose a browser from the list.';
            setData('company_industry', e.target.value);
        } else {
            errors.company_industry = '';
            setData('company_industry', e.target.value);
        }
    }

    const updateManager = (value, id) => {

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

        updateFoundersDetails(updatedFoundersList);
    }

    const UpdateVisaStatus = async (id,value) => {
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, visa_status: parseInt(value) };
                return obj;
            }
            return obj;
        });
        updateFoundersDetails(updatedFoundersList);
    }

    // Update state in founder list

    const updateStateInFounderList = async (founderSplitListNew) => {

        const updatedFoundersList = founderSplitListNew.map((element, index) => {
            const splitData = founderSplitList[index];
            element.manager = splitData.manager?splitData.manager:element.manager;
            element.visa_status = parseInt(splitData.visa_status)?parseInt(splitData.visa_status):element.visa_status;

            return element; // If no splitData, return the original element
        });
        setData('foundersList', founderSplitListNew);
        setFounderSplitList(founderSplitListNew);
    };


    const updateFoundersDetails = async (founderSplitListNew) => {
        setData('foundersList', founderSplitListNew);
        setFounderSplitList(founderSplitListNew);
    };

    const handleSaveAndContinue = () => {

        setData('foundersList', founderSplitList);

        post(route('founder.dashboard.updaterejecteddetails',{'id':company_info.id}),{
            onSuccess: () => {
                // reset();
            },
            onError: (errors) => {

            }
        });
    }

    return (
        <div>
            {rejectedFields.company_rejected_fields.map((field) => (
                <div key={field.id} className="w-full">
                    {/* Company Name 1 */}
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
                    {/* Company Name 2 */}
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
                    {/* Company Name 3 */}
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
                    {/* Business Plan */}
                    {field.application_form_field_name === 'Business Plan' ?
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
                                <DragAndDropBox company_info={company_info} document_type="Business Plan" updatedocument={() => { updateStateInFounderList(foundersList)} } auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    }
                    {/* Other Document */}
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
                                <DragAndDropBox company_info={company_info} document_type="Other Document" updatedocument={() => { updateStateInFounderList(foundersList)} } auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} />
                                <InputError message={''} className="mt-2" />
                            </div>
                        </div> : <></>
                    }
                    {/* Industry */}
                    {field.application_form_field_name === 'industry' ?
                    <div>
                        <InputLabel htmlFor="industry" className="text-base" value="Company Industry" />
                        <div className="flex flex-row items-center w-full gap-2">
                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                        </div>
                        <select className="block w-full p-4 mt-1 bg-transparent border-gray-300 rounded"
                        value={data.company_industry}
                        autoComplete="off"
                        placeholder='Company Industry'
                        id="company_description"
                        name="company_description"
                        onChange={(e) => CheckIndustryName(e)}
                        >
                            {listindusties ? (
                                listindusties.map((element,index) => {
                                    return element.name ? (
                                        <option key={element.name} value={index==0?"":element.name}>
                                            {element.name}
                                        </option>
                                    ) : (
                                        <></>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </select>


                        <InputError message={''} className="mt-2" />
                    </div>: <></>
                    }
                    {field.application_form_field_name === 'description' ?
                    <div className="my-4">
                        <InputLabel htmlFor="company_description" className="text-base" value="Company description" />
                        <div className="flex flex-row items-center w-full gap-2">
                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                        </div>

                        <TextareaInput
                            id="company_description"
                            name="company_description"
                            value={data.company_description}
                            className="block w-full py-4 mt-1 bg-transparent"
                            autoComplete="company_description"
                            placeholder='Company Description'
                            onChange={(e) => setData('company_description', e.target.value)}
                        />

                        <InputError message={errors.company_description} className="mt-2" />
                    </div>
                        : <></>
                    }
                </div>
            ))}

            {rejectedFields.founder_rejected_fields.map((founder, founderindex) => (
                <div key={founderindex} className="w-full">
                    {/* Founders */}
                    <div className="flex flex-col w-full border-t border-gray-300 founders founder-item" key={founderindex}>
                        <div className="flex items-center justify-between w-full py-3 founder-acc-title" onClick={()=>{handleActiveFounderEdit(founderindex+1)}}>
                            <div className='flex gap-2'>
                                <h3 className='text-lg font-bold text-green-500'>{(founderSplitList?founderSplitList[founderindex].first_name:foundersList.first_name)+" "+(founderSplitList?founderSplitList[founderindex].last_name:foundersList.last_name)} </h3>
                                <span className='text-lg text-green-500'>(Shareholder {founderindex+1})</span>
                            </div> <FontAwesomeIcon icon={faChevronDown} className={activeFounderEdit!=(founderindex+1)?'rotate-90':''} style={{height: 24, width: 24}}/>
                        </div>
                        {activeFounderEdit===(founderindex+1)?
                        (founder.rejected_fields.map((field, index) => {

                            return <>
                                {(field.application_form_field_name == 'manager') ?
                                <div className="flex flex-col w-full h-full py-6" key={index}>
                                    <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                        <div className="flex flex-row items-center w-full gap-2">
                                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                        </div>
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
                                                    checked={checkFounderRole("Director", founderSplitList[founderindex].id)}
                                                    onChange={(e) => updateManager(e.target.value, founderSplitList[founderindex].id)}
                                                    type="checkbox"
                                                    value="Director"
                                                    className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                                />
                                            </div>
                                            <div className="w-full text-center">
                                                <input
                                                    id="founder_role_secretary"
                                                    name="founder_role"
                                                    checked={checkFounderRole("Secretary", founderSplitList[founderindex].id)}
                                                    onChange={(e) => updateManager(e.target.value, founderSplitList[founderindex].id)}
                                                    type="checkbox"
                                                    value="Secretary"
                                                    className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                                />
                                            </div>
                                            <div className="w-full text-center">
                                                <input
                                                    id="founder_role_manager"
                                                    name="founder_role"
                                                    checked={checkFounderRole("Manager", founderSplitList[founderindex].id)}
                                                    onChange={(e) => updateManager(e.target.value, founderSplitList[founderindex].id)}
                                                    type="checkbox"
                                                    value="Manager"
                                                    className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :<></>}
                                {(field.application_form_field_name == 'Valid Passport Copy') ?
                                <div className="flex flex-col w-full h-full py-6" key={index}>
                                    <div className="flex flex-col w-full">
                                        <h2 className="text-2xl font-extrabold">Valid Passport Copy</h2>
                                        <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear, scanned copy of your valid passport.</p>
                                    </div>
                                    <div className="flex flex-row items-center w-full gap-2">
                                        <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                        <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                    </div>
                                    <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                        <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList(foundersList)} document_type="Valid Passport Copy" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={founderSplitList[founderindex].id}/>
                                        <InputError message={errors[""]} className="mt-2" />
                                    </div>
                                </div>
                                :<></>}
                                {(field.application_form_field_name == 'UAE Visa Page') ?
                                <div className="flex flex-col w-full h-full py-6" key={index}>
                                    <div className="flex flex-col w-full">
                                        <div className="flex gap-2 items-bottom">
                                            <h2 className="text-2xl font-extrabold">UAE Visa Page</h2>
                                            <p className="m-0 mt-2 text-black text-md">(If Applicable)</p>
                                        </div>
                                        <p className="mt-2 mb-4 text-sm text-gray-500">Upload a clear copy of your UAE visa page if you hold a UAE residence visa.</p>
                                        <div className="flex flex-row items-center w-full gap-2">
                                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                        <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList(foundersList)} document_type="UAE Visa Page" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={founderSplitList[founderindex].id}/>
                                        <InputError message={errors[""]} className="mt-2" />
                                    </div>
                                </div>
                                :<></>}
                                {(field.application_form_field_name == 'Address Proof Copy') ?
                                <div className="flex flex-col w-full h-full py-6" key={index}>
                                    <div className="flex flex-col w-full">
                                        <h2 className="text-2xl font-extrabold">Address Proof Copy</h2>
                                        <p className="mt-2 mb-4 text-sm text-gray-500">Upload a document confirming your full residential address, dated within the last 3 months. Accepted documents include a utility bills, bank statement, or government ID. PO Box addresses are not accepted.</p>
                                    </div>
                                    <div className="flex flex-row items-center w-full gap-2">
                                        <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                        <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                    </div>
                                    <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                        <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList(foundersList)} document_type="Address Proof Copy" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={founderSplitList[founderindex].id}/>
                                        <InputError message={errors[""]} className="mt-2" />
                                    </div>
                                </div>
                                :<></>}
                                {(field.application_form_field_name == 'visa_status') ?
                                <div className="my-4" key={index}>
                                    <div className="flex flex-row items-center w-full gap-2">
                                        <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                        <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                    </div>
                                    <InputLabel htmlFor="visa_status" className="text-base " value="Do you require visa for this stakeholder?" />
                                    <div className="flex mt-4 mb-4">
                                        <div className="col-auto">
                                            <input
                                                type="radio"
                                                name="visa_status"
                                                value="1"
                                                id="yes"
                                                checked={parseInt(founderSplitList[founderindex].visa_status) === 1}
                                                className="radio-btn"
                                                onChange={(e) => UpdateVisaStatus(founderSplitList[founderindex].id,e.target.value)}
                                            />
                                            <label className="radio-btn-input" htmlFor="yes">Yes</label>
                                        </div>

                                        <div className="col-auto">
                                            <input
                                                type="radio"
                                                name="visa_status"
                                                value="-1"
                                                id="no"
                                                checked={parseInt(founderSplitList[founderindex].visa_status) === -1}
                                                className="radio-btn"
                                                onChange={(e) => UpdateVisaStatus(founderSplitList[founderindex].id,e.target.value)}
                                            />
                                            <label className="radio-btn-input" htmlFor="no">No</label>
                                        </div>

                                        <div className="col-auto">
                                            <input
                                                type="radio"
                                                name="visa_status"
                                                value="0"
                                                id="later"
                                                checked={parseInt(founderSplitList[founderindex].visa_status) === 0 || founderSplitList[founderindex].visa_status == null}
                                                className="radio-btn"
                                                onChange={(e) => UpdateVisaStatus(founderSplitList[founderindex].id,e.target.value)}
                                            />
                                            <label className="radio-btn-input" htmlFor="later">Later</label>
                                        </div>
                                    </div>
                                </div>
                                :<></>}

                                {founderSplitList[founderindex].visa_status===1?<>

                                    {(field.application_form_field_name == 'Educational Qualification') ?
                                    <div className="flex flex-col w-full h-full py-6" key={index}>
                                        <div className="flex flex-col w-full">
                                            <h2 className="text-2xl font-extrabold">Educational Qualification</h2>
                                            <p className="mt-2 mb-4 text-sm text-gray-500">Upload proof of your educational qualifications.</p>
                                        </div>
                                        <div className="flex flex-row items-center w-full gap-2">
                                            <FontAwesomeIcon icon={faInfo} className="w-3 h-3 p-2 text-sm text-white bg-yellow-500 rounded-full" />
                                            <p className="mt-4 mb-4 text-sm text-yellow-500">{field.description}</p>
                                        </div>
                                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                            <DragAndDropBox company_info={company_info} updatedocument={()=>updateStateInFounderList(foundersList)} document_type="Educational Qualification" auth={auth} uploaded_document_file={field.document.document_file} uploaded_document_file_name={field.document.document_file.split('/').pop()} founder_id={founderSplitList[founderindex].id}/>
                                            <InputError message={errors[""]} className="mt-2" />
                                        </div>
                                    </div>
                                    :<></>}
                                </>:<></>}
                            </>
                        })):<></>}
                    </div>
                </div>))
            }


            <div className="flex items-center justify-start mt-10">
                <PrimaryButton className="justify-center w-full text-center" onClick={handleSaveAndContinue}>
                    Submit
                </PrimaryButton>
            </div>
        </div>
    );
};

