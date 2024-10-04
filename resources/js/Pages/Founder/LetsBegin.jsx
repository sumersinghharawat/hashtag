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

        fetchCountryCode();

        if(auth){
            data.first_name = auth.user.first_name;
            data.last_name = auth.user.last_name?auth.user.last_name:"";
            setValue(auth.user.mobile_number);
            data.country_of_residenace = auth.user.country_of_residenace?auth.user.country_of_residenace:country.name;
        }

        data.first_name = data.first_name?.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        data.last_name = data.last_name?.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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



    var country = [{ name: "select", value: "select" }];

    function submit(e) {
        e.preventDefault();
        data.mobile_number = value;
        post(route('founder.dashboard.letsbeginstore'));
    }

    localStorage.clear();


    country = Array.from(new Set(CountryList));

    return (
        <CustomerDashboard auth={auth} step={0}>
            <div className="w-full p-6">
                <div className="p-5 mx-auto" style={{maxWidth:"440px"}}>
                    <h2 className="text-xl font-semibold leading-tight text-center text-gray-800">
                        Let’s Setup Your Company
                    </h2>
                    <p className="mt-6 text-sm text-center" style={{color:"#545454"}}>
                        Enter your name, phone number and country of residence
                        to get started
                    </p>
                    <div className="grid grid-cols-1 mt-10 sm:grid-cols-1">
                        <form onSubmit={submit}>
                            <div className="flex items-center gap-4">
                                <div className="w-6/12">
                                    <InputLabel htmlFor="first_name" value="First Name" />

                                    <TextInput
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        className="block w-full py-4 mt-1 bg-transparent"
                                        autoComplete="first_name"
                                        isFocused={true}
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            setData("first_name", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div  className="w-6/12 ">
                                    <InputLabel htmlFor="last_name" value="Last Name" />

                                    <TextInput
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        className="block w-full py-4 mt-1 bg-transparent"
                                        autoComplete="last_name"
                                        placeholder="Last Name"
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
                            </div>
                            <div className="mt-4">
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
                                    style={{background:"transparent"}}
                                    className="mt-1 bg-transparent border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                                />

                                <InputError
                                    message={errors.mobile_number}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full mt-4">
                                <label
                                    htmlFor="country_of_residenace"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Country of Residenace
                                </label>
                                <div className="w-full mt-1">
                                    <SelectInput
                                        className="py-4 bg-transparent"
                                        dropdown={country ? country : []}
                                        name="country_of_residenace"
                                        selectedvalue={(data.country_of_residenace=="")?country.name:data.country_of_residenace}
                                        onChange={(e) => {
                                            setData("country_of_residenace", e.target.value)
                                        }}
                                    />
                                </div>

                                <InputError
                                    message={errors.country_of_residenace}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end w-full mt-10">
                                <PrimaryButton
                                    className="justify-center w-full"
                                    disabled={processing}
                                >
                                    Continue
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}
