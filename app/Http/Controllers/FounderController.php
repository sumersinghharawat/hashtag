<?php

namespace App\Http\Controllers;

use App\Models\ApplicationVarification;
use App\Models\Company;
use App\Models\Document;
use App\Models\Education;
use App\Models\FormSubmission;
use App\Models\Founder;
use App\Models\JobTitle;
use App\Models\User;
use App\Rules\UniqueNameCombination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;


class FounderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();

        $companyRegistrationList = Company::where(['user_id'=>$user->id])->get();


            if(count($companyRegistrationList) >= 1){
                return redirect(route('founder.dashboard.index'));
                // return Inertia::render('Founder/Dashboard/Dashboard',['user'=>$user, 'companyRegistrationList'=>$companyRegistrationList]);
            }else{
                if($user->country_of_residenace == null){
                    return redirect(route('founder.dashboard.letsbegin'));
                }
            }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function founderstore(Request $request, $id)
    {
        //

        $user = Auth::user();

        $request->validate([
            'first_name' => ['required','string','max:255',new UniqueNameCombination],
        ]);

        $company = Company::where(['user_id'=>$user->id, 'id'=>$id])->first();

        Founder::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name?$request->last_name:"",
            'user_id' => $user->id,
            'company_id' => $company->id
        ]);

        // return redirect('/founder/foundersdetail');
        // return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>$step,'founders'=>$founders]);

    }

    /**
     * Display the specified resource.
     */
    public function applications(Founder $founder)
    {
        //
        $user = Auth::user();
        $TotalForms = Company::where(['user_id'=>$user->id])->get();

        foreach($TotalForms as $TotalForm){
            $TotalForm['stakeholders'] = Founder::where(['user_id'=>$user->id, 'company_id'=>$TotalForm->id])->count();
            $TotalForm['founders'] = Founder::where(['user_id'=>$user->id, 'company_id'=>$TotalForm->id])
                ->whereNotIn('manager', ['No Manager'])
                ->count();
            $TotalForm['visas'] = Founder::where(['user_id'=>$user->id, 'company_id'=>$TotalForm->id, 'visa_status'=>1])->count();
            $TotalForm['uploaded_document_count'] = Document::where(['company_id'=>$TotalForm->id])->whereIn('document_type',['Business Plan', 'Other Document', 'Valid Passport Copy', 'UAE Visa Page', 'Address Proof Copy', 'Educational Qualification'])->count();

            $TotalForm['document_count'] = ($TotalForm['stakeholders']*4)+($TotalForm['visas']);

            $TotalForm['rejected_document_count'] = ApplicationVarification::where(['company_id'=>$TotalForm->id, 'varification_status'=>'Rejected'])->count();

            $formStep = $this->CheckFormSteps($TotalForm->id);

            $TotalForm['id'] = $TotalForm->id;
            $TotalForm['step'] = $formStep['step'];
            $TotalForm['next_step'] = $formStep['next_step'];
            $TotalForm['route'] = $formStep['route'];
        }

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/Dashboard/Applications',['auth' => ["user"=>$user],"companies"=>$TotalForms, 'company_count'=>$companyRegistrationCount]);
    }

    public function support(){

        $user = Auth::user();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/Dashboard/Support',['auth' => ["user"=>$user], 'company_count'=>$companyRegistrationCount]);
    }

    function CheckFormSteps($company_id){
        $user = Auth::user();
        $formStep = [];
        $company = Company::where(['id'=>$company_id])->first();

        if(empty($company->company_name_1)){
            $formStep['step'] = 1;
            $formStep['next_step'] = 'Continue';
            $formStep['route'] = 'founder.dashboard.companyname';
        }

        if(!empty($company->company_name_1) && empty($company->industry)){
            $formStep['step'] = 2;
            $formStep['next_step'] = 'Continue';
            $formStep['route'] = 'founder.dashboard.companydetails';
        }

        $founder = Founder::where(['company_id'=>$company_id, 'user_id'=>$user->id])->first();

        if($founder){

            if($founder->visa_status == null){
                $formStep['step'] = 4;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.foundersvisa';
            }


            if($founder->visa_status !== null && $company->first_payment_status === 'pending'){
                $formStep['step'] = 5;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.summary';
            }


            if($company->first_payment_status === 'pending'){
                $formStep['step'] = 6;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.paynow';
            }

            if($company->first_payment_status === 'success'){
                $formStep['step'] = 6;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.review-registration';
            }

            if($company->first_payment_status === 'success'){
                $formStep['step'] = 6;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.review-registration';
            }

            $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_id);

            if($last_step == 7 && $company->first_payment_status === 'success'){
                $formStep['step'] = $last_step;
                $formStep['next_step'] = 'Upload Documents';
                $formStep['route'] = 'founder.dashboard.general-document';
            }

            $business_plan = Document::where(['document_type'=>'Business Plan', 'company_id'=>$company_id])->first();
            if($business_plan && $company->first_payment_status === 'success'){
                $formStep['step'] = 9;
                $formStep['next_step'] = 'Upload Documents';
                $formStep['route'] = 'founder.dashboard.shareholder-details';
            }

            if($last_step == 9 && $company->first_payment_status === 'success'){
                $formStep['step'] = $last_step;
                $formStep['next_step'] = 'Upload Documents';
                $formStep['route'] = 'founder.dashboard.final-payment';
            }

            if($last_step == 10 && $company->first_payment_status === 'success'){
                $formStep['step'] = $last_step;
                $formStep['next_step'] = 'Upload Documents';
                $formStep['route'] = 'founder.dashboard.final-review';
            }

            if($last_step == 11 && $company->first_payment_status === 'success'){
                $formStep['step'] = $last_step;
                $formStep['next_step'] = 'Download License';
                $formStep['route'] = 'founder.dashboard.download-trade-license';
            }

        }else{

            if(empty($founder->ownership_percentage) && !empty($company->industry)){
                $formStep['step'] = 3;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.foundersdetail';
            }
        }

        return $formStep;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Founder $founder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Founder $founder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Founder $founder)
    {
        //
    }

    // Delete founders from founder table by founder_id & company_id
    public function founderdelete(Request $request, $id, $founder_id){
        if(Founder::where(['id'=>$founder_id, 'company_id'=>$id])->delete()){
            return redirect(route('founder.dashboard.foundersdetail', ['id'=>$id]));
        }
    }

    // Delete founders from founder table by founder_id & company_id
    public function founderdeletephase2(Request $request, $id, $founder_id){
        if(Founder::where(['id'=>$founder_id, 'company_id'=>$id])->delete()){
            return redirect(route('founder.dashboard.review-registration', ['id'=>$id]));
        }
    }

    public function letsbegin(){

        $user = Auth::user();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/LetsBegin',['auth' => ["user"=>$user], 'company_count'=>$companyRegistrationCount]);

    }

    public function letsbeginstore(Request $request){

        $user = Auth::user();

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'max:255',
            'mobile_number' => 'required|string|max:15',
            'country_of_residenace' => 'required|string',
        ]);

        $auth = User::where(['id'=>$user->id])->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'mobile_number' => $request->mobile_number,
            'country_of_residenace' => $request->country_of_residenace
        ]);

        return redirect(route('founder.dashboard.companyname'));
    }

    public function foundersdetail($id){

        $user = Auth::user();

        $step = 3;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $company_info = Company::where(['id'=>$id])->first();

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $totalSplits = 0;

        foreach($founders as $founder){
            $totalSplits = $totalSplits + $founder->ownership_percentage;
        }

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'totalSplits'=>fn () => $totalSplits, 'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);

    }

    public function founderssplitstore(Request $request, $id){
        $founder_list = $request->founder_list;

        $user = Auth::user();

        $step = 3;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        foreach ($founder_list as $founder_list_Key => $founder_list_value) {
            # code...
            Founder::where(['id' => $founder_list_value['id']])->update([
                'manager' => $founder_list_value['manager'],
                'ownership_percentage' => $founder_list_value['ownership_percentage'],
            ]);
        }

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company founders updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company founders added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.foundersvisa', ['id'=>$id]));

    }

    public function foundersvisa($id){

        $user = Auth::user();

        $step = 4;

        $founders = Founder::where(['user_id'=>$user->id,'company_id'=>$id])->get();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $company_info = Company::where(['id'=>$id])->first();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/StepsForm/FounderVisa',['step'=>fn () => $step,'foundersList'=>fn () => $founders,  'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);

    }

    public function foundersvisastore(Request $request, $id){
        $founders_list = $request->founders_list;

        if($request->visastatus){
            foreach ($founders_list as $founders_listKey => $founders_listValue) {
                # code...
                Founder::where(['id'=>$founders_listValue['id']])->update([
                    'visa_status'=>$founders_listValue['visa_status'],
                ]);
            }
        }else{
            foreach ($founders_list as $founders_listKey => $founders_listValue) {
                # code...
                Founder::where(['id'=>$founders_listValue['id']])->update([
                    'visa_status'=>0,
                ]);
            }
        }

        $user = Auth::user();

        $step = 4;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company founders visa status updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company founders visa status added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.summary', ['id'=>$id]));
    }

    public function summary($id){

        $user = Auth::user();

        $step = 5;

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $company_info = Company::where(['user_id'=>$user->id, 'id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company phase 1 updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company phase 1 added by customer','step'=>$step]);
        }

        return Inertia::render('Founder/StepsForm/Summary',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'company_info'=>fn () => $company_info, 'registration_completed_step'=>$last_step, 'company_count'=>$companyRegistrationCount]);
    }

    public function paynow($id){

        $user = Auth::user();

        $step = 6;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $company_info = Company::where(['user_id'=>$user->id, 'id'=>$id])->first();

        $founders = Founder::where(['user_id'=>$user->id, 'id'=>$id])->get();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/StepsForm/PayNow',['step'=>fn () => $step,'foundersList'=>fn () => $founders, 'company_info'=> $company_info, 'registration_completed_step'=>$last_step, 'company_count'=>$companyRegistrationCount]);
    }

    public function thankyou($id){

        $user = Auth::user();

        $step = 6;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company phase 1 updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company phase 1 added by customer','step'=>$step]);
        }

        Company::where(['user_id'=>$user->id,'id'=>$id])->update(['first_payment_status'=>'success']);

        Company::where(['user_id'=>$user->id,'id'=>$id])->update(['application_status'=>'In Progress']);

        $founders = Founder::where(['user_id'=>$user->id,'id'=>$id])->get();

        return Inertia::render('Founder/StepsForm/ThankYou',['foundersList'=>$founders]);
    }


    public function founderviewsubmitedrequest(){

        $user = Auth::user();

        $company_info = Company::where(['user_id'=>$user->id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Founder/ViewSubmitedRequest',['request'=>$company_info]);
    }

    public function adminviewsubmitedrequeststore(Request $request,$id){

        Company::where(['id'=>$id])->update(['status'=>$request->company_status]);

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        return Inertia::render('Admin/ViewSubmitedRequest',['request'=>$company_info]);
    }


    public function founderviewdashboard(){

        $user = Auth::user();

        $company_info = Company::where(['user_id'=>$user->id])->orderBy('id', 'desc')->first();

        $last_step = 0;

        if($company_info){
            $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);
        }

        if($user->country_of_residenace == null){
            return redirect(route('founder.dashboard.letsbegin'));
        }else{

            $companyRegistration = Company::where(['user_id'=>$user->id])->orderBy('id', 'desc')->get();

            if(count($companyRegistration) == 0){
                return redirect(route('founder.dashboard.companyname'));
            }

            $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

            if($companyRegistrationCount > 1){

                $company_info = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->orderBy('id', 'desc')->first();

                $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

                    // dd("wow");

                    if($last_step >= 6){

                        $company_info = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->orderBy('id', 'desc')->first();

                        $last_step = $last_step + 1;

                        return Inertia::render('Founder/Dashboard/Dashboard',['auth' => fn () => ["user"=>$user],'step'=>$last_step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);

                    }else{

                        // print_r("wow");

                        $company_info = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->orderBy('id', 'desc')->first();

                        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);



                        return Inertia::render('Founder/Dashboard/Dashboard',['auth' => fn () => ["user"=>$user],'step'=>$last_step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);

                    }
            }

            if($companyRegistrationCount == 1){

                $companyRegistration = Company::where(['user_id'=>$user->id])->get();

                $last_step = (new CompanyController)->getCompletedLastStep($user->id, $companyRegistration[0]->id);

                if($last_step == 1){
                    return redirect(route('founder.dashboard.companydetails',$companyRegistration[0]->id));
                }

                if($last_step == 2){
                    return redirect(route('founder.dashboard.foundersdetail',$companyRegistration[0]->id));
                }

                if($last_step == 3){
                    return redirect(route('founder.dashboard.foundersvisa',$companyRegistration[0]->id));
                }

                if($last_step == 4){
                    return redirect(route('founder.dashboard.summary',$companyRegistration[0]->id));
                }

                if($last_step == 5){
                    return redirect(route('founder.dashboard.paynow',$companyRegistration[0]->id));
                }


                if($companyRegistrationCount == 1 && $last_step == 11){

                    $company_info = Company::where(['user_id'=>$user->id, 'application_status'=>'Completed'])->first();

                    $last_step = $last_step + 1;

                    return Inertia::render('Founder/Dashboard/Dashboard',['auth' => fn () => ["user"=>$user],'step'=>$last_step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);
                }



                if($companyRegistrationCount == 1 && $last_step >= 6){

                    $company_info = Company::where(['user_id'=>$user->id, 'id'=> $company_info->id, 'application_status'=>'success'])->first();
                    // $company_info = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->orderBy('id', 'desc')->first();

                    $last_step = $last_step + 1;

                    return Inertia::render('Founder/Dashboard/Dashboard',['auth' => fn () => ["user"=>$user],'step'=>$last_step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);
                }

                // if($last_step == 6){
                    // return redirect(route('founder.dashboard.index',$companyRegistration[0]->id));
                // }
            }

        }

    }

    public function shareholderdetails($id){
        $step = 9;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $job_titles = JobTitle::get();

        $education_qualification = Education::get();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        foreach($founders as $founder){

            $validPassportCopy = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>$founder->id, 'document_type'=>'Valid Passport Copy'])->first();
            $founder->documentValidPassportCopyFileName = $validPassportCopy?basename($validPassportCopy->document_file):null;
            $founder->documentValidPassportCopyFileUrl = $validPassportCopy?asset($validPassportCopy->document_file):null;

            $UAEVisaPage = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>$founder->id, 'document_type'=>'UAE Visa Page'])->first();
            $founder->documentUAEVisaPageFileName = $UAEVisaPage?basename($UAEVisaPage->document_file):null;
            $founder->documentUAEVisaPageFileUrl = $UAEVisaPage?asset($UAEVisaPage->document_file):null;

            $AddressProofCopy = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>$founder->id, 'document_type'=>'Address Proof Copy'])->first();
            $founder->documentAddressProofCopyFileName = $AddressProofCopy?basename($AddressProofCopy->document_file):null;
            $founder->documentAddressProofCopyFileUrl = $AddressProofCopy?asset($AddressProofCopy->document_file):null;

            $educationQualificational = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>$founder->id, 'document_type'=>'Educational Qualification'])->first();
            $founder->documentEducationalQualificationFileName = $educationQualificational?basename($educationQualificational->document_file):null;
            $founder->documentEducationalQualificationFileUrl = $educationQualificational?asset($educationQualificational->document_file):null;

        }

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/PhaseTwo/ShareholderDetails',['auth' => fn () => ["user"=>$user], 'foundersList'=> $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'job_titles'=>$job_titles, 'education_qualification'=>$education_qualification, 'company_count'=>$companyRegistrationCount]);
    }

    public function shareholderdetailsstore(Request $request, $id){

        $request->validate([
            'foundersList.*.manager' => 'required|string',
            'foundersList.*.documentValidPassportCopyFileName' => 'required|string',
            'foundersList.*.documentUAEVisaPageFileName' => 'required|string',
            'foundersList.*.documentAddressProofCopyFileName' => 'required|string',
            'foundersList.*.documentEducationalQualificationFileName' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.visa_status' => 'required|in:1,0,-1',
            'foundersList.*.father_name' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.mother_name' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.country_status' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.religion' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.marital_status' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.job_title' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.educational_qualification' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.basic_salary' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.transportation_allowance' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.accommodation_allowance' => ['required_if:foundersList.*.visa_status,1'],
            'foundersList.*.other_allowances' => ['required_if:foundersList.*.visa_status,1'],
        ],
        [
            'required' => 'The :attribute field is required.',
            'required_if' => "The :attribute field is required when Visa Status is Yes.",
            'string' => 'The :attribute must be a valid string.',
        ], [
            'foundersList.*.father_name' => 'Father\'s Name',
            'foundersList.*.mother_name' => 'Mother\'s Name',
            'foundersList.*.documentValidPassportCopyFileName' => 'Valid Passport Copy',
            'foundersList.*.documentUAEVisaPageFileName' => 'UAE Visa Page',
            'foundersList.*.documentAddressProofCopyFileName' => 'Address Proof Copy',
            'foundersList.*.documentEducationalQualificationFileName' => 'Educational Qualification',
            'foundersList.*.country_status' => 'Country Status',
            'foundersList.*.religion' => 'Religion',
            'foundersList.*.marital_status' => 'Marital Status',
            'foundersList.*.job_title' => 'Job Title',
            'foundersList.*.educational_qualification' => 'Educational Qualification',
            'foundersList.*.basic_salary' => 'Basic Salary',
            'foundersList.*.transportation_allowance' => 'Transportation Allowance',
            'foundersList.*.accommodation_allowance' => 'Accommodation Allowance',
            'foundersList.*.other_allowances' => 'Other Allowances',
        ]);

        // dd($request->foundersList);

        $founders = $request->foundersList;

        foreach($founders as $founder){

            Founder::where(['id' => $founder['id']])->update([
                'manager' => $founder['manager'],
                'visa_status' => $founder['visa_status'],
                'father_name' => $founder['father_name']?$founder['father_name']:null,
                'mother_name' => $founder['mother_name']?$founder['mother_name']:null,
                'country_status' => $founder['country_status']?$founder['country_status']:null,
                'religion' => $founder['religion']?$founder['religion']:null,
                'marital_status' => $founder['marital_status']?$founder['marital_status']:null,
                'job_title' => $founder['job_title']?$founder['job_title']:null,
                'educational_qualification' => $founder['educational_qualification']?$founder['educational_qualification']:null,
                'basic_salary' => $founder['basic_salary']?$founder['basic_salary']:null,
                'transportation_allowance' => $founder['transportation_allowance']?$founder['transportation_allowance']:null,
                'accommodation_allowance' => $founder['accommodation_allowance']?$founder['accommodation_allowance']:null,
                'other_allowances' => $founder['other_allowances']?$founder['other_allowances']:null,
            ]);
        }

        $step = 9;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company shareholder details updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company shareholder details added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.final-payment',$id));
    }

}
