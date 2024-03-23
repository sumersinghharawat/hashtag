import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ dropdown, className = '',name,selectedvalue, value,isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {

        console.log(selectedvalue);
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
        {...props}
            id="country"
            className={
                'w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            name={name}
            ref={input}
            value={selectedvalue}
            >
            {dropdown?<>
            {dropdown.map((element) => {

                return element.name?<option key={element.name || element.value} value={element.value!=null?element.value:element.name} >
                    {element.name}
                </option>:<></>
            })}</>:<></>}
        </select>
    );
});
