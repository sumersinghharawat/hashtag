import * as React from 'react';
import { ApplicationHeader } from './ApplicationHeader';
export const ApplicationLayout = ({children, company_id}) => {
    return (
        <div className="w-full">
            <ApplicationHeader company_id={company_id} />
            {children}
        </div>
    );
};
