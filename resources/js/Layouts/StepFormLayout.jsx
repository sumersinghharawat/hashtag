import WhatsappIcons from "@/Icons/Whatsapp";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router } from "@inertiajs/react";
import { Progress } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Steps from "./Steps";


export default function StepFormLayout({ props, children, step, filledSteps }) {

    const [formCompletion, setFormCompletion] = useState(0);
    const [formCompletionNumber, setFormCompletionNumber] = useState(0);

    useEffect(() => {
        let completion = 0;
        let completionNumber = 0;

       if(filledSteps == 0){
            completion = 10;
            completionNumber = 90;
       }

       if(filledSteps == 1){
            completion = 25;
            completionNumber = 75;
       }

       if(filledSteps == 2){
            completion = 40;
            completionNumber = 60;
       }

       if(filledSteps == 3){
            completion = 55;
            completionNumber = 45;
       }

       if(filledSteps == 4){
            completion = 70;
            completionNumber = 30;
       }

       if(filledSteps == 5){
            completion = 85;
            completionNumber = 15;
       }

        setFormCompletion(completion);
        setFormCompletionNumber(completionNumber);
    })

    return (
        <div className="flex flex-row">
            <div className="flex flex-col justify-between w-full p-10 bg-white h-min rounded-3xl" style={{ maxWidth: "410px" }}>
                <div className="mb-0">
                    <div className="mb-8">
                        <div className="pb-2 text-gray-400">{parseInt(formCompletionNumber)}% To Complete</div>
                        <Progress value={formCompletion} className="w-full h-2 transition-all progressbar-form" ></Progress>
                    </div>
                    <div className="mt-2 space-y-6">
                        <Steps filledSteps={filledSteps} step={step}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full mx-auto" style={{ maxWidth: "576px" }}>
                <div className="w-full pt-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
