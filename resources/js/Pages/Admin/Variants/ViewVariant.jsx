import { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";

export default function ViewVariant ({auth, variantsofproduct, packageofproduct}) {

    const AddVariant = () => {
        router.get(route('admin.dashboard.addvariantofproduct', packageofproduct.id));
    }

    const ViewPackage = () => {
        router.get(route('admin.dashboard.packagesofproduct'));
    }

    const formatCurrency = (value) => {
        return 'AED ' + value.toLocaleString('en-US');
    }

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">View Variant</h2>
                                <div className="flex gap-2">
                                    <SecondaryButton onClick={ViewPackage}>View Packages</SecondaryButton>
                                    <SecondaryButton onClick={AddVariant}>Add Variant</SecondaryButton>
                                </div>
                            </div>
                            <div className="mb-10">
                                <p className="p-2 text-yellow-500 bg-yellow-100 rounded">This variant for {packageofproduct.title}</p>
                            </div>
                            <div className="mb-10">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Variant
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
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
                                        {variantsofproduct.map((variantofproduct,index)=>{return <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <b>{variantofproduct.title}</b>
                                                    <div>{variantofproduct.visa_count?<b>Visa Count: {variantofproduct.visa_count}</b>:<></>}</div>
                                                    {variantofproduct.price?<p className="text-wrap">{formatCurrency(parseInt(variantofproduct.price))}</p>:<></>}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={variantofproduct.status} value="" className="sr-only peer" onChange={()=>router.patch(route('admin.dashboard.updatestatuspackagesofproduct',{'id':variantofproduct.id}))}/>
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                                                        <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300"></span>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.dashboard.editvariantofproduct',{'package_id':packageofproduct.id,'id':variantofproduct.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">Edit</Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('admin.dashboard.destroyvariantofproduct',{'package_id':packageofproduct.id,'id':variantofproduct.id})} className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-gray-300 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">Remove</Link>
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
