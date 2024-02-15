import WhatsappIcons from "@/Icons/Whatsapp";
import { Link } from "@inertiajs/react";

export default function StepFormLayout({props, children,step}){


    const onChangeStep = (e) => {
        const Changestep = e.target.value;

        if(Changestep == 1) {
                console.log(Changestep);
                location.replace(route('founder.dashboard.companyname'));
        }

        if(Changestep == 2) {
                console.log(Changestep);
                location.replace(route('founder.dashboard.companydetails'));
        }

        if(Changestep == 3) {
            console.log(Changestep);
            location.replace(route('founder.dashboard.foundersdetail'));
        }
    }


    return (
        <div className="flex flex-row">
            <div className="flex flex-col justify-between w-1/5 p-6 border-r-2 border-gray-200">
                <div className="mb-10">
                    <h2 className="text-left text-gray-500 uppercase">Onboarding</h2>
                    <div className="mt-2 space-y-6">
                        <div className="flex items-center gap-x-3">
                            <input id="push-everything" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600" onChange={onChangeStep} checked={step==1?true:false} value={1} disabled={step>=1?false:true}/>
                            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input id="push-email" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600" onChange={onChangeStep} checked={step==2?true:false} value={2} disabled={step>=2?false:true}/>
                            <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">Company Details</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input id="push-nothing" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600" onChange={onChangeStep} checked={step==3?true:false} value={3} disabled={step>=3?false:true}/>
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Founders</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input id="push-nothing" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600"  onChange={onChangeStep} checked={step==4?true:false} value={4} disabled={step>=4?false:true}/>
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Visa</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input id="push-nothing" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600" onChange={onChangeStep} checked={step==5?true:false} value={5} disabled={step>=5?false:true}/>
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Summary</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input id="push-nothing" name="push-notifications" type="radio" className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-600" onChange={onChangeStep} checked={step==6?true:false} value={6} disabled={step>=6?false:true}/>
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Pay</label>
                        </div>
                    </div>
                </div>
                <div className="information">
                    <h2 className="font-bold">Need help?</h2>
                    <p className="pb-4">Get in touch with us over WhatsApp to get instant help</p>
                    <button type="button" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"><WhatsappIcons color={'#fff'} height={'12'} width={'12'}/> Contact Us</button>
                </div>
            </div>
            <div className="w-4/5 p-6">
                {children}
            </div>
        </div>
    );
};
