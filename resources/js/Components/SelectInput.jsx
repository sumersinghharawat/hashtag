import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ dropdown, selected='', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    console.log(selected);

    useEffect(() => {
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

            ref={input}
            >
            {dropdown?<>
            {dropdown.map((element) => {
                return <option key={element.name || element.name} value={element.name || element.name} >
                    {element.name}
                </option>
            })}</>:<></>}
        </select>
    );
});
