import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import guestBanner from '../images/guest-banner.png';

export default function Guest({ children }) {
    return (
        <div className="container flex items-center w-full h-screen mx-auto">
            <div className="flex items-center w-full overflow-hidden lg:w-6/12" style={{maxHeight:"700px"}}>
                <img src={guestBanner} className="guest-image rounded-3xl" />
            </div>
            <div className="w-full lg:w-6/12">
                <div className='w-full mx-auto' style={{maxWidth:"440px"}}>
                    <div className="flex justify-center">
                        <Link href="/">
                            <ApplicationLogo className="h-20" />
                        </Link>
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
