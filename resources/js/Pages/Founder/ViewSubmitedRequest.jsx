import Steps from "@/Layouts/Steps";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { Progress } from "flowbite-react";
export default function ViewSubmitedRequest({ auth, request }) {


    return (
        <CustomerDashboard auth={auth}>
            <div className="relative flex flex-col w-full h-full p-8 md:flex-row">
                <div className="sticky top-0 flex flex-col justify-between w-full md:justify-start md:flex-row md:bg-white md:p-10 h-min rounded-3xl" style={{ maxWidth: "410px" }}>
                    <div className="flex flex-col-reverse w-full mb-8 md:flex-col">
                        <div className="mt-4 md:mb-8">
                            <div className="pb-2 text-gray-400">% To Complete</div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
};
