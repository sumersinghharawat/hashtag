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
            <StepFormLayout step={step}>
                <h2 className="text-4xl">Company Details</h2>
                <p className="pt-6 font-bold">Entity Type</p>
                <p className="pt-0 mb-6 text-sm">This will be your legally registered company name if it is available to use</p>
                <div className="p-4 bg-gray-100 rounded-lg ">
                    <h4 className="font-bold text-black-200">Freezone</h4>
                    <p className="text-gray-600">Often used by digital enterpreneurs, that are:</p>
                    <ul className="list-disc list-inside ">
                        <li className="text-gray-600">Selling goods or services online.</li>
                        <li className="text-gray-600">Do not require a physical office.</li>
                    </ul>
                </div>
                <form onSubmit={submit} className="mt-6">

                    <div>
                        <InputLabel htmlFor="industry" className="text-xl" value="Company Industry" />
                        <TextInput
                            id="company_description"
                            name="company_description"
                            value={data.company_industry}
                            className="block w-full mt-4"
                            autoComplete="on"
                            placeholder='Company Industry'
                            isFocused={false}
                            list="listindusties"
                            onChange={(e) => CheckIndustryName(e)}
                        />
                        <datalist id="listindusties">
                            {listindusties ? (
                                listindusties.map((element) => {
                                    return element.name ? (
                                        <option key={element.name} value={element.name}>
                                            {element.name}
                                        </option>
                                    ) : (
                                        <></>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </datalist>


                        <InputError message={errors.company_industry} className="mt-2" />
                        <span className="text-sm text-gray-400">Select the industry your company belongs to </span>
                    </div>

                    <div>
                        <InputLabel htmlFor="company_description" className="text-xl" value="Company description" />

                        <TextInput
                            id="company_description"
                            name="company_description"
                            value={data.company_description}
                            className="block w-full mt-4"
                            autoComplete="company_description"
                            placeholder='Company Description'
                            isFocused={false}
                            onChange={(e) => setData('company_description', e.target.value)}
                        />

                        <InputError message={errors.company_description} className="mt-2" />
                        <span className="text-sm text-gray-400">Describe your product or service in a sentence or two (minimum of 20 characters)</span>
                    </div>

                    <div className="flex items-center justify-start gap-2 mt-4">
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
