import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FounderAuthenticatedLayout from '@/Layouts/FounderAuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function FounderDashboard({ auth,children,step,company_count }) {
    return (
        <FounderAuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Founder Dashboard</h2>}
            company_count={company_count}
        >
            <Head title="Dashboard" />

            <div className="md:py-12">
                <div className={step==0?"mx-auto container":"mx-auto container"}>
                    <div className="overflow-hidden sm:rounded-lg">
                    {children}
                    </div>
                </div>
            </div>
        </FounderAuthenticatedLayout>
    );
}
