import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import FounderAuthenticated from '@/Layouts/FounderAuthenticatedLayout';

export default function FounderEdit({ auth, mustVerifyEmail, status, profileUser=null, company_count }) {
    return (
        <FounderAuthenticated
            user={auth.user}
            company_count={company_count}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-4">
                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" profileUser={profileUser}/>
                    </div>
                </div>
            </div>
        </FounderAuthenticated>
    );
}
