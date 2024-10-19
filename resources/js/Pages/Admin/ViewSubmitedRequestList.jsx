import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "../Dashboard";

export default function ViewSubmitedRequestList ({auth, companyrequests}) {

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="mb-10">
                                <h2 className="text-4xl">Customer Applications</h2>
                            </div>
                            <div className="mb-10">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Company Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Founders
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Application Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    View / Assign
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Assigned Agent
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Download License
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {companyrequests.length!=0?(companyrequests.map((element,index)=>{return <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {element.company_name_1!=null?element.company_name_1:'pending'}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {element.founders?element.founders.length:'Pending'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={"font-semibold "+
                                                        ((element.application_status=='Rejected')?'text-red-400':'')+
                                                        ((element.application_status=='Uncompleted')?'text-blue-400':'')+
                                                        ((element.application_status=='In Progress')?'text-purple-400':'')+
                                                        ((element.application_status=='Under Process')?'text-yellow-400':'')+
                                                        ((element.application_status=='Completed')?'text-green-400':'')
                                                        }>{element.application_status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                {element.assign_agent_details?
                                                    <Link href={route('admin.dashboard.viewrequestinformation',{'id':element.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">View</Link>:
                                                    <>
                                                    {element.application_status === 'Under Process' || element.application_status=='Completed'?
                                                        <Link href={route('admin.dashboard.assignapplication',{'id':element.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">Assign to me</Link>
                                                    :
                                                    <span className={"font-semibold "+
                                                        ((element.application_status=='Rejected')?'text-red-400':'')+
                                                        ((element.application_status=='Uncompleted')?'text-blue-400':'')+
                                                        ((element.application_status=='In Progress')?'text-purple-400':'')
                                                        }>Not Ready yet</span>}
                                                    </>
                                                }
                                                </td>
                                                <td className="px-6 py-4">
                                                    {element.assign_agent_details?<p className="text-green-500">Assigned to {element.assign_agent_details.name}</p>:<p className="text-yellow-500">Pending</p>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={"font-semibold "+(element.application_status=='Completed'?'text-green-400':'text-red-400')}>{element.application_status=='Completed'?'Available':'Not Available'}</span>
                                                </td>
                                            </tr>})):<tr className="border-b"><td colSpan={5} align="center">No Record</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Dashboard>
    );
};
