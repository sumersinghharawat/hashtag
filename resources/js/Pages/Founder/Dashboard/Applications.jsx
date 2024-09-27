import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useEffect, useState } from "react";
import { AddMoreIconCard } from "@/Components/AddMoreIconCard";
import { ApplicationCard } from "@/Components/ApplicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChevronRight, faUserGroup, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
export default function Applications({ auth, request, companies }) {

    const [statusClass, setStatusClass] = useState("");
    useEffect(()=>{
        console.log(companies);
        // handleStatusClass(company.application_status);
    },[]);

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

    return (
        <CustomerDashboard auth={auth}>
            <div className="flex w-full gap-4 px-8 align-bottom">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">My Applications</h2>
            </div>
            <div className="relative grid justify-between w-full h-full grid-flow-row grid-cols-2 gap-6 p-8">
                <AddMoreIconCard title={"Form New Company"} />
                {companies.map((company,index)=>{
                    return <ApplicationCard>
                        <div className="grid w-full grid-cols-2">
                            <div className="w-full">
                                <span className="text-lg font-semibold">{company.company_name_1?company.company_name_1:"Name is Pending"}</span>
                            </div>
                            <div className="flex justify-end w-full">
                                <span className={handleStatusClass(company.application_status)}>{company.application_status}</span>
                            </div>
                        </div>
                        <div className="grid w-full grid-cols-2">
                            <ul className="decoration-none">
                                <li style={{marginBottom:8}}><FontAwesomeIcon icon={faAddressCard} style={{marginRight:4}} /> Stakeholders:</li>
                                <li style={{marginBottom:8}}><FontAwesomeIcon icon={faUserGroup} style={{marginRight:4}} /> Founders:</li>
                                <li style={{marginBottom:8}}><FontAwesomeIcon icon={faUserGroup} style={{marginRight:4}} /> Visas:</li>
                            </ul>
                        </div>
                        <div className="absolute flex items-center gap-2 p-1 px-4 font-semibold text-green-600 -translate-x-1/2 bg-white border border-gray-300 border-solid rounded-full -bottom-4 left-1/2 btn-status">
                            Continue <FontAwesomeIcon icon={faChevronRight} style={{height:12, width:12}}/>
                        </div>

                    </ApplicationCard>}
                )}
            </div>
        </CustomerDashboard>
    );
};
