import { DragAndDropBox } from '@/Components/DragAndDropBox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Phase2FormDetails } from '@/Layouts/Phase2FormDetails';
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router } from '@inertiajs/react';
import { Label } from 'flowbite-react';
import * as React from 'react';

export default function FinalPayment({auth, company_info, step, registration_completed_step, foundersList, packages_with_variants, errors, company_count }){

    React.useEffect(()=>{
        console.log(packages_with_variants);
    },[]);

    const [selectedPackage, setSelectedPackage] = React.useState(null);

    const handleSaveAndContinue = () => {

        router.put(route('founder.dashboard.store-final-payment', company_info.id),
            {
                selectedPackage: selectedPackage
            }
        );
    }

    const updateSelectedPackge = (package_id) => {
        setSelectedPackage(package_id);
    }

    const goBack = () => {
        router.get(route('founder.dashboard.shareholder-details',company_info.id));
    }

    const formatCurrency = (value) => {
        return 'AED ' + value.toLocaleString('en-US');
    }

    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <h2 className="text-2xl font-extrabold">Select your Free-zone and Pay License Fee</h2>
                <p className="pb-6 mt-4 mb-6 text-sm text-gray-500 border-b">Please review the total fee for the company license below and proceed with your payment.</p>
                <InputError message={errors['selectedPackage']} className="mt-2" />
                {packages_with_variants.map((element, index)=>{

                    let totalPackagePrice = 0;
                    for(let variant in element.variants){
                        totalPackagePrice += parseInt(element.variants[variant].price);
                    }

                    return <div className={"cursor-pointer flex flex-col w-full h-full p-6 mb-4 bg-white border rounded-xl "+(selectedPackage==element.id?'border-color-primary':'border-gray-300')} onClick={()=>{updateSelectedPackge(element.id)}}>
                        <div className={"flex flex-row justify-between w-full h-full font-bold flex-nowrap mb-2 "+(selectedPackage==element.id?'text-primary':'')}>
                            <div>{element.title}</div>
                            <div>{formatCurrency(totalPackagePrice)}</div>
                        </div>
                        {element.variants.map((variantElement)=>{
                            return <div className="flex flex-row justify-between w-full h-full">
                                <div>{variantElement.title}</div>
                                <div>{formatCurrency(parseInt(variantElement.price))}</div>
                            </div>})}
                    </div>
                })}

                <div className="flex items-center justify-start w-full gap-2 mt-10">
                    <SecondaryButton className="justify-center text-center" onClick={goBack}>
                        Back
                    </SecondaryButton>
                    <PrimaryButton className="justify-center w-full text-center" onClick={()=>handleSaveAndContinue()}>
                        Pay Now & Submit Application
                    </PrimaryButton>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
