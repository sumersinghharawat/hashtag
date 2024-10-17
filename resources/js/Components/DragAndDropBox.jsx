import * as React from 'react';
import fileIcon from '../Icons/file-icon.svg';
import { router, useForm } from '@inertiajs/react';
import InputError from './InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import iconArrowDownload from '../Icons/download-icon.svg';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

export const DragAndDropBox = ({ company_info, document_type, uploaded_document_file, uploaded_document_file_name, founder_id,  updatedocument }) => {

    const [confirmingDocumentDeletion, setConfirmingDocumentDeletion] = React.useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = React.useState(uploaded_document_file);
    const [uploadedFileName, setUploadedFileName] = React.useState(uploaded_document_file_name);

    const { data, setData, post, errors, progress, processing, preserveScroll, delete:destroy } = useForm({
        document_type: document_type || '',
        company_id: company_info ? company_info.id : '',
        document_file: null,
        founder_id: founder_id?founder_id:0,
    });

    React.useEffect(()=>{
        setUploadedFileUrl(uploaded_document_file);
        setUploadedFileName(uploaded_document_file_name);

        data.document_type = document_type;
        data.founder_id = founder_id?founder_id:0;
        data.company_id = company_info.id;
    });

    const [progressTimer, setProgressTimer] = React.useState(progress);
    const [uploading, setUploading] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            // Assign the new file to the input element
            fileInputRef.current.files = dataTransfer.files;
            handleFileUpload(e);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleFileUpload(e);
        }
    };

    const handleFileClick = (e) => {
        if (!confirmingDocumentDeletion) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = async (e) => {
        const selectedFile = fileInputRef.current.files[0];
        if (selectedFile) {
            try {
                data.document_file = selectedFile;
                await uploadFile(e);

            } catch (error) {
                console.error(error);
            }
        }
    };

    const uploadFile = async (e) => {
        setUploading(true);

        try {
            await post(route('founder.dashboard.upload-document', company_info.id), {
                preserveScroll: e.target,
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgressTimer(percent);
                },
                onFinish: () => {
                    setData('founder_id',founder_id?founder_id:0);
                    setData('company_id', company_info.id);
                    setData('document_type', document_type);
                }
            });
        } catch (error) {
            console.error('Error during file upload:', error);
        } finally {
            console.log(data);
            setUploading(false);
            setProgressTimer(0); // Reset progress after upload
            updatedocument();
        }
    };

    const ResetInputFile = () => {
        setUploadedFileName(null);
    }

    // Delete


    const confirmDocumentDeletion = (e) => {
        setConfirmingDocumentDeletion(true);
    };

    const deleteDocument = (e) => {
        e.preventDefault();

        destroy(route('founder.dashboard.upload-documentdelete', {id:company_info.id, document_type:document_type, founder_id:founder_id?founder_id:0}), {
            preserveScroll: e.target,
            onSuccess: () => {
                console.log(data);
                updatedocument();
                closeModal();
            }
        })
    };

    const closeModal = () => {
        setConfirmingDocumentDeletion(false);
    };

    return (
        <>
        <div>
            <p className="text-black text-md">Upload File</p>
            <div
                className="flex items-center justify-center w-full h-auto bg-white border border-gray-600 border-dashed rounded cursor-pointer drop-box"
                onDragOver={(e)=>handleDragOver(e)}
                onDrop={(e)=>handleDrop(e)}
                onClick={(e)=>handleFileClick(e)}
            >
                <input
                    type="file"
                    onChange={(e)=>handleFileChange(e)}
                    style={{ display: 'none' }} // Hide the default file input
                    ref={fileInputRef}
                />
                { uploadedFileName ? (
                    <div className="flex items-center justify-between w-full gap-2 p-14">
                        <a href={uploadedFileUrl} className="flex items-center gap-2" target="_blank">
                            <img src={fileIcon} alt="File Icon" style={{ height: 40, width: 40 }} />
                            <span>{uploadedFileName}</span>
                        </a>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="w-3 h-3 p-1 text-white bg-red-600 border rounded-full cursor-pointer"
                            onClick={(e) => {e.stopPropagation();confirmDocumentDeletion();}} // Clear file on click
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <img src={fileIcon} alt="File Icon" style={{ height: 40, width: 40 }} />
                        <h3>Drag & Drop Here</h3>
                        <h3>Or</h3>
                        <span className="font-bold text-primary">Browse</span>
                    </div>
                )}
                {uploading && (
                    <div style={{ marginTop: '10px', width: '100%' }}>
                        <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
                            <div
                                style={{
                                    width: `${progressTimer}%`,
                                    height: '20px',
                                    backgroundColor: '#4caf50',
                                    borderRadius: '5px',
                                    transition: 'width 0.5s',
                                }}
                            />
                        </div>
                        <p>{progressTimer}%</p>
                    </div>
                )}
            </div>
            <InputError message={errors.document_file} className="mt-2" />
        </div>
        <Modal show={confirmingDocumentDeletion} onClose={closeModal}>
                <form onSubmit={deleteDocument} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to document?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once you deleted, Document delete permanently from us.
                    </p>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="rounded-full ms-3" disabled={processing}>
                            Delete Document
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
};
