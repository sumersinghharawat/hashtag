import { StepFromLayout } from '@/Pages/Founder/PhaseTwo/Steps/StepFromLayout';
import * as React from 'react';
export const Phase2FormDetails = ({ registration_completed_step, step, children, name }) => {
    return (
        <>
            <div className="flex flex-col w-full gap-4 px-8 align-bottom">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Welcome {name}</h2>
                <p className="flex h-full mt-1 text-sm align-bottom"><b>Completed Steps : </b>  {registration_completed_step}/12</p>
            </div>
            <div className="relative grid justify-between w-full h-full grid-flow-row grid-cols-3 gap-16 p-8">
                <div className="sticky top-0 w-full h-full cursor-pointer auto-cols-auto md:justify-start md:flex-row md:bg-white md:p-10 rounded-3xl">
                    <div className="flex flex-col">
                        <StepFromLayout filledSteps={registration_completed_step} step={step} />
                    </div>
                </div>
                <div className="sticky top-0 w-full h-full grid-flow-col col-span-2 overflow-hidden md:justify-start md:flex-col rounded-3xl">
                    <div className="p-8">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
