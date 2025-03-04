import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CompanyName({company_info={}, auth, step, registration_completed_step, company_count}){
    const { data, setData, post, put, processing, errors, reset } = useForm({
        company_id: company_info?company_info.id:'',
        company_name_1: company_info?company_info.company_name_1:'',
        company_name_2: company_info?company_info.company_name_2:'',
        company_name_3: company_info?company_info.company_name_3:''
    });

    useEffect(()=>{
        if(localStorage.getItem('company_id')){
            // setData('company_id',localStorage.getItem('company_id'));
        }
    },[]);

    const submit = (e) => {
        e.preventDefault();

        if(data.company_id != undefined){
            put(route('founder.dashboard.companynamestoreandupdate',data.company_id));
        }else{
            post(route('founder.dashboard.companynamestore',0));
        }
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <StepFormLayout step={step} filledSteps={registration_completed_step} company_id={data.company_id?data.company_id:''}>
                <h2 className="text-2xl font-extrabold ">Company Name</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Please enter three name choices for your company in order of preference</p>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="company_name" className="text-base" value="Name your company" />

                        <TextInput
                            id="company_name"
                            name="company_name_1"
                            value={data.company_name_1}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 1'
                            isFocused={true}
                            onChange={(e) => setData('company_name_1', e.target.value)}
                        />

                        <InputError message={errors.company_name_1} className="mt-2" />
                    </div>
                    <div>

                        <TextInput
                            id="company_name"
                            name="company_name_2"
                            value={data.company_name_2}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 2'
                            isFocused={false}
                            onChange={(e) => setData('company_name_2', e.target.value)}
                        />

                        <InputError message={errors.company_name_2} className="mt-2" />
                    </div>
                    <div>

                        <TextInput
                            id="company_name"
                            name="company_name_3"
                            value={data.company_name_3}
                            className="block w-full py-4 mt-4 bg-transparent"
                            autoComplete="company_name"
                            placeholder='Company Name Preference 3'
                            isFocused={false}
                            onChange={(e) => setData('company_name_3', e.target.value)}
                        />

                        <InputError message={errors.company_name_3} className="mt-2" />
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
