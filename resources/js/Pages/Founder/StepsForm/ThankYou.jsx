import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Link } from "@inertiajs/react";

export default function ThankYou({auth}) {
    return (
        <CustomerDashboard auth={auth}>
        <div className="flex items-center justify-center h-full p-12 md:p-40">
            <div>
                <div className="flex flex-col items-center gap-4 space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4xl font-bold">Thank You !</h1>
                    <p className="mb-2 text-gray-500">Thank you for the payment. Let's complete the application.</p>
                    <Link href={route('founder.dashboard.index')}
                        className="inline-flex items-center px-4 py-2 mt-4 text-white bg-gray-600 border border-gray-600 rounded-full hover:bg-gray-700 focus:outline-none focus:ring">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span className="text-sm font-medium">
                            Continue Your Application
                        </span>
                    </Link>
                </div>
            </div>
        </div>
        </CustomerDashboard>
    );
};
