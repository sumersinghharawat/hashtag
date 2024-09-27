// @flow
import * as React from 'react';
import addMore from '../Icons/add-more.svg';

export const ApplicationCard = ({children, props}) => {
    return (
        <div className="relative top-0 flex flex-col justify-between w-full h-full cursor-pointer md:justify-start md:flex-row md:bg-white rounded-3xl">
            <div className="flex justify-center w-full align-middle">
                <div className="w-full m-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
