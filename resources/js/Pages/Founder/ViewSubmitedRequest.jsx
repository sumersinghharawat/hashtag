import CustomerDashboard from "@/Pages/CustomerDashboard";
export default function ViewSubmitedRequest({ auth, request }) {

    return (
        <CustomerDashboard auth={auth}>
            <div className="p-10">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                    <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">Personal details and application.</p>
                </div>
                <div className="p-4 mt-6 border border-gray-300">
                    <dl className="divide-y divide-gray-300">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Applicant Status</dt>
                            {request.status==null?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-max px-6 border-gray-500 bg-gray-200 font-bold p-2 rounded-xl text-gray-500"}>Application not completed</dd>:<></>}
                            {request.status==0?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-max px-6 border-gray-500 bg-gray-200 font-bold p-2 rounded-xl text-gray-600"}>Payment Due</dd>:<></>}
                            {request.status==1?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-max px-6 border-gray-500 bg-gray-200 font-bold p-2 rounded-xl text-gray-600"}>Under Review</dd>:<></>}
                            {request.status==2?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-max px-6 border-yellow-500 bg-yellow-100 font-bold p-2 rounded-xl text-yellow-500"}>In Progress</dd>:<></>}
                            {request.status==3?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-max px-6 border-green-500 bg-green-100 font-bold p-2 rounded-xl text-green-500"}>Completed</dd>:<></>}
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company name 1</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.company_name_1}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company name 2</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.company_name_2}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Company name 3</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.company_name_3}</dd>
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
                                <ul role="list" className="">
                                    {request.founders.map((founder)=>{

                                    return <li className="flex items-start justify-between py-4 pr-5 text-sm leading-6">
                                        <div className="flex items-center flex-1 w-0">
                                            <div className="flex flex-1 min-w-0 gap-2 ml-4">
                                                <span className="font-bold truncate">{founder.first_name}</span>
                                                <span className="font-bold truncate">{founder.last_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="flex flex-1 min-w-0 gap-2">
                                                <span className="font-medium truncate">Manager</span>:
                                                <span className="font-medium truncate">{founder.manager?'Yes':'No'}</span>
                                            </div>
                                            <div className="flex flex-1 min-w-0 gap-2">
                                                <span className="font-medium truncate">Ownership Percentage</span>:
                                                <span className="font-medium truncate">{founder.ownership_percentage}%</span>
                                            </div>
                                            <div className="flex flex-1 min-w-0 gap-2">
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
