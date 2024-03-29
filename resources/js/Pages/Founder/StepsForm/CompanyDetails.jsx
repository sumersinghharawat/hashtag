import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CompanyDetails({company_info, auth, step, listindusties}){
    const { data, setData, post, processing, errors, reset } = useForm({
        company_industry: company_info.industry?company_info.industry:'',
        company_description: company_info.description?company_info.description:''
    });

    const goBack = () => {
        location.replace(route('founder.dashboard.companyname'));
    }

    useEffect(()=>{
        setData('company_industry',company_info.industry?company_info.industry:'');
    },[])

    const submit = (e) => {
        e.preventDefault();

        if(data.company_industry){
            if(data.company_industry == "Select Industry"){
                data.company_industry = "";
            }
        }

        post(route('founder.dashboard.companydetailsstore'));
    }

    const CheckIndustryName = (e) => {
        const options = Array.from(listindusties).map((option) =>
            option.name.toLowerCase()
        );

        if (!options.includes(e.target.value.toLowerCase())) {
            errors.company_industry = 'Please choose a browser from the list.';
            setData('company_industry', e.target.value);
        } else {
            errors.company_industry = '';
            setData('company_industry', e.target.value);
        }

    }

    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <StepFormLayout step={step} filledSteps={auth.user.formstep}>
                <h2 className="text-2xl font-extrabold">Company Details</h2>
                <p className="mt-4 mb-6 text-sm text-gray-500">Please enter three name choices for your company in order of preference.</p>

                <form onSubmit={submit}>

                    <div>
                        <InputLabel htmlFor="industry" className="text-base" value="Company Industry" />
                        <select className="block w-full p-4 mt-1 bg-transparent border-gray-300 rounded"
                        value={data.company_industry}
                        autoComplete="off"
                        placeholder='Company Industry'
                        id="company_description"
                        name="company_description"
                        onChange={(e) => CheckIndustryName(e)}
                        >
                            {listindusties ? (
                                listindusties.map((element,index) => {
                                    return element.name ? (
                                        <option key={element.name} value={index==0?"":element.name}>
                                            {element.name}
                                        </option>
                                    ) : (
                                        <></>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </select>


                        <InputError message={errors.company_industry} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="company_description" className="text-base" value="Company description" />

                        <TextInput
                            id="company_description"
                            name="company_description"
                            value={data.company_description}
                            className="block w-full py-4 mt-1 bg-transparent"
                            autoComplete="company_description"
                            placeholder='Company Description'
                            isFocused={false}
                            onChange={(e) => setData('company_description', e.target.value)}
                        />

                        <InputError message={errors.company_description} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-start gap-2 mt-10">
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
