import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const checkField = (key, value) => {
        setData(key, value);

        if (data.email & data.password) {
            setProcessing(true);
        }
    }

    return (
        <GuestLayout>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>
                    <p className="mb-12 text-center text-gray-500">Embark on Your Business Journey – Create Your incorpX Account Today!</p>
                    <a
                        href={route("google.auth")}
                        className="flex items-center justify-center w-full py-3 text-xs font-semibold tracking-widest text-black transition duration-150 ease-in-out bg-white border border-gray-400 rounded hover:bg-gray-100 active:bg-gray-100 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25"
                    >
                        <svg
                            className="h-5 mr-2"
                            viewBox="0 0 533.5 544.3"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                fill="#4285f4"
                            />
                            <path
                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                fill="#34a853"
                            />{" "}
                            <path
                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                fill="#fbbc04"
                            />{" "}
                            <path
                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                fill="#ea4335"
                            />
                        </svg>
                        <span className="text-md">Continue with Google</span>
                    </a>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="my-10 bg-gray-300 h-0.5 w-full"></div>
                <span>or</span>
                <div className="my-10 bg-gray-300 h-0.5 w-full"></div>
            </div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full py-4 mt-1 bg-transparent"
                        autoComplete="username"
                        placeholder="Enter your email here"
                        isFocused={true}
                        onChange={(e) => checkField("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={data.password}
                        className="block w-full py-4 mt-1 bg-transparent"
                        autoComplete="current-password"
                        onChange={(e) => checkField("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="confirm_password" value="Confirm Password" />

                    <TextInput
                        id="confirm_password"
                        type="password"
                        name="confirm_password"
                        placeholder="********"
                        value={data.password_confirmation}
                        className="block w-full py-4 mt-1 bg-transparent"
                        autoComplete="current-password"
                        onChange={(e) => checkField("password_confirmation", e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                <div className="flex items-center justify-end gap-2 mt-8">
                    <PrimaryButton disabled={processing}>
                        Create Account
                    </PrimaryButton>
                </div>
            </form>
            <div className="flex items-center justify-center gap-1 mt-4">
                <p>Have an account?</p>
                <Link
                    href={route("login")}
                    className="text-sm underline rounded-md text-primary hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </Link>
            </div>
        </GuestLayout>
    );
}
