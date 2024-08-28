import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FounderAuthenticatedLayout from '@/Layouts/FounderAuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function FounderDashboard({ auth,children,step }) {
    return (
        <FounderAuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Founder Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="md:py-12">
                <div className={step==0?"mx-auto container":"mx-auto container"}>
                    <div className="overflow-hidden sm:rounded-lg">
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
        </FounderAuthenticatedLayout>
    );
}
