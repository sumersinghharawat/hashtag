import StepFormLayout from "@/Layouts/StepFormLayout";
import CustomerDashboard from "@/Pages/CustomerDashboard";

export default function CompanyName({company_info, auth}){
    return (
        <CustomerDashboard company_info={company_info} auth={auth}>
            <StepFormLayout>
                asdfafd
                Company Name
            </StepFormLayout>
        </CustomerDashboard>
    );
};
