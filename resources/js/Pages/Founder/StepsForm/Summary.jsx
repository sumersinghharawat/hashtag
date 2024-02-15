import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Summary({ auth, step, company_info, foundersList }) {
    const { data, setData, post, processing, errors, reset } = useForm({
    });


    const submit = (e) => {
        e.preventDefault();

        location.replace(route('founder.dashboard.paynow'));
    }

    const goBack = () => {
        location.replace(route('founder.dashboard.foundersvisa'));
    }

    return (
        <CustomerDashboard auth={auth}>
            <StepFormLayout step={step}>
                <h2 className="text-4xl">Summary</h2>
                <p className="pt-2 mb-12">Please review all information related to your company</p>
                <div className="p-4 my-3 bg-gray-100 border rounded-2xl">
                    <div className="flex h-full mb-4">
                        <div className="w-3/6">
                            <p className="mt-2 font-bold">Company Name</p>
                            <p className="mt-2">{company_info.name}</p>
                        </div>
                        <div className="flex justify-end w-3/6 h-full">
                            <Link className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25" href="/founder/companyname">Edit</Link>
                        </div>
                    </div>
                    <div className="flex h-full mb-4">
                        <div className="w-3/6">
                            <p className="mt-2 font-bold">Company industry</p>
                            <p className="mt-2">{company_info.industry}</p>
                        </div>
                        <div className="flex justify-end w-3/6 h-full">
                            <Link className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25" href="/founder/companydetails">Edit</Link>
                        </div>
                    </div>
                    <div className="flex h-full mb-4">
                        <div className="w-3/6">
                            <p className="mt-2 font-bold">Company description</p>
                            <p className="mt-2">{company_info.description}</p>
                        </div>
                        <div className="flex justify-end w-3/6 h-full">
                            <Link className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25" href="/founder/companydetails">Edit</Link>
                        </div>
                    </div>
                    <div className="flex flex-wrap h-full mb-4">
                        <div className="w-3/6">
                            <p className="mt-2 font-bold">Founders</p>
                        </div>
                        <div className="flex justify-end w-3/6 h-full">
                            <Link className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25" href="/founder/foundersvisa">Edit</Link>
                        </div>
                        <div className="w-full mt-2 founder-list">
                            <div className="p-4 rounded-lg">
                                <table className="w-full bg-white table-auto rounded-2xl">
                                    <thead>
                                        <tr className="p-5 rounded-2xl">
                                            <th align="start" className="p-2">Name</th>
                                            <th>Split</th>
                                            <th>Manager</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foundersList.map((element, index) => {
                                            return <tr key={index} className="p-5 border-t rounded-2xl">
                                                <td className="p-2">{element.first_name + " " + element.last_name}</td>
                                                <td align="center" className="p-2">
                                                    {element.ownership_percentage}<span className="p-3">%</span>
                                                </td>
                                                <td align="center">
                                                    <div className="relative flex justify-center gap-x-3">
                                                        <div className="flex items-center h-6">
                                                            <input
                                                                id="manager"
                                                                name="manager"
                                                                disabled={true}
                                                                onChange={(e) => updateManager(element.id)}
                                                                checked={element.visa_status}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}


                                    </tbody>
                                </table></div>
                        </div>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <SecondaryButton className="justify-center text-center" disabled={processing} onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton className="justify-center w-full text-center" disabled={processing}>
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
