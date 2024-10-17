import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Summary({ auth, step, company_info, foundersList , registration_completed_step, company_count}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_id: company_info?.id
    });

    const submit = (e) => {
        e.preventDefault();
        router.get(route('founder.dashboard.paynow',company_info.id));
    };

    const goBack = () => {
        router.get(route('founder.dashboard.foundersvisa',company_info.id));
    };

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <StepFormLayout step={step} filledSteps={registration_completed_step} company_id={company_info.id}>
                <h2 className="text-2xl font-extrabold">Summary</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Please review all information about your company</p>
                <div className="">
                    <div className="flex flex-col w-full h-full py-6 border-t">
                        <div className="flex items-center justify-between w-full">
                            <p className="font-bold">Company Name</p>
                            <Link className="px-10 py-4 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button" href={"/founder/companyname/"+company_info?.id}>
                                Edit
                            </Link>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <p className="mt-4 col-12 col-md-12 md:ml-8">1. {company_info.company_name_1}</p>
                            <p className="mt-4 col-12 col-md-12 md:ml-8">2. {company_info.company_name_2}</p>
                            <p className="mt-4 col-12 col-md-12 md:ml-8">3. {company_info.company_name_3}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6 border-t">
                        <div className="flex items-center justify-between w-full">
                            <p className="font-bold">Company Details</p>
                            <Link
                                className="px-10 py-4 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button"
                                href={"/founder/companydetails/"+company_info?.id}
                            >
                                Edit
                            </Link>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full">
                            <div className="flex flex-col mt-4 md:ml-8">
                                <div className="flex flex-wrap py-2">
                                    <div className="w-4/12 font-semibold">Industry</div><div className="w-1/12">:</div><div className="w-7/12"> {company_info.industry}</div>
                                </div>
                                <div className="flex flex-wrap py-2">
                                    <div className="w-4/12 font-semibold">Description</div><div className="w-1/12">:</div><div className="w-7/12">{company_info.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6 border-t">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-full md:w-3/6">
                                <p className="mt-2 font-bold">Ownership & Visa</p>
                            </div>
                            <div className="flex justify-end w-3/6 h-full">
                                <Link
                                    className="px-10 py-4 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button"
                                    href={"/founder/foundersdetail/"+company_info?.id}
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="w-full mt-2 founder-list">
                            <div className="pb-4 mt-4 rounded-lg md:ml-8">
                                <table className="w-full bg-transparent table-auto rounded-2xl">
                                    <thead>
                                        <tr className="p-5 rounded-2xl">
                                            <th align="start" className="p-2">
                                                Name
                                            </th>
                                            <th>Split</th>
                                            <th>Manager</th>
                                            <th>Visa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foundersList.map((element, index) => {
                                            return (
                                                <tr key={index} className="px-4 border-t border-b rounded-2xl">
                                                    <td className="p-2">
                                                        {element.first_name + " " + element.last_name}
                                                    </td>
                                                    <td align="center" className="p-2">
                                                        {element.ownership_percentage}
                                                        <span className="p-3">%</span>
                                                    </td>
                                                    <td align="center">
                                                        <div className="relative flex justify-center gap-x-3">
                                                            <div className="flex items-center h-6">
                                                                <input
                                                                    id="manager"
                                                                    name="manager"
                                                                    disabled={true}
                                                                    checked={element.manager=="Manager"?true:false}
                                                                    type="checkbox"
                                                                    className="w-5 h-5 text-gray-400 border-gray-300 rounded focus:ring-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td align="center">
                                                        <div className="relative flex justify-center gap-x-3">
                                                            <div className="flex items-center h-6">
                                                                <input
                                                                    id="manager"
                                                                    name="manager"
                                                                    disabled={true}
                                                                    checked={parseInt(element.visa_status)}
                                                                    type="checkbox"
                                                                    className="w-5 h-5 text-gray-400 border-gray-300 rounded focus:ring-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={submit} className="pt-10 border-t">
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <SecondaryButton
                            className="justify-center text-center"
                            disabled={processing}
                            onClick={goBack}
                        >
                            Back
                        </SecondaryButton>
                        <PrimaryButton
                            className="justify-center w-full text-center"
                            disabled={processing}
                        >
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
}
