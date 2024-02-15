import CustomerDashboard from "@/Pages/CustomerDashboard";
export default function ViewSubmitedRequest({ auth, request }) {

    console.log(request);

    return (
        <CustomerDashboard auth={auth}>
            <div className="p-10">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                    <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">Personal details and application.</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Applicant Status</dt>
                            <dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-yellow-500 bg-yellow-100 font-bold p-2 rounded-xl "+(request.status==1?"text-yellow-500":"")}>{request.status==1?'Pending for Review':''}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company Industry</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.industry}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company Description</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {request.description}
                            </dd>
                        </div>
                        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company Email</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                        </div> */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Founders</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="border border-gray-200 divide-y divide-gray-100 rounded-md">
                                    {request.founders.map((founder)=>{

                                    return <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex items-center flex-1 w-0">
                                            <div className="flex flex-1 min-w-0 gap-2 ml-4">
                                                <span className="font-medium truncate">{founder.first_name}</span>
                                                <span className="font-medium truncate">{founder.last_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            <div className="flex flex-1 min-w-0 gap-2 ml-4">
                                                <span className="font-medium truncate">Manager</span>:
                                                <span className="font-medium truncate">{founder.manager?'Yes':'No'}</span>
                                            </div>
                                            <div className="flex flex-1 min-w-0 gap-2 ml-4">
                                                <span className="font-medium truncate">Ownership Percentage</span>:
                                                <span className="font-medium truncate">{founder.ownership_percentage}%</span>
                                            </div>
                                            <div className="flex flex-1 min-w-0 gap-2 ml-4">
                                                <span className="font-medium truncate">Visa Require</span>:
                                                <span className="font-medium truncate">{founder.visa_status?'Yes':'No'}</span>
                                            </div>
                                        </div>
                                    </li>})}
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </CustomerDashboard>
    );
};
