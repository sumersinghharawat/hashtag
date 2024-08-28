import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";

export default function ViewForms ({auth, forms}) {

    return (
        <Dashboard auth={auth.user} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">View Forms</h2>
                            </div>
                            <div className="mb-10">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Form Name
                                                </th>
                                                <th scope="col" className="px-6 py-3" colSpan={4}>
                                                    Form Fields
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    View
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {forms.map((form,index)=>{return <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {form.title}
                                                </th>
                                                <td className="px-6 py-4" colSpan={4}>
                                                {form.form_fields.map((formField,index)=>{
                                                    return (<>
                                                    {formField.input} - {formField.value}<br/>
                                                    </>
                                                )
                                                })}</td>
                                                <td className="px-6 py-4">
                                                    <Link className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">View</Link>
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
