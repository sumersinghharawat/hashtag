import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, children, dashboard }) {
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <main>{children?children:<div className='px-4 mx-auto my-4 sm:px-6 lg:px-4'>
                <div>
                    <h2 className='text-5xl'>Welcome {auth.first_name}</h2>
                </div>
                <div className='grid grid-cols-4 gap-2 my-4 mt-10 gap-x-8 gap-y-4'>
                    <div className='flex flex-col flex-wrap w-full px-6 py-8 bg-white border rounded-lg shadow hover:bg-blue-300 hover:text-white hover:opacity-100'>
                        <span className='text-lg font-bold'>{dashboard['todayapplications']}</span>
                        <span className='opacity-50'>Application Today</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-full px-6 py-8 bg-white border rounded-lg shadow hover:bg-blue-300 hover:text-white hover:opacity-100'>
                        <span className='text-lg font-bold'>{dashboard.underreview}</span>
                        <span className='opacity-50'>Under Review</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-full px-6 py-8 bg-white border rounded-lg shadow hover:bg-blue-300 hover:text-white hover:opacity-100'>
                        <span className='text-lg font-bold'>{dashboard['paymentdue']}</span>
                        <span className='opacity-50'>Leads-Payment Pending</span>

                    </div>
                    <div className='flex flex-col flex-wrap w-full px-6 py-8 bg-white border rounded-lg shadow hover:bg-blue-300 hover:text-white hover:opacity-100'>
                        <span className='text-lg font-bold'>{dashboard.inprogress}</span>
                        <span className='opacity-50'>Application in progress</span>

                    </div>
                </div>
            </div>}</main>

        </AuthenticatedLayout>
    );
}
