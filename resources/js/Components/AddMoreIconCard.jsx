// @flow
import * as React from 'react';
import addMore from '../Icons/add-more.svg';

export const AddMoreIconCard = (props) => {
    return (
        <div className="sticky top-0 flex flex-col justify-between w-auto h-full cursor-pointer md:justify-start md:flex-row md:bg-white md:p-10 rounded-3xl">
            <div className="flex justify-center align-middle">
                <div className="flex justify-center gap-2 m-8 align-middle">
                    <img src={addMore} style={{height:40,width:40}}/>
                    <div className="flex mt-1 text-lg font-semibold text-black align-middle">{props.title}</div>
                </div>
            </div>
        </div>
    );
};
