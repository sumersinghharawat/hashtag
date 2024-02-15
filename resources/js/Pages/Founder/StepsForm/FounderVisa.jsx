import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FoundersList from "./FoundersList";

export default function FounderVisa({  auth, step, foundersList }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        split: [],
        visastatus: true,
    });

    const [founderSplitList, setFounderSplitList] = useState(foundersList);
    const [doYouWantVisa, setDoYouWantVisa] = useState(false);
    const [doYouWantVisaForAll, setDoYouWantVisaForAll] = useState(true);
    const [visaCount, setVisaCount] = useState(0);
    // var visaCount = 0;

    useEffect(() => {
        const updatedFoundersList = foundersList;
        setFounderSplitList(updatedFoundersList);

        var updatedVisaCount = updatedFoundersList.reduce((count, obj) => count + obj.visa_status, 0);
        if(updatedVisaCount>0){
            setDoYouWantVisa(true);
        }
        setVisaCount(updatedVisaCount);
    }, [foundersList])

    const submit = (e) => {
        e.preventDefault();

        data.split = founderSplitList;

        data.visastatus = doYouWantVisa;

        post(route('founder.dashboard.foundersvisastore'));
    }

    const goBack = () => {
        location.replace(route('founder.dashboard.foundersdetail'));
    }

    const checkVisa = () => {
        setDoYouWantVisa(!doYouWantVisa);
        if(visaCount==0){
            setDoYouWantVisaForAll(false);
        }

        if(doYouWantVisa){
            setDoYouWantVisaForAll(true);
        }
    }

    const submitVisa = (e) => {
        e.preventDefault();

        return false;
    }

    const updateVisa = (id) => {
        var updatedFoundersList = founderSplitList.map(obj => {
            var visaStatus = obj.visa_status ? 0 : 1;
            if (obj.id === id) {
                obj = { ...obj, visa_status: visaStatus };
            }
            return obj;
        });

        var updatedVisaCount = updatedFoundersList.reduce((count, obj) => count + obj.visa_status, 0);

        setFounderSplitList(updatedFoundersList);
        setVisaCount(updatedVisaCount);
        setDoYouWantVisaForAll(updatedVisaCount > 0);
    }

    return (
        <CustomerDashboard auth={auth}>
            <StepFormLayout step={step}>
                <h2 className="mb-10 text-4xl">Visa</h2>
                <p className="pt-2 font-bold">Do any of the founders require a UAE visa?</p>
                <p className="text-sm">If yes, select the founders that require a UAE visa</p>
                <form onSubmit={submitVisa}>
                <div className="flex items-center my-2 gap-x-3">
                    <input type="radio" id="yes-visa" name="visa" className="hidden peer" onChange={checkVisa}
                    checked={doYouWantVisa} />
                    <label htmlFor="yes-visa" className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 ">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Yes</div>
                        </div>
                    </label>
                </div>
                <div className="flex items-center my-2 gap-x-3 ">
                    <input type="radio" id="no-visa" name="visa" className="hidden peer" onChange={checkVisa}
                    checked={!doYouWantVisa}/>
                    <label htmlFor="no-visa" className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 ">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">No</div>
                        </div>
                    </label>
                </div>
                </form>

                <form onSubmit={submit}>

                {(doYouWantVisa)?<table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th align="start">Founder names</th>
                                <th>Requires a Visa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {founderSplitList.map((element,index)=>{
                            return <tr key={index} className="border rounded">
                                    <td className="p-2">{element.first_name +" "+ element.last_name}</td>
                                    <td align="center">
                                        <div className="relative flex justify-center gap-x-3">
                                            <div className="flex items-center h-6">
                                                <input
                                                id="manager"
                                                name="manager"
                                                onChange={(e) => updateVisa(element.id)}
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
                    </table>:<></>}
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <SecondaryButton className="justify-center text-center" disabled={processing} onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton className="justify-center w-full text-center" disabled={!doYouWantVisaForAll?true:false}>
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
