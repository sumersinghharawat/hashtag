import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Progress } from "@material-tailwind/react";
import * as React from 'react';

export const StepFromLayout = ({filledSteps, step, company_id}) => {

    const [formCompletion, setFormCompletion] = React.useState(0);
    const [formCompletionNumber, setFormCompletionNumber] = React.useState(0);
    const [formStep, setFormStep] = React.useState(0);

    const StepsDetails = [
        {
            key: 0,
            step: 7,
            title: "General Information"
        },
        {
            key: 1,
            step: 8,
            title: "General Documents"
        },
        {
            key: 2,
            step: 9,
            title: "Shareholder Details"
        },
        {
            key: 3,
            step: 10,
            title: "License Fees"
        },
        {
            key: 4,
            step: 11,
            title: "Application Review"
        },
        {
            key: 5,
            step: 12,
            title: "Company License"
        }
    ];

    React.useEffect(() => {
        let completion = 0;
        let completionNumber = 0;

        if (filledSteps == 7) {
            completion = 10;
            completionNumber = 90;
        }

        if (filledSteps == 8) {
            completion = 25;
            completionNumber = 75;
        }

        if (filledSteps == 9) {
            completion = 40;
            completionNumber = 60;
        }

        if (filledSteps == 10) {
            completion = 55;
            completionNumber = 45;
        }

        if (filledSteps == 11) {
            completion = 70;
            completionNumber = 30;
        }

        if (filledSteps == 12) {
            completion = 85;
            completionNumber = 15;
        }

        setFormCompletion(completion);
        setFormCompletionNumber(completionNumber);
    });


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

    return (
        <><h2 className='text-xl'>{(StepsDetails[step])?(StepsDetails[step].title):''}</h2><div className='flex justify-between w-full mt-2 md:flex-col md:space-y-6'>{StepsDetails.map((element,index)=>{

            return <div key={element.key}>{(filledSteps>=element.step)?<div key={step} className={"relative flex flex-col gap-x-3" + (filledSteps >= element.step ? " cursor-pointer" : "") + (step == element.step? " active-tab-mobile":" tab-mobile")} onClick={()=>{ ChangeStep(); setFormStep(element.step)}}>
                <label htmlFor="push-everything" className="flex text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==12?" step-form-last-child":"")}>
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
                    <div className={"step-form-radio" + ((filledSteps >= element.step) ? " filed" : "") + (step == element.step ? " current" : "")+(element.step==12?" step-form-last-child":"")}>
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
