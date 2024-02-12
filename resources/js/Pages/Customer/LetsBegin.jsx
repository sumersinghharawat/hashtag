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

export default function LetsBegin({ auth, customer_info, company_info }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        country: "",
        mobile: "",
    });

    if (!data.mobile) {
        data.mobile = "";
    }

    useEffect(()=>{
        console.log(company_info);
        if(customer_info){
            data.name = customer_info.name;
            setValue(customer_info.mobile);
            setCountryCode(company_info.country);
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
        data.mobile = value;
        post(route('customer.dashboard.letsbeginstore'));
    }

    country = Array.from(new Set(CountryList));

    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <div className="p-6">
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
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full mt-1"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="mobile"
                                    value="Phone Number"
                                />

                                <PhoneInput
                                    name="mobile"
                                    defaultCountry={countryCode}
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue}
                                />

                                <InputError
                                    message={errors.mobile}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="w-full mt-2">
                                    <SelectInput
                                        dropdown={country ? country : []}
                                        name="country"
                                        selectedValue={(data.country)?data.country:''}
                                        onChange={(e) => {
                                            data.country = e.target.value;
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
