import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@inertiajs/react';
import { setIsInitial } from '@material-tailwind/react/components/Tabs/TabsContext';
import * as React from 'react';
export default function Steps({filledSteps,step}) {

    const StepsDetails = [
        {
            step:1,
            title:"Company Name"
        },
        {
            step:2,
            title:"Company Details"
        },
        {
            step:3,
            title:"Founders"
        },
        {
            step:4,
            title:"Visa"
        },
        {
            step:5,
            title:"Summary"
        },
        {
            step:6,
            title:"Pay"
        }
    ];

    const [formStep, setFormStep] = React.useState(0);



    const ChangeStep = () => {
        switch (formStep) {
            case 1:
                router.get(route('founder.dashboard.companyname'));
                break;
            case 2:
                router.get(route('founder.dashboard.companydetails'));
                break;
            case 3:
                router.get(route('founder.dashboard.foundersdetail'));
                break;
            case 4:
                router.get(route('founder.dashboard.foundersvisa'));
                break;
            case 5:
                router.get(route('founder.dashboard.summary'));
                break;
            case 6:
                router.get(route('founder.dashboard.paynow'));
                break;

            default:
                break;
        }
    }

    React.useEffect(()=>{

    },[formStep])

    return (
            <>{StepsDetails.map((element,index)=>{

            return <>{(filledSteps>=element.step)?<div className={"relative flex flex-col gap-x-3" + (filledSteps >= element.step ? " cursor-pointer" : "")} onClick={()=>{ ChangeStep(); setFormStep(element.step)}}>
                <label htmlFor="push-everything" className="flex text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==6?" step-form-last-child":"")}>
                        {(filledSteps >= element.step && step != element.step) ? <FontAwesomeIcon style={{ fontSize: "12px" }} className='mx-3' icon={faCheck} /> : <></>}
                    </div>
                    <input id="push-everything" name="push-notifications" type="radio" className="hidden w-4 h-4" checked={step == element.step ? true : false} value={element.step} disabled={step >= element.step ? false : true} onChange={() => false} />
                    <div className={"flex flex-col" + (step != element.step ? " opacity-50" : "")}>
                        <span className="text-sm text-gray-500">Step {element.step}</span>
                        <span className="text-lg font-medium">{element.title}</span>
                    </div>
                </label>
            </div>:<div key={index} className={"relative flex flex-col gap-x-3 pointer-events-none" + (filledSteps >= element.step ? " cursor-pointer" : "")} >
                <label htmlFor="push-everything" className="flex text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==6?" step-form-last-child":"")}>
                        {(filledSteps >= element.step && step != element.step) ? <FontAwesomeIcon style={{ fontSize: "12px" }} className='mx-3' icon={faCheck} /> : <></>}
                    </div>
                    <input id="push-everything" name="push-notifications" type="radio" className="hidden w-4 h-4" checked={step == element.step ? true : false} value={element.step} disabled={step >= element.step ? false : true} onChange={() => false} />
                    <div className={"flex flex-col" + (step != element.step ? " opacity-50" : "")}>
                        <span className="text-sm text-gray-500">Step {element.step}</span>
                        <span className="text-lg font-medium">{element.title}</span>
                    </div>
                </label>
            </div>}</>
            })}</>
    );
};
