<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Http\Controllers\CustomerController;
use App\Models\FormSubmission;
use App\Models\Founder;
use App\Models\Industry;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }

    public function companyformsubmission(){

    }

    public function companyname(Request $request, $id=null){

        $id = $request->id;

        $step = 1;

        $user = Auth::user();

        $company = Company::where(['id'=>$id])->first();

        if($user->country_of_residenace){
            if($company){
                $last_step = $this->getCompletedLastStep($user->id, $id);
                return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step, 'company_id'=>$id, 'company_info'=>$company, 'registration_completed_step'=> $last_step]);
            }else{
                return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step, 'company_id'=>$id, 'registration_completed_step'=> 1]);
            }
        }else{
            return redirect(route('founder.dashboard.letsbegin'));
        }
    }

    public function companynamestore(Request $request){
        $step = 1;

        $user = Auth::user();

        if(isset($request->company_id)){
            $company_id = $request->company_id;

            $company = Company::where(['id'=>$company_id])->first();

            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$company->id, 'step'=>$step])->update(['details'=>'Company name updated by customer']);
        }else{
            $company = Company::create(['user_id'=>$user->id]);

            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$company->id, 'details'=>'Company name added by customer','step'=>$step]);
        }

        $request->validate([
            'company_name_1' => 'required|string|max:255',
            'company_name_2' => 'required|string|max:255',
            'company_name_3' => 'required|string|max:255'
        ]);

        Company::where(['user_id'=>$user->id, 'id'=>$company->id])->update([
            'company_name_1' => $request->company_name_1,
            'company_name_2' => $request->company_name_2,
            'company_name_3' => $request->company_name_3,
            'user_id' => $user->id,
            'country' => $user->country_of_residenace
        ]);

        // if($user->formstep <= $step){
        //     User::where(['id' => $user->id])->update(["formstep"=>$step]);
        // }

        // }else{
        //     Company::create([
        //         'company_name_1' => $request->company_name_1,
        //         'company_name_2' => $request->company_name_2,
        //         'company_name_3' => $request->company_name_3,
        //         'user_id' => $user->id,
        //         'country' => $user->country_of_residenace
        //     ]);

        //     if($user->formstep <= $step){
        //         User::where(['id' => $user->id])->update(["formstep"=>$step]);
        //     }
        // }

        return redirect(route('founder.dashboard.companydetails', ['id'=>$company->id]));
    }

    public function companydetails(Request $request){

        $id = $request->id;

        $user = Auth::user();

        $step = 2;

        $last_step = $this->getCompletedLastStep($user->id, $id);

        $listIndustiesData = Industry::select(['name'])->get();

        $listIndusties[] = ["name" => "Select Industry"];

        foreach($listIndustiesData as $listIndusty){
            $listIndusties[] = ["name"=> $listIndusty->name];
        }

        $company_info = Company::where(['user_id'=>$user->id,'id'=>$id])->first();

        // $count = Company::where(['user_id'=>$user->id,'payment_status'=>'success'])->count();

        // if($count){
        //     return redirect(route('founder.dashboard.applications'));
        // }else{

            return Inertia::render('Founder/StepsForm/CompanyDetails',['auth' =>fn () =>  ["user"=>$user],'step'=>fn () => $step,'registration_completed_step'=>$last_step,'listindusties'=>fn () => $listIndusties,'company_info'=>fn () => $company_info]);
        // }

    }

    public function companydetailsstore(Request $request, $id){

        $user = Auth::user();

        $step = 2;

        $last_step = $this->getCompletedLastStep($user->id, $id);

        $request->validate([
            'company_industry' => 'required|string|max:255',
            'company_description' => 'required|string|min:20|max:255',
        ]);

        $company_id = Company::where(['user_id'=>$user->id])->update([
            'user_id'=>$user->id,
            'industry' => $request->company_industry,
            'description' => $request->company_description,
            'country' => $user->country_of_residenace,
        ]);

        if($step < $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$company_id, 'step'=>$step])->update(['details'=>'Company details updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$company_id, 'details'=>'Company details added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.foundersdetail', ['id'=>$id]));
    }

    public function viewrequests(){

        $user = Auth::user();

        $companies = Company::where('status','<>','0')->get();

        foreach($companies as $index => $company){

            $founders = Founder::where(['user_id'=>$company->user_id])->get();
            $company['founders'] = $founders;
        }

        return Inertia::render('Admin/ViewSubmitedRequestList',['auth'=>$user,'companyrequests'=>$companies]);

    }

    public function viewleads(){

        $user = Auth::user();

        $companies = Company::where(['status'=>0])->orWhere(['status'=>null])->get();


        foreach($companies as $index => $company){

            $founders = Founder::where(['user_id'=>$company->user_id])->get();
            $company['founders'] = $founders;
        }

        return Inertia::render('Admin/ViewSubmitedLeadList',['auth'=>$user,'companyleads'=>$companies]);

    }

    public function newcompanysetup(){
        $step = 1;

        $user = Auth::user();

        // $company_info = Company::create([
        //     'company_name_1' => null,
        //     'company_name_2' => null,
        //     'company_name_3' => null,
        //     'user_id' => $user->id,
        //     'country' => null
        // ]);

        $count = Company::where(['user_id'=>$user->id,'payment_status'=>'success'])->count();

        return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step]);
    }


    // Check Form Current Step
    public function getCompletedLastStep($user_id, $company_id){

        $completedSteps = FormSubmission::where(['user_id'=>$user_id, 'company_id'=>$company_id])->select('step')->get();

        // $completedSteps

        $stepList = [];
        foreach($completedSteps as $completedStep){
            $stepList[] = $completedStep->step;
        }
        return $last_step = max($stepList);
    }

    public function deletecomapnyregistration(Request $request, $id){

        Company::where(['id'=>$id])->delete();

        FormSubmission::where(['company_id'=>$id])->delete();

        return redirect(route('founder.dashboard.applications'));

    }


    // Phase 2
    public function reviewregistration($id){
        $step = 1;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        return Inertia::render('Founder/PhaseTwo/FormOverview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
    }

    public function reviewregistrationstore(Request $request, $id){

        $step = 7;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        if($step < $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company details updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company details added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.general-document',$id));
    }

    public function generaldocument($id){
        $step = 7;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();
        // return Inertia::render('Founder/PhaseTwo/FormOverview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);

        return Inertia::render('Founder/PhaseTwo/GeneralDocuments',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);

    }

    public function shareholderdetails($id){
        $step = 8;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id) + 2;

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();
        // return Inertia::render('Founder/PhaseTwo/FormOverview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);

        return Inertia::render('Founder/PhaseTwo/ShareholderDetails',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
    }

    public function finalpayment($id){

        $step = 9;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id) + 3;

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();
        // return Inertia::render('Founder/PhaseTwo/FormOverview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);

        return Inertia::render('Founder/PhaseTwo/FinalPayment',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
    }

    public function finalreview($id){

        $step = 10;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id) + 4;

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        return Inertia::render('Founder/PhaseTwo/UnderReview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);

    }

    public function uploadDocument(Request $request, $id){

        $user = Auth::user();

        $step = 7;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $request->validate([
            'document_type' => 'required|string',
            'document_file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);

        if($step < $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company document '.$request->document_type.' updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company document '.$request->document_type.' added by customer','step'=>$step]);
        }

    }
}
