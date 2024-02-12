import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomerAuthenticatedLayout from '@/Layouts/CustomerAuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function CustomerDashboard({ auth,children }) {
    return (
        <CustomerAuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Customer Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    {children}
                    {/* {step==1?<LetsBegin data={customer_info} errors={errors} processing={processing} step={step}></LetsBegin>:
                    <div className='flex p-6'>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    </div>
                                    <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                                    </div>
                                    <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    </div>
                                </dl>
                            </div>
                        </div>} */}
                    </div>
                </div>
            </div>
        </CustomerAuthenticatedLayout>
    );
}
