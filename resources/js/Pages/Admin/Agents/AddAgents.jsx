import { useEffect } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Dashboard from "@/Pages/Dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add ({auth, agent}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: agent?agent.first_name:'',
        last_name: agent?agent.last_name:'',
        email: agent?agent.email:'',
        password: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if(agent){
            post(route('admin.dashboard.agenteditstore',{id:agent.id}));
        }else{
            post(route('admin.dashboard.agentregister'));
        }
    };

    const ViewAgent = () => {
        location.replace(route('admin.dashboard.viewagents'));
    }

    return (
        <Dashboard auth={auth.user} >
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-full p-6 border-r-2 border-gray-200">
                            <div className="flex justify-between mb-10">
                                <h2 className="text-4xl">{agent?"Edit":"Add"} Agents</h2>
                                <SecondaryButton onClick={ViewAgent}>View Agent</SecondaryButton>
                            </div>
                            <div className="mb-10">
                                <div className="relative w-full m-auto overflow-x-auto">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" />

                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className="block w-full mt-1"
                                            autoComplete="first_name"
                                            isFocused={true}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="last_name" value="Last Name" />

                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            className="block w-full mt-1"
                                            autoComplete="last_name"
                                            isFocused={false}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full mt-1"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full mt-1"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.password} className="mt-2" />
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
