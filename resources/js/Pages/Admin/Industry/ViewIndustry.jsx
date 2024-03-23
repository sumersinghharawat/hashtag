import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";

export default function AddIndustry ({auth, industries}) {

    const AddAgent = () => {
        location.replace(route('admin.dashboard.addindustry'));
    }

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">View Industry</h2>
                                <SecondaryButton onClick={AddAgent}>Add Industry</SecondaryButton>
                            </div>
                            <div className="mb-10">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Industry Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Edit
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {industries.map((industry,index)=>{return <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {industry.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.dashboard.editindustry',{'id':industry.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">Edit</Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.dashboard.destroyindustry',{'id':industry.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">Remove</Link>
                                                </td>
                                            </tr>})}
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
