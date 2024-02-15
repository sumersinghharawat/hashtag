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

export default function FoundersDetail({ company_info, auth, step, foundersList,totalSplits }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        split: [],
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

        setTotalSplit(totalSplits);

        setFounderSplitList(updatedFoundersList);


    }, [foundersList,totalSplits])

    const submitFounders = (e) => {
        e.preventDefault();

        post(route('founder.dashboard.founderstore'));

        data.first_name = "";
        data.last_name = "";
    }

    const submit = (e) => {
        e.preventDefault();

        data.split = founderSplitList;

        post(route('founder.dashboard.founderssplitstore'));
    }

    const goBack = () => {
        location.replace(route('founder.dashboard.companydetails'));
    }

    const updateSplit = (id, newValue) => {

        if (newValue < 0) {
            return 0;
        }

        var founderTotalSplit = 0;
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {

                obj = { ...obj, ownership_percentage: parseInt(newValue) }
                founderTotalSplit = founderTotalSplit + obj.ownership_percentage;
                return obj;
            }
            founderTotalSplit = founderTotalSplit + obj.ownership_percentage;
            return obj;
        });
        setTotalSplit(founderTotalSplit);

        setFounderSplitList(updatedFoundersList);

    };

    const updateManager = (id) => {

        console.log(founderSplitList);

        const updatedFoundersList = founderSplitList.map(obj => {

            var managerStatus = obj.manager == 0 ? 1 : 0;
            if (obj.id === id) {
                obj = { ...obj, manager: managerStatus }
                return obj;
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
    }

    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <StepFormLayout step={step}>
                <h2 className="mb-10 text-4xl">Founders</h2>
                <p className="pt-2 font-bold">Names</p>
                <p className="text-sm">List the names of all founders as they appear on government ID's</p>

                <form onSubmit={submitFounders} className="flex gap-2 mt-4 align-top">
                    <div className="w-5/12">
                        <InputLabel htmlFor="first_name" className="text-lg" value="First Name" />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="block w-full mt-4"
                            autoComplete="first_name"
                            placeholder='First Name'
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                        />

                        <InputError message={errors.first_name} className="mt-2" />

                    </div>
                    <div className="w-5/12">
                        <InputLabel htmlFor="last_name" className="text-lg" value="Last Name" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="block w-full mt-4"
                            autoComplete="last_name"
                            placeholder='Last Name'
                            isFocused={false}
                            onChange={(e) => setData('last_name', e.target.value)}
                        />

                        <InputError message={errors.last_name} className="mt-2" />

                    </div>

                    <div className="w-2/12 pt-9">
                        <PrimaryButton className="pt-3 pb-3 text-center" disabled={processing}>
                            Add Founder
                        </PrimaryButton>
                    </div>

                </form>
                <p className="pt-2 mt-4 font-bold">Ownership</p>
                <p className="pb-2 text-sm">Split the company between the founders and select managers</p>
                <form onSubmit={submit}>
                    <FoundersList founderSplitList={founderSplitList} updateSplit={updateSplit} updateManager={updateManager} />
                    <div className="flex justify-end ">
                        <div className={"w-2/12 text-center border rounded" + ((totalSplit == 100) ? " border-green-500 text-green-500 bg-green-200" : " border-red-500 text-red-500 bg-red-200")}>
                            <span>{totalSplit}% out of 100%</span>
                        </div>
                    </div>

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
