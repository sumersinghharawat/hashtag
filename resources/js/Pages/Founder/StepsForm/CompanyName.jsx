import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CompanyName({company_info={}, auth, step}){
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: company_info?company_info.name:''
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('founder.dashboard.companynamestore'));
    }

    return (
        <CustomerDashboard auth={auth}>
            <StepFormLayout step={step} filledSteps={auth.user.formstep}>
                <h2 className="text-2xl font-extrabold ">Company Name</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Please enter the name for your company</p>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="company_name" className="text-base" value="Name your company" />

                        <TextInput
                            id="company_name"
                            name="company_name"
                            value={data.company_name}
                            className="block w-full py-4 mt-1 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Name your company'
                            isFocused={true}
                            onChange={(e) => setData('company_name', e.target.value)}
                        />

                        <InputError message={errors.company_name} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-start mt-10">
                        <PrimaryButton className="justify-center w-full text-center" disabled={processing}>
                            Continue
                        </PrimaryButton>
                    </div>
                </form>
            </StepFormLayout>
        </CustomerDashboard>
    );
};
