import { useEffect } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";

export default function AddPackage ({auth, packageofproduct}) {
    const { data, setData, put, post, processing, errors, reset } = useForm({
        title: packageofproduct?packageofproduct.title:'',
        description: packageofproduct?packageofproduct.description:''
    });

    useEffect(() => {
        console.log(packageofproduct);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if(packageofproduct){
            put(route('admin.dashboard.updatepackagesofproduct',{'id':packageofproduct.id}));
        }else{
            post(route('admin.dashboard.storepackagesofproduct'));
        }
    };

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
                                <h2 className="text-4xl">{packageofproduct?"Edit":"Add"} Package</h2>
                                <SecondaryButton onClick={ViewPackage}>View Package</SecondaryButton>
                            </div>
                            <div className="mb-10">
                                <div className="relative w-full m-auto overflow-x-auto">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="title" value="Package Title" />

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
                                        <InputLabel htmlFor="description" value="Package description" />

                                        <TextareaInput
                                            id="description"
                                            name="description"
                                            className="block w-full mt-1"
                                            autoComplete="description"
                                            onChange={(e) => setData('description', e.target.value)}
                                            value={data.description?data.description:''}
                                        />
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
