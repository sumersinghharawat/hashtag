import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FoundersList from "./FoundersList";

export default function FounderVisa({  auth, step, foundersList, registration_completed_step, company_info, company_count }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        founders_list: [],
        visastatus: true,
        company_id: company_info.id
    });

    const [founderSplitList, setFounderSplitList] = useState(foundersList);
    const [visaCount, setVisaCount] = useState(0);

    useEffect(() => {
        const updatedFoundersList = foundersList;
        setFounderSplitList(updatedFoundersList);

        var updatedVisaCount = updatedFoundersList.reduce((count, obj) => count + obj.visa_status, 0);
        setVisaCount(updatedVisaCount);
    }, [foundersList])

    const submit = (e) => {
        e.preventDefault();

        data.founders_list = founderSplitList;

        post(route('founder.dashboard.foundersvisastore', data.company_id));
    }

    const goBack = () => {
        console.log(data);
        router.get(route('founder.dashboard.foundersdetail',data.company_id));
    }

    const updateVisa = (id) => {
        var updatedFoundersList = founderSplitList.map(obj => {
            var visaStatus = parseInt(obj.visa_status) ? 0 : 1;
            if (obj.id === id) {
                obj = { ...obj, visa_status: visaStatus };
            }
            return obj;
        });

        var updatedVisaCount = updatedFoundersList.reduce((count, obj) => count + obj.visa_status, 0);

        setFounderSplitList(updatedFoundersList);
        setVisaCount(updatedVisaCount);
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <StepFormLayout step={step}  filledSteps={registration_completed_step} company_id={company_info.id}>
                <h2 className="text-2xl font-extrabold">Visa</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Select the founders that require UAE Visa or Emirates ID</p>

                <form onSubmit={submit} className="">

                <div className="w-full">
                            <div className="flex items-center h-16 border-t border-b border-gray-300 md:h-8">
                                <div className="w-2/3 text-base font-medium">Founder’s Name</div>
                                <div className="w-1/3 text-base font-medium text-center">Visa / Emirates ID</div>
                            </div>
                            {founderSplitList.map((element,index)=>{
                            return <div key={index} className="flex items-center my-4">
                                    <div className="w-2/3 p-4 bg-white border border-gray-300 rounded">{element.first_name +" "+ element.last_name}</div>
                                    <div align="center" className="w-1/3 ">
                                        <div className="relative flex justify-center gap-x-3">
                                            <div className="flex items-center h-6">
                                                <input
                                                id="manager"
                                                name="manager"
                                                onChange={(e) => updateVisa(element.id)}
                                                checked={parseInt(element.visa_status)}
                                                type="checkbox"
                                                className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    <div className="flex items-center justify-start gap-2 pt-10 border-t border-gray-300">
                        <SecondaryButton className="justify-center text-center" onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton className="justify-center w-full text-center" onClick={submit}>
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
