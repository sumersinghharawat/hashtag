import { useEffect } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AddIndustry ({auth, industry}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: industry?industry.name:''
    });

    useEffect(() => {
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if(industry){
            put(route('admin.dashboard.updateindustry',{id:industry.id}));
        }else{
            post(route('admin.dashboard.storeindustry'));
        }
    };

    const ViewIndustry = () => {
        location.replace(route('admin.dashboard.viewindustry'));
    }

    return (
        <Dashboard auth={auth} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">{industry?"Edit":"Add"} Industry</h2>
                                <SecondaryButton onClick={ViewIndustry}>View Industry</SecondaryButton>
                            </div>
                            <div className="mb-10">
                                <div className="relative w-full m-auto overflow-x-auto">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="name" value="Industry Name" />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="block w-full mt-1"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <InputError message={errors.name} className="mt-2" />
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
