import ApplicationLogo from '@/Components/ApplicationLogoLight';
import { Link } from '@inertiajs/react';
import guestBanner from '../images/guest-banner.png';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';

export default function Guest({ children }) {
    return (
        <div className="container flex items-center w-full h-screen mx-auto">
            <div className="items-center hidden w-full overflow-hidden md:flex lg:w-6/12" style={{maxHeight:"700px"}}>
                <img src={guestBanner} className="guest-image rounded-3xl" />
            </div>
            <div className="w-full lg:w-6/12">
                <div className='w-full mx-auto' style={{maxWidth:"440px"}}>
                    <div className="flex justify-center">
                        <Link href="/">
                            <ApplicationLogoDark className="h-20" />
                        </Link>
                    </div>
                    <div className="w-full px-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
