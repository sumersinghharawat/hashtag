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

export default function PayNow({ company_info, auth, step }) {
    const { data, setData, post, processing, errors, reset } = useForm({
    });


    useEffect(() => {
    }, [])

    const submitFounders = (e) => {
        e.preventDefault();

        location.replace(route('founder.dashboard.thankyou'));

    }

    const goBack = () => {
        location.replace(route('founder.dashboard.summary'));
    }
    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <StepFormLayout step={step}>
                <h2 className="mb-10 text-4xl">Pay</h2>
                <p className="text-sm">Your $599 payment covers DOYOU's service fee. Precise government costs will be provided for payment after document submission.</p>

                <form onSubmit={submitFounders} className="flex flex-wrap mt-4 align-top">
                    <div className="flex justify-between w-full p-4 mt-5 mb-0 border border-b-0 bg-gray-50 rounded-tl-3xl rounded-tr-3xl">
                        <div className="w-3/6 text-xl">
                            HashTag Service Fee
                        </div>
                        <div className="w-3/6 text-xl text-end">
                            $599.00
                        </div>
                    </div>
                    <div className="flex justify-between w-full p-4 mb-5 border bg-gray-50 rounded-bl-3xl rounded-br-3xl">
                        <div className="w-3/6 text-xl font-bold">
                            Due now
                        </div>
                        <div className="w-3/6 text-xl font-bold text-end">
                            $599.00
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full gap-2 mt-4">
                        <SecondaryButton className="justify-center text-center" disabled={processing} onClick={goBack}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton className="justify-center w-full text-center" disabled={processing}>
                            Pay Now
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
