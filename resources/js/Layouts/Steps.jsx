import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@inertiajs/react';
import { setIsInitial } from '@material-tailwind/react/components/Tabs/TabsContext';
import * as React from 'react';
export default function Steps({filledSteps,step, company_id}) {

    const StepsDetails = [
        {
            key:0,
            step:1,
            title:"Company Name"
        },
        {
            key:1,
            step:2,
            title:"Company Details"
        },
        {
            key:2,
            step:3,
            title:"Founders"
        },
        {
            key:3,
            step:4,
            title:"Visa"
        },
        {
            key:4,
            step:5,
            title:"Summary"
        },
        {
            key:5,
            step:6,
            title:"Pay"
        }
    ];

    const [formStep, setFormStep] = React.useState(0);



    const ChangeStep = () => {
        switch (formStep) {
            case 1:
                if(company_id){
                    router.get(route('founder.dashboard.companynameupdate',company_id));
                }else{
                    router.get(route('founder.dashboard.companyname'));
                }

                break;
            case 2:
                router.get(route('founder.dashboard.companydetails',company_id));
                break;
            case 3:
                router.get(route('founder.dashboard.foundersdetail',company_id));
                break;
            case 4:
                router.get(route('founder.dashboard.foundersvisa',company_id));
                break;
            case 5:
                router.get(route('founder.dashboard.summary',company_id));
                break;
            case 6:
                router.get(route('founder.dashboard.paynow',company_id));
                break;

            default:
                break;
        }
    }

    React.useEffect(()=>{

    },[formStep])

    return (
            <><h2 className='text-xl'>{(StepsDetails[step])?(StepsDetails[step].title):''}</h2><div className='flex justify-between w-full mt-2 md:flex-col md:space-y-6'>{StepsDetails.map((element,index)=>{

            return <div key={element.key}>{(filledSteps>=element.step)?<div key={step} className={"relative flex flex-col gap-x-3" + (filledSteps >= element.step ? " cursor-pointer" : "") + (step == element.step? " active-tab-mobile":" tab-mobile")} onClick={()=>{ ChangeStep(); setFormStep(element.step)}}>
                <label htmlFor="push-everything" className="flex text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==6?" step-form-last-child":"")}>
                        {(filledSteps >= element.step && step != element.step) ? <FontAwesomeIcon style={{ fontSize: "12px" }} className='mx-3' icon={faCheck} /> : <></>}
                    </div>
                    <input id="push-everything" name="push-notifications" type="radio" className="hidden w-4 h-4" checked={step == element.step ? true : false} value={element.step} disabled={step >= element.step ? false : true} onChange={() => false} />
                    <div className={"flex flex-col form-tab-title" + (step != element.step ? " opacity-50" : "")}>
                        <span className="text-sm text-gray-500">Step {element.step}</span>
                        <span className="text-lg font-medium">{element.title}</span>
                    </div>
                </label>
            </div>:<div key={index} className={"relative flex flex-col gap-x-3 pointer-events-none" + (filledSteps >= element.step ? " cursor-pointer" : "") + (step == element.step? " active-tab-mobile":" tab-mobile")} >
                <label htmlFor="push-everything" className="flex text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==6?" step-form-last-child":"")}>
                        {(filledSteps >= element.step && step != element.step) ? <FontAwesomeIcon style={{ fontSize: "12px" }} className='mx-3' icon={faCheck} /> : <></>}
                    </div>
                    <input id="push-everything" name="push-notifications" type="radio" className="hidden w-4 h-4" checked={step == element.step ? true : false} value={element.step} disabled={step >= element.step ? false : true} onChange={() => false} />
                    <div className={"flex flex-col form-tab-title" + (step != element.step ? " opacity-50" : "")}>
                        <span className="text-sm text-gray-500">Step {element.step}</span>
                        <span className="text-lg font-medium">{element.title}</span>
                    </div>
                </label>
            </div>}</div>
            })}</div></>
    );
};
