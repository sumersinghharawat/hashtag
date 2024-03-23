import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "../Dashboard";

export default function ViewSubmitedRequestList ({auth, companyrequests}) {

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                                    View
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3">
                                                    Edit
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {companyrequests.length!=0?(companyrequests.map((element,index)=>{return <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {element.name!=null?element.name:'pending'}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {element.founders?element.founders.length:'Pending'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-500">{element.status==1?'Under Review':''}</span>
                                                    <span className="text-yellow-500">{element.status==2?'In Progress':''}</span>
                                                    <span className="text-green-500">{element.status==3?'Completed':''}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.dashboard.viewrequest',{'id':element.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">View</Link>
                                                </td>
                                            </tr>})):<tr><td colSpan={4} align="center">No Record</td></tr>}
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
