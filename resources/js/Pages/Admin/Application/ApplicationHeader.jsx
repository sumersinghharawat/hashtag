import { Link } from '@inertiajs/react';
import * as React from 'react';

export const ApplicationHeader = ({company_id, rejected_fields_count}) => {
    return (
        <>
        <ul className="flex flex-wrap mt-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="me-2">
                <Link href={route('admin.dashboard.viewrequestinformation', company_id)} className={"inline-block p-4 rounded-t-lg " +(route().current('admin.dashboard.viewrequestinformation')?"text-primary border":"text-gray-400")}>General Information</Link>
            </li>
            <li className="me-2">
                <Link href={route('admin.dashboard.viewrequestdocument', company_id)} className={"inline-block p-4 rounded-t-lg " +(route().current('admin.dashboard.viewrequestdocument')?"text-primary border":"text-gray-400")}>General Documents</Link>
            </li>
            <li className="me-2">
            {/* Shareholders */}
                <Link href={route('admin.dashboard.viewrequestshareholder', company_id)} className={"inline-block p-4 rounded-t-lg " +(route().current('admin.dashboard.viewrequestshareholder')?"text-primary border":"text-gray-400")}>Shareholders</Link>
            </li>
            {rejected_fields_count == 0?<li className="me-2">
                <Link href={route('admin.dashboard.adminuploaddocumentview', company_id)} className={"inline-block p-4 rounded-t-lg " +(route().current('admin.dashboard.adminuploaddocumentview')?"text-primary border":"text-gray-400")}>Upload Documents</Link>
            </li>:<></>}
        </ul></>
    );
};
