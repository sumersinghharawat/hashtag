import CountryList from "@/Components/CountryList";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function LetsBegin({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        country_of_residenace: "",
        mobile_number: "",
    });

    if (!data.mobile_number) {
        data.mobile_number = "";
    }

    useEffect(()=>{
        if(auth){
            data.first_name = auth.user.first_name;
            data.last_name = auth.user.last_name?auth.user.last_name:"";
            setValue(auth.user.mobile_number);
            setCountryCode(auth.user.country_of_residenace);
        }
    },[]);

    const [value, setValue] = useState();
    const [countryCode, setCountryCode] = useState(null);

    const fetchCountryCode = async () => {
        try {
            const response = await fetch(
                "https://ipinfo.io/json?token=712e53b5f2cc22"
            );
            const data = await response.json();

            setCountryCode(data.country);
        } catch (error) {
            console.error("Error getting country code:", error);
        }
    };

    fetchCountryCode();

    var country = [{ name: "select", value: "select" }];

    function submit(e) {
        e.preventDefault();
        data.mobile_number = value;
        post(route('founder.dashboard.letsbeginstore'));
    }

    country = Array.from(new Set(CountryList));

    return (
        <CustomerDashboard auth={auth} step={0}>
            <div className="w-full p-6">
                <div className="p-5">
                    <h2 className="pb-6 text-xl font-semibold leading-tight text-gray-800">
                        Let's begin
                    </h2>
                    <p>
                        Enter your name, phone number and country of residence
                        to get started
                    </p>
                    <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-1">
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
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.first_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <InputLabel htmlFor="last_name" value="Last Name" />

                                <TextInput
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    className="block w-full mt-1"
                                    autoComplete="last_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.last_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <InputLabel
                                    htmlFor="mobile_number"
                                    value="Phone Number"
                                />

                                <PhoneInput
                                    name="mobile_number"
                                    defaultCountry={countryCode}
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue}
                                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                                />

                                <InputError
                                    message={errors.mobile_number}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full mt-2">
                                <label
                                    htmlFor="country_of_residenace"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="w-full mt-2">
                                    <SelectInput
                                        dropdown={country ? country : []}
                                        name="country_of_residenace"
                                        selectedValue={(data.country_of_residenace)?data.country_of_residenace:''}
                                        onChange={(e) => {
                                            data.country_of_residenace = e.target.value;
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    className="w-full p-5 px-4 py-2 text-xs font-semibold tracking-widest text-center text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    disabled={processing}
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}
