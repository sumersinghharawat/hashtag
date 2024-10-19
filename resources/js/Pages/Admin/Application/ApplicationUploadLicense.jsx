import Dashboard from '@/Pages/Dashboard';
import * as React from 'react';
import { ApplicationLayout } from './ApplicationLayout';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { DragAndDropBox } from '@/Components/DragAndDropBox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import addmore from '../../../Icons/add-more.svg';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ApplicationUploadLicense({ auth, company_info }){

    const { data, setData, post, put,processing, errors, reset } = useForm({
        admin_document: [],
    });

    const [trade_license_file, setTradeLicenseFile] = React.useState(null);
    const [trade_license_type, setTradeLicenseType] = React.useState(null);
    const [document_lists, setDocumentLists] = React.useState([]);
    const [document_type, setDocumentType] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setDocumentLists(company_info?.documents);

        if(company_info?.trade_license_documents){
            setTradeLicenseFile(company_info?.trade_license_documents?.document_file);
            setTradeLicenseType(company_info?.trade_license_documents?.document_file_name);
        }

        company_info?.documents.forEach(element => {
            console.log(element);
        });
    })

    const handleMoreDocument = (event) => {
        event.preventDefault();

        const newDocument = document_lists;
        newDocument.push({
            document_type: document_type,
            document_file: null,
            document_file_name: null
        });

        setDocumentLists(newDocument);
        setDocumentType('');

        setOpen(false);
    }


    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const submitApplication = (event) => {
        event.preventDefault();
        put(route('admin.dashboard.adminuploaddocumentstore', company_info.id), {
            onSuccess: () => {
            }
        });
    }

    return <Dashboard auth={auth.user}>
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
                                    <div className="flex flex-col w-full h-full py-6">
                                        <div className="flex flex-col w-full">
                                            <h2 className="text-2xl font-extrabold">Trade License</h2>
                                            <p className="mt-2 mb-4 text-sm text-gray-500">This is for admin or agent will upload trade license.</p>
                                        </div>
                                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                            <DragAndDropBox company_info={company_info} updatedocument={()=>{}} document_type="Trade License" auth={auth} uploaded_document_file={trade_license_file} uploaded_document_file_name={trade_license_type} founder_id={0} upload_status={company_info.application_status !== 'Completed'?true:false}/>
                                            <InputError message={errors.trade_license} className="mt-2" />
                                        </div>
                                    </div>
                                    {company_info.application_status !== 'Completed' && <button className="flex w-1/4 gap-2 px-10 py-4 mb-4 text-center text-black bg-transparent border border-gray-300 rounded-full" onClick={openModal}> <img src={addmore} style={{marginTop:4,height:16,width:16}} /> Add More Document</button>}
                                    {document_lists.map((document, index) => {
                                        return  <div className="flex flex-col w-full h-full py-6">
                                                    <div className="flex flex-col w-full">
                                                        <h2 className="text-2xl font-extrabold">{document.document_type}</h2>
                                                        <p className="mt-2 mb-4 text-sm text-gray-500">This is for admin or agent will upload other documents.</p>
                                                    </div>
                                                    <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                                                        <DragAndDropBox company_info={company_info} updatedocument={()=>{}} document_type={document.document_type} auth={auth} uploaded_document_file={document.document_file} uploaded_document_file_name={document.document_file_name} founder_id={0} upload_status={company_info.application_status !== 'Completed'?true:false}/>
                                                        <InputError message={errors.trade_license} className="mt-2" />
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            </ApplicationLayout>
                            <div className='flex justify-end'>
                                {company_info.application_status !== 'Completed' && <PrimaryButton className='w-1/3' disabled={processing} onClick={submitApplication}>Finish Application</PrimaryButton>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={open} onClose={closeModal}>
            <form onSubmit={handleMoreDocument} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Upload Other Document
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Please enter type of the document to be uploaded.
                </p>
                <div className="mt-6">
                    <InputLabel htmlFor="password" value="Title" className="sr-only" />

                    <TextInput
                        id="document_type"
                        name="document_type"
                        value={document_type}
                        onChange={(e) => setDocumentType(e.target.value)}
                        required
                        autoFocus
                        className="block w-full mt-1"
                        autoComplete="current-document_type"
                        placeholder="Document Type"
                    />

                    <InputError message={errors.company_status} className="mt-2" />
                </div>

                <div className="flex justify-end mt-6">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <button className={"ms-3 py-4 px-6 rounded-full text-white bg-secondary"} disabled={processing}>
                        Add New Document
                    </button>
                </div>
            </form>
        </Modal>
    </Dashboard>;
};
