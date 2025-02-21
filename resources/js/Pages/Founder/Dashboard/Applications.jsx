import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useEffect, useState } from "react";
import { AddMoreIconCard } from "@/Components/AddMoreIconCard";
import { ApplicationCard } from "@/Components/ApplicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChevronRight, faClose, faMinus, faMinusSquare, faTrash, faUserGroup, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { Link, router, useForm } from "@inertiajs/react";
import { redirect } from "react-router-dom";
export default function Applications({ auth, request, companies, company_count }) {
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        id: ''
        // type_of_freezone: company_info.type_of_freezone?company_info.type_of_freezone:'',
    });

    const [statusClass, setStatusClass] = useState("");
    const [deleteRegistrationModel, setDeleteRegistrationModel] = useState(false);
    const [deleteRegistrationId, setDeleteRegistrationId] = useState(null);
    useEffect(() => {
        console.log(companies);
        // handleStatusClass(company.application_status);
    });

    const handleStatusClass = (status) => {
        switch (status) {
            case "Rejected":
                return "text-red-700 bg-red-100 p-1 px-4 rounded-full";
                break;
            case "Uncompleted":
                return "text-blue-500 bg-blue-100 p-1 px-4 rounded-full";
                break;
            case "In Progress":
                return "text-yellow-500 bg-yellow-100 p-1 px-4 rounded-full";
                break;
            case "Under Process":
                return "text-gray-500 bg-gray-100 p-1 px-4 rounded-full";
                break;
            case "Completed":
                return "text-green-500 bg-green-100 p-1 px-4 rounded-full";
                break;
            default:
                break;
        }
    }

    const handleNewApplication = () => {
        router.get(route('founder.dashboard.companyname'));
    }

    const deleteRegistrations = (id=null) => {
        setDeleteRegistrationId(id);
        setDeleteRegistrationModel(!deleteRegistrationModel);
    }

    const handleDeleteRegistration = () => {
        destroy(route('founder.dashboard.companydelete',{'id':deleteRegistrationId}));

        deleteRegistrations();
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <div className="flex w-full gap-4 px-8 align-bottom">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">My Applications</h2>
            </div>
            <div className="relative grid justify-between w-full h-full grid-flow-row grid-cols-2 gap-6 p-8">
                <AddMoreIconCard title={"Form New Company"} clickEvent={() => handleNewApplication()} />
                {companies.map((company, index) => {
                    return <ApplicationCard key={index}>
                        <Link href={route(company.route, { 'id': company.id })}>
                            <div className="grid w-full grid-cols-2">
                                <div className="w-full">
                                    <span className="text-lg font-semibold">{company.company_name_1 ? company.company_name_1 : "Name is Pending"}</span>
                                </div>
                                <div className="flex justify-end w-full">
                                    <span className={handleStatusClass(company.application_status)}>{company.application_status}</span>
                                </div>
                            </div>
                            <div className="grid items-end justify-between w-full grid-cols-2">
                                <ul className="decoration-none">
                                    <li style={{ marginBottom: 8 }}><FontAwesomeIcon icon={faAddressCard} style={{ marginRight: 4 }} /> Stakeholders: {company.stakeholders}</li>
                                    <li style={{ marginBottom: 8 }}><FontAwesomeIcon icon={faUserGroup} style={{ marginRight: 4 }} /> Founders: {company.founders}</li>
                                    <li style={{ marginBottom: 8 }}><FontAwesomeIcon icon={faUserGroup} style={{ marginRight: 4 }} /> Visas: {company.visas}</li>
                                </ul>
                                <div className="grid w-full text-end">
                                    {company.document_count?<span><b>Documents Uploaded:</b> {parseInt(company.uploaded_document_count)}/{company.document_count}</span>:<></>}
                                    {parseInt(company.rejected_document_count)?<span><b>Rejected Documents & Details:</b> {parseInt(company.rejected_document_count)}</span>:<></>}
                                </div>
                            </div>
                            <div className="absolute flex items-center gap-2 p-1 px-4 font-semibold -translate-x-1/2 bg-white border border-gray-300 border-solid rounded-full text-primary -bottom-4 left-1/2 btn-status">
                                {company.next_step} <FontAwesomeIcon icon={faChevronRight} style={{ height: 12, width: 12 }} />
                            </div>
                        </Link>
                        {/* <FontAwesomeIcon icon={faTrash} style={{ height: 12, width: 12 }} className="absolute text-red-600 right-2 top-2" onClick={() => deleteRegistrations(company.id)} /> */}
                    </ApplicationCard>
                }
                )}
            </div>
            {deleteRegistrationModel ? <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40 bg-blend-multiply">
                <div className="relative flex flex-col flex-wrap justify-between w-auto cursor-pointer md:justify-start md:flex-row md:bg-white md:p-10 rounded-3xl">
                    <div className="justify-center w-full align-middle">
                        <div className="flex justify-center gap-2 m-8 align-middle">
                            <h4>Do you want to delete your registration?</h4>
                        </div>
                    </div>
                    <div className="flex justify-center w-full align-middle">
                        <div className="flex justify-center gap-2 m-8 align-middle">
                            <button className=" primary-button" onClick={()=>handleDeleteRegistration()}>Delete</button>
                        </div>
                        <div className="flex justify-center gap-2 m-8 align-middle">
                            <button className="text-white bg-red-600 custom-button">Cancel</button>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faClose} style={{ height: 16, width: 16 }} className="absolute top-4 right-4 " onClick={()=>deleteRegistrations()}/>
                </div>
            </div> : <></>}
        </CustomerDashboard>
    );
};
