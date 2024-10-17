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

export default function FoundersDetail({ company_info, auth, step, foundersList,totalSplits, registration_completed_step, company_count }) {
    const { data, setData, post, processing, errors, reset, delete:distroy } = useForm({
        first_name: '',
        last_name: '',
        founder_list: [],
        company_id: company_info.id
    });

    const [totalSplit, setTotalSplit] = useState(0);
    const [founderSplitList, setFounderSplitList] = useState(foundersList);

    useEffect(() => {
        var founderTotalSplit = 0;

        const updatedFoundersList = foundersList.map(obj => {
            if (obj.ownership_percentage === null) {
                obj = { ...obj, ownership_percentage: 0 };
                return obj;
            }
            return obj;
        });

        var totalSplitsNumber = parseInt(totalSplits);

        setTotalSplit(totalSplitsNumber);
        setFounderSplitList(updatedFoundersList);

    }, [foundersList,totalSplits])

    const submitFounders = (e) => {
        e.preventDefault();
        post(route('founder.dashboard.founderstore',{'id':company_info.id}));
        data.first_name = "";
        data.last_name = "";
    }

    const submit = (e) => {
        e.preventDefault();
        data.founder_list = founderSplitList;
        post(route('founder.dashboard.founderssplitstore',{'id':company_info.id}));
    }

    const goBack = () => {
        router.get(route('founder.dashboard.companydetails',data.company_id));
    }

    const updateSplit = (id, newValue) => {

        if (newValue < 0) {
            return 0;
        }

        var founderTotalSplit = 0;
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, ownership_percentage: parseInt(newValue) }
                founderTotalSplit = parseInt(founderTotalSplit?founderTotalSplit:0) + parseInt((obj.ownership_percentage)?(obj.ownership_percentage):0);
                return obj;
            }
            founderTotalSplit = parseInt(founderTotalSplit?founderTotalSplit:0) + parseInt((obj.ownership_percentage)?(obj.ownership_percentage):0);
            return obj;
        });

        setTotalSplit(parseInt(founderTotalSplit));

        setFounderSplitList(updatedFoundersList);

    };

    const updateManager = (id) => {

        const updatedFoundersList = founderSplitList.map(obj => {

            var managerStatus = obj.manager == 'No Manager' ? 'Manager' : 'No Manager';
            if (obj.id === id) {
                obj = { ...obj, manager: managerStatus }
                return obj;
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
    }

    return (
        <CustomerDashboard company_info={company_info} auth={auth} company_count={company_count}>
            <StepFormLayout step={step} filledSteps={registration_completed_step} company_id={company_info.id}>
                <h2 className="text-2xl font-extrabold ">Founders & Ownership</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Enter the legal name of the founders, split the company between the founders and select managers</p>

                <form onSubmit={submitFounders} className="flex flex-col items-start gap-2 md:flex-row">
                    <div className="w-full">
                        <InputLabel htmlFor="first_name" className="text-lg" value="First Name" />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="block w-full py-4 mt-1 bg-transparent"
                            autoComplete="first_name"
                            placeholder='First Name'
                            onChange={(e) => setData('first_name', e.target.value)}
                        />

                        <InputError message={errors.first_name} className="mt-2" />

                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="last_name" className="text-lg" value="Last Name" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="block w-full py-4 mt-1 bg-transparent"
                            autoComplete="last_name"
                            placeholder='Last Name'
                            onChange={(e) => setData('last_name', e.target.value)}
                        />

                        <InputError message={errors.last_name} className="mt-2" />

                    </div>

                    <div className="w-auto md:pt-7">
                        <button className="px-10 py-4 mt-1 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button" disabled={processing}>
                            Add
                        </button>
                    </div>

                </form>
                <div className="flex items-center justify-between pb-4 mt-10">
                    <p className="font-bold">Split the ownership between the founders</p>
                    <div className="flex items-center justify-end">
                        <div className={"w-auto text-center border px-4 rounded" + ((totalSplit == 100) ? " border-green-500 text-green-500 bg-green-200" : " border-red-500 text-red-500 bg-red-200")}>
                            <span>{totalSplit}% out of 100%</span>
                        </div>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <FoundersList founderSplitList={founderSplitList} updateSplit={updateSplit} updateManager={updateManager} company_id={company_info.id}/>
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <SecondaryButton className="justify-center text-center" disabled={processing} onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton className="justify-center w-full text-center" disabled={totalSplit == 100 ? false : true}>
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
