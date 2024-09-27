import CustomerDashboard from "@/Pages/CustomerDashboard";
export default function ViewLastPendingForm({ auth, request }) {
    return (
        <CustomerDashboard auth={auth}>
            <div className="flex w-full gap-4 px-8 align-bottom">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Welcome {auth.user.name}</h2>
                <p className="flex h-full mt-1 text-sm align-bottom"><b>Documents to Upload:</b> 8/10</p>
            </div>
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
