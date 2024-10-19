import * as React from 'react';
import { ApplicationHeader } from './ApplicationHeader';
export const ApplicationLayout = ({children, company_id, rejected_fields_count}) => {
    return (
        <div className="w-full">
            <ApplicationHeader company_id={company_id} rejected_fields_count={rejected_fields_count} />
            {children}
        </div>
    );
};
