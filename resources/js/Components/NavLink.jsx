import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-transparent text-primary '
                    : 'border-transparent text-gray-500 hover:text-gray-700  ') +
                className
            }
        >
            {children}
        </Link>
    );
}
