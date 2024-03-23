import SelectInput from "@/Components/SelectInput";
import Dashboard from "@/Pages/Dashboard";
import { useForm } from "@inertiajs/react";
export default function ViewSubmitedRequest({ auth, request }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_status: request.status?request.status:'',
        company_id: request.id
    });

    console.log(request);

    var selectOption = [
        {name:'Under Review',value:1},
        {name:'In Progress',value:2},
        {name:'Completed',value:3}
    ]

    const ChangeStatus = (e) => {
        data.company_status = e.target.value;
        post(route('admin.dashboard.viewrequeststore',{'id':request.id}));
    }

    return (
        <Dashboard auth={auth.user}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-10">
                            <div className="flex justify-between px-4 sm:px-0">
                                <div className="w-4/5">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                                    <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">Personal details and application.</p>
                                </div>
                                {(request.status!=0 && request.status!=null)?<div className="w-1/5">
                                    <form>
                                        <input type="hidden" name="company_id" value={data.company_id} />
                                        <SelectInput dropdown={selectOption} selectedvalue={data.company_status} onChange={ChangeStatus}></SelectInput>
                                    </form>
                                </div>:<></>}
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Applicant Status</dt>
                                        {request.status==null?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-gray-500 bg-gray-100 font-bold p-2 rounded-xl text-gray-500"}>Application not completed</dd>:<></>}
                                        {request.status==0?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-gray-500 bg-gray-100 font-bold p-2 rounded-xl text-gray-500"}>Payment Due</dd>:<></>}
                                        {request.status==1?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-gray-500 bg-gray-100 font-bold p-2 rounded-xl text-gray-500"}>Under Review</dd>:<></>}
                                        {request.status==2?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-yellow-500 bg-yellow-100 font-bold p-2 rounded-xl text-yellow-500"}>In Progress</dd>:<></>}
                                        {request.status==3?<dd className={"mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 border w-auth border-green-500 bg-green-100 font-bold p-2 rounded-xl text-green-500"}>Completed</dd>:<></>}
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Company name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.name?request.name:'pending'}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Company Contact</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{(request.founders.length!=0 && request.founders[0].mobile_number!=null)?request.founders[0].mobile_number:'pending'}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Company Industry</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{request.industry?request.industry:'pending'}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Company Description</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {request.description?request.description:'pending'}
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
                                                {request.founders.map((founder,index)=>{

                                                return <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <div className="flex items-center flex-1 w-0">
                                                        <div className="flex flex-wrap min-w-0 gap-2 ml-4">
                                                            <span className="w-full font-medium truncate">{founder.first_name} {founder.last_name}</span>
                                                            <span className="w-full font-medium truncate">{founder.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 align-top flex-shrink-2">
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
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};
