import { useEffect, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import SelectInput from "@/Components/SelectInput";

export default function AddPackage ({auth, packageofproduct, variantofproduct}) {
    const { data, setData, put, post, processing, errors, reset } = useForm({
        description: variantofproduct?variantofproduct.description:'',
        price: variantofproduct?.price?variantofproduct.price:0,
        discount_price: variantofproduct?.discount_price?variantofproduct.discount_price:0,
        variant_type: variantofproduct?variantofproduct.variant_type:'',
        title: variantofproduct?variantofproduct.title:'',
        visa_count: variantofproduct?.visa_count?variantofproduct.visa_count:0,
    });

    const [variantTypes, setVaraintTypes] = useState([{
        'name': 'Select Variant Type',
        'value': null
    },
    {
        'name': 'License',
        'value': 'license'
    },
    {
        'name': 'Visa',
        'value': 'visa'
    }]);

    useEffect(() => {
        console.log(packageofproduct);
        setData('title', data.variant_type=='visa'?data.visa_count+' Visa Cost':data.title);
    },[]);

    const submit = (e) => {
        e.preventDefault();

        if(packageofproduct && variantofproduct){
            put(route('admin.dashboard.updatevariantofproduct',{'package_id':packageofproduct.id, 'id':variantofproduct.id}));
        }else{
            post(route('admin.dashboard.storevariantofproduct',{'package_id':packageofproduct.id}));
        }
    };

    const ViewVariant = () => {
        router.get(route('admin.dashboard.variantofproduct', {package_id:packageofproduct.id}));
    }

    const ViewPackage = () => {
        router.get(route('admin.dashboard.packagesofproduct'));
    }

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">{variantofproduct?"Edit":"Add"} Variant</h2>
                                <div className="flex gap-2">
                                    <SecondaryButton onClick={ViewPackage}>View Packages</SecondaryButton>
                                    <SecondaryButton onClick={ViewVariant}>View Variant</SecondaryButton>
                                </div>
                            </div>
                            <div className="mb-10">
                                <p className="p-2 text-yellow-500 bg-yellow-100 rounded">This variant {variantofproduct?"Edit":"Add"} for {packageofproduct.title}</p>
                            </div>
                            <div className="mb-10">
                                <div className="relative w-full m-auto overflow-x-auto">
                                <form onSubmit={submit}>

                                    <div>
                                        <InputLabel htmlFor="variant_types" value="Variant Type" />

                                        <SelectInput
                                            id="variant_types"
                                            name="variant_types"
                                            selectedvalue={data.variant_type}
                                            className="block w-full mt-1"
                                            autoComplete="variant_types"
                                            dropdown={variantTypes}
                                            onChange={(e) => setData('variant_type', e.target.value)}
                                        />

                                        <InputError message={errors.variant_type} className="mt-2" />
                                    </div>

                                    {data.variant_type=='visa'?<div>
                                        <InputLabel htmlFor="visa_count" value="Visa Count" />

                                        <TextInput
                                            type="number"
                                            id="visa_count"
                                            name="visa_count"
                                            value={data.visa_count}
                                            className="block w-full mt-1"
                                            autoComplete="visa_count"
                                            onChange={(e) => setData('visa_count', e.target.value)}
                                        />

                                        <InputError message={errors.visa_count} className="mt-2" />
                                    </div>:<></>}
                                    <div className={data.variant_type=='visa'?'hidden':''}>
                                        <InputLabel htmlFor="title" value="Variant Title" />

                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="block w-full mt-1"
                                            autoComplete="title"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />

                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="price" value="Variant Price" />

                                        <TextInput
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={data.price}
                                            className="block w-full mt-1"
                                            autoComplete="price"
                                            onChange={(e) => setData('price', e.target.value)}
                                        />

                                        <InputError message={errors.price} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="discount_price" value="Variant Discount Price" />

                                        <TextInput
                                            type="number"
                                            id="discount_price"
                                            name="discount_price"
                                            value={data.discount_price}
                                            className="block w-full mt-1"
                                            autoComplete="discount_price"
                                            onChange={(e) => setData('discount_price', e.target.value)}
                                        />

                                        <InputError message={errors.discount_price} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="description" value="Variant description" />

                                        <TextareaInput
                                            id="description"
                                            name="description"
                                            className="block w-full mt-1"
                                            autoComplete="description"
                                            onChange={(e) => setData('description', e.target.value)}
                                        >{data.description}</TextareaInput>

                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">

                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Submit
                                        </PrimaryButton>

                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Dashboard>
    );
};
