import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import * as React from 'react';
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";

export const PopUpForm = ({showPopUp,emailSent}) => {

    const [value, setValue] = React.useState();
    const [countryCode, setCountryCode] = React.useState(null);

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

    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: "",
        phonenumber: "",
        email: "",
        message: ""
    });

    const checkField = (key, value) => {
        setData(key, value);

        if (data.email & data.password) {
            setProcessing(true);
        }
    }

    const submit = (e) => {
        e.preventDefault();

        data.phonenumber = value;

        post(route("formsubmission"));

    };

    return (
        <div className="fixed z-50 flex items-center justify-center w-screen h-screen bg-black/80">
            <div className="w-4/5 p-8 mx-auto bg-white border border-gray-700 md:p-10 md:w-2/5 rounded-3xl shadow-neutral-100 drop-shadow">
            <button onClick={showPopUp} className='absolute w-6 h-6 text-2xl right-3 top-3'><FontAwesomeIcon icon={faClose} /></button>
            {emailSent?<div className="flex flex-col items-center p-16 align-middle rounded">
                    <div className="flex items-center justify-center w-32 h-32 mb-10 border-8 border-green-400 rounded-full text-7xl">
                        <FontAwesomeIcon icon={faCheck} className='text-green-400'/>
                    </div>
                    <p className="pb-5 text-2xl font-bold">Form Submitted Succesfully!</p>
                    <p className="text-center text-gray-400">Thank you for filling out the form! We will be in touch with you shortly to provide free consultancy on setting up your business in the UAE.</p>
                </div>:<><h2 className="text-2xl font-extrabold ">Free Consultations</h2>
            <p className="mt-4 mb-6 text-sm text-gray-500">Fill out this form to get a free consultancy on setting up your business in the UAE</p>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="fullname" value="Full Name" />

                    <TextInput
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={data.fullname}
                        className="block w-full py-4 mt-1 bg-transparent"
                        autoComplete="fullname"
                        placeholder="Enter your full name here"
                        isFocused={true}
                        onChange={(e) => checkField("fullname", e.target.value)}
                    />

                    <InputError message={errors.fullname} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="phonenumber" value="Phone Number" />

                    <PhoneInput
                        name="phonenumber"
                        defaultCountry={countryCode}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={setValue}
                        style={{background:"transparent"}}
                        className="mt-1 bg-transparent border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                    />
                    <InputError message={errors.phonenumber} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full py-4 mt-1 bg-transparent"
                        autoComplete="email"
                        placeholder="Enter your email here"
                        onChange={(e) => checkField("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="message" value="Message" />

                    <textarea
                        id="message"
                        type="message"
                        name="message"
                        className="block w-full py-4 mt-1 bg-transparent border border-gray-300 rounded"
                        autoComplete="message"
                        placeholder="Enter your message here"
                        onChange={(e) => checkField("message", e.target.value)}
                        value={data.message}
                    ></textarea>

                    <InputError message={errors.message} className="mt-2" />
                </div>
                <div className="flex items-center justify-end gap-2 mt-8">
                    <PrimaryButton disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form></>}
            </div>
        </div>
    );
};
