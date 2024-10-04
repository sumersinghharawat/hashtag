import * as React from 'react';
import fileIcon from '../Icons/file-icon.svg';
import { useForm } from '@inertiajs/react';
import InputError from './InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const DragAndDropBox = ({ company_info, document_type, auth }) => {
    const { data, setData, post, errors, progress } = useForm({
        document_type: document_type || '',
        company_id: company_info ? company_info.id : '',
        document_file: null,
        founder_id: 0,
    });

    const [file, setFile] = React.useState(null);
    const [progressTimer, setProgressTimer] = React.useState(progress);
    const [uploading, setUploading] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setData('document_file', selectedFile);
            await handleUpload(selectedFile);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setData('document_file', selectedFile);
            await handleUpload(selectedFile);
        }
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async (fileToUpload) => {
        // if (!file) return;
        console.log(fileToUpload);
        await setData('document_file', fileToUpload);
        // const formData = new FormData();
        // formData.append('document_file', file); // Ensure this matches your backend

        setUploading(true);

        try {
            const response = await post(route('founder.dashboard.upload-document', company_info.id), {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                },
            });

            console.log(response);

            // if (response) {
            //     console.error('Upload failed:', response);
            // } else {
            //     console.log('File uploaded successfully');
            //     setFile(null); // Reset file after upload
            // }
        } catch (error) {
            console.error('Error during file upload:', error);
        } finally {
            setUploading(false);
            setProgress(0); // Reset progress after upload
        }
    };

    return (
        <div>
            <p className="text-black text-md">Upload File</p>
            <div
                className="flex items-center justify-center w-full h-auto bg-white border border-gray-600 border-dashed rounded cursor-pointer drop-box"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileClick}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the default file input
                    ref={fileInputRef}
                />
                {file ? (
                    <div className='flex items-center justify-start gap-2 p-14'>
                        <img src={fileIcon} alt="File Icon" style={{ height: 40, width: 40 }} />
                        <span>{file.name}</span>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className='w-3 h-3 p-1 text-white bg-red-600 border rounded-full'
                            onClick={() => setFile(null)} // Clear file on click
                        />
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center p-8 text-center'>
                        <img src={fileIcon} alt="File Icon" style={{ height: 40, width: 40 }} />
                        <h3>Drag & Drop Here</h3>
                        <h3>Or</h3>
                        <span className='font-bold text-primary'>Browse</span>
                    </div>
                )}
                {uploading && (
                    <div style={{ marginTop: '10px', width: '100%' }}>
                        <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
                            <div
                                style={{
                                    width: `${progress}%`,
                                    height: '20px',
                                    backgroundColor: '#4caf50',
                                    borderRadius: '5px',
                                    transition: 'width 0.5s',
                                }}
                            />
                        </div>
                        <p>{progress}%</p>
                    </div>
                )}
            </div>
            <InputError message={errors.document_file} className="mt-2" />
        </div>
    );
};
