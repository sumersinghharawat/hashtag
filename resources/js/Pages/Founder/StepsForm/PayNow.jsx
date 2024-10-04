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

export default function PayNow({ company_info, auth, step, registration_completed_step }) {
    const { data, setData, post, processing, errors, reset } = useForm({
    });

    const submitFounders = (e) => {
        e.preventDefault();
        router.get(route('founder.dashboard.thankyou',company_info.id));
    }

    const goBack = () => {
        router.get(route('founder.dashboard.summary',company_info.id));
    }
    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <StepFormLayout step={step}  filledSteps={registration_completed_step}>
                <h2 className="text-2xl font-extrabold">Pay</h2>
                <p className="pb-6 mt-4 mb-6 text-sm text-gray-500 border-b">Pay the service and incorpX your company formation journey</p>

                <form onSubmit={submitFounders} className="flex flex-wrap mt-4 align-top">
                    <div className="flex justify-between w-full">
                        <div className="w-3/6 text-xl font-bold">
                            incorpX Service Fee
                        </div>
                        <div className="w-3/6 text-2xl font-bold text-end">
                            $599.00
                            <p className="text-base text-gray-500">one time fee</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full pb-6">
                        <div className="w-3/6">
                            <ul className="p-0 m-0 ml-8 text-base text-gray-500 list-disc">
                                <li>Expert Consultation</li>
                                <li>Formation Filings</li>
                                <li>Annual State Filings</li>
                                <li>Business bank account opening</li>
                                <li>Visa and Emirates ID support</li>
                                <li>Lifetime Compliance Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full pt-4 text-base text-gray-500 border-t">
                        <p className="text-base text-gray-500">Precise government costs will be provided for payment after document submission</p>
                    </div>
                    <div className="flex items-center justify-start w-full gap-2 mt-10">
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
