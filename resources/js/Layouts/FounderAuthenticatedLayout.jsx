import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import addmore from '../Icons/add-more.svg';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';

export default function FounderAuthenticated({ user, header, children, company_count }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen pt-4">
            <nav className="container w-auto mx-4 bg-white md:mx-auto rounded-3xl">
                <div className="px-4 mx-auto sm:px-6 lg:px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center justify-between w-full shrink-0">
                                <Link href="/">
                                    <ApplicationLogoDark className="block object-contain w-64 h-12 text-gray-800 fill-current" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-end w-full h-full gap-4">
                            {company_count?<><div className='w-auto'>
                                <NavLink href={route('founder.dashboard.index')} active={route().current('founder.dashboard.index')} className='focus:border-0 active:text-primary'>Dashboard</NavLink>
                            </div>
                            <div className='w-auto'>
                                <NavLink href={route('founder.dashboard.applications')} active={route().current('founder.dashboard.applications')} className='focus:border-0 active:text-primary'>My Applications</NavLink>
                            </div>
                            <div className='w-auto'>
                                <NavLink href={route('founder.dashboard.support')} active={route().current('founder.dashboard.support')} className='focus:border-0 active:text-primary'>Support</NavLink>
                            </div>
                            <div className='w-auto'>
                                <NavLink href={route('founder.dashboard.applications')} active={route().current('founder.dashboard.applications')} className='focus:border-0 active:text-primary'><img src={addmore} style={{marginTop:4,height:16,width:16}} /></NavLink>
                            </div></>:<></>}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('founder.dashboard.editprofile')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                            >
                                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('founder.dashboard')} active={route().current('founder.dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>



            <main>{children}</main>
        </div>
    );
}
