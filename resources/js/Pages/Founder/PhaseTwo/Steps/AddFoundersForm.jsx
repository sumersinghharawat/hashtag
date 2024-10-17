import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import * as React from 'react';
export const AddFoundersForm = ({company_info}) => {

    const { data, setData, post, processing, errors, reset, delete:distroy } = useForm({
        first_name: '',
        last_name: '',
        founder_list: [],
        company_id: company_info.id
    });

    const submitFounders = (e) => {
        e.preventDefault();

        post(route('founder.dashboard.founderstore',{'id':company_info.id}));

        data.first_name = "";
        data.last_name = "";
    }

    return (
        <form onSubmit={submitFounders} className="flex flex-col items-start gap-2 md:flex-row">
            <div className="w-full">
                <InputLabel htmlFor="first_name" className="text-lg" value="First Name" />

                <TextInput
                    id="first_name"
                    name="first_name"
                    value={data.first_name}
                    className="block w-full py-4 mt-1 bg-transparent"
                    autoComplete="first_name"
                    placeholder='First Name'
                    onChange={(e) => setData('first_name', e.target.value)}
                />

                <InputError message={errors.first_name} className="mt-2" />

            </div>
            <div className="w-full">
                <InputLabel htmlFor="last_name" className="text-lg" value="Last Name" />

                <TextInput
                    id="last_name"
                    name="last_name"
                    value={data.last_name}
                    className="block w-full py-4 mt-1 bg-transparent"
                    autoComplete="last_name"
                    placeholder='Last Name'
                    onChange={(e) => setData('last_name', e.target.value)}
                />

                <InputError message={errors.last_name} className="mt-2" />

            </div>

            <div className="w-auto md:pt-7">
                <button className="px-10 py-4 mt-1 text-center text-black bg-transparent border border-gray-300 rounded-full secondary-button" disabled={processing}>
                    Add
                </button>
            </div>

        </form>
    );
};
