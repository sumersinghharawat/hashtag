<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\FormSubmission;
use App\Models\Founder;
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

        // $step = 0;

        // if($user->formstep == -1){
        //         return redirect('/founder/letsbegin');
        // }

        // $founder_info = Founder::where(['user_id'=>$user->id])->first();

        // if($user->formstep == 0){
        //     return redirect('/founder/companyname');
        // }

        // if($user->formstep == 1){
        //     return redirect(route('founder.dashboard.companydetails'));
        // }

        // if($user->formstep == 2){
        //     return redirect(route('founder.dashboard.foundersdetail'));
        // }

        // if($user->formstep == 3){
        //     return redirect(route('founder.dashboard.foundersvisa'));
        // }

        // if($user->formstep == 4){
        //     return redirect(route('founder.dashboard.summary'));
        // }

        // if($user->formstep == 5){
        //     return redirect(route('founder.dashboard.paynow'));
        // }

        // if($user->formstep == 6){
        //     return redirect(route('founder.dashboard.index'));
        // }


        // if($company->status == 0){
        //     return redirect(route('founder.dashboard.thankyou'));
        // }

        // if($company->status == 1){
        //     return redirect(route('founder.dashboard.index'));
        // }


        // $companyRegisterationCount = Company::where(['user_id'=>$user->id])->count();

        $companyRegistrationList = Company::where(['user_id'=>$user->id])->get();

        if($user->country_of_residenace){
            return Inertia::render('Founder/Dashboard/Dashboard',['user'=>$user, 'companyRegistrationList'=>$companyRegistrationList]);
        }else{
            return redirect(route('founder.dashboard.letsbegin'));
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
            $TotalForm['founders'] = Founder::where(['user_id'=>$user->id, 'company_id'=>$TotalForm->id,'manager'=>1])->count();
            $TotalForm['visas'] = Founder::where(['user_id'=>$user->id, 'company_id'=>$TotalForm->id, 'visa_status'=>1])->count();

            $formStep = $this->CheckFormSteps($TotalForm->id);

            $TotalForm['id'] = $TotalForm->id;
            $TotalForm['step'] = $formStep['step'];
            $TotalForm['next_step'] = $formStep['next_step'];
            $TotalForm['route'] = $formStep['route'];

        }

        return Inertia::render('Founder/Dashboard/Applications',['auth' => ["user"=>$user],"companies"=>$TotalForms]);
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

        // dd($founder->visa_status);

        if($founder){

            if($founder->visa_status == null){
                $formStep['step'] = 4;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.foundersvisa';
            }


            if($founder->visa_status !== null && $company->payment_status === 'pending'){
                $formStep['step'] = 5;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.summary';
            }

            if($company->payment_status === 'success'){
                $formStep['step'] = 6;
                $formStep['next_step'] = 'Continue';
                $formStep['route'] = 'founder.dashboard.review-registration';
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

    public function letsbegin(){

        $user = Auth::user();

        // $PendingFormCount= Company::where(['user_id'=>$user->id,'payment_status'=>'pending'])->count();
        // $TotalFormsCount = Company::where(['user_id'=>$user->id])->count();
        // $PendingForm = Company::where(['user_id'=>$user->id,'payment_status'=>'pending'])->first();

        // if($user->country_of_residenace){

        // }else{
            return Inertia::render('Founder/LetsBegin',['auth' => ["user"=>$user]]);
        // }

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

        return redirect(route('founder.dashboard'));


        // $isfounderexistornot = Founder::where(['user_id'=>$user->id])->count();
        // if($isfounderexistornot>0){
        //     $founder_info = Founder::where(['user_id'=>$user->id])->update([
        //         'first_name' => $request->first_name,
        //         'last_name' => $request->last_name,
        //     ]);
        // }else{
        //     $founder_info = Founder::create([
        //         'user_id'=>$user->id,
        //         'first_name' => $request->first_name,
        //         'last_name' => $request->last_name,
        //     ]);
        // }
        // $step = 0;

        // if($user->formstep <= $step){
        //     User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        // }


        // return redirect('/founder');
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

        // $count = Company::where(['user_id'=>$user->id,'payment_status'=>'success'])->count();

        // if($count){
        //     return redirect(route('founder.dashboard.applications'));
        // }else{
            return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'totalSplits'=>fn () => $totalSplits, 'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
        // }

    }

    public function founderssplitstore(Request $request, $id){
        $founder_list = $request->founder_list;

        $user = Auth::user();

        $step = 3;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        foreach ($founder_list as $founder_list_Key => $founder_list_value) {
            # code...
            Founder::where(['id'=>$founder_list_value['id']])->update([
                'manager'=>$founder_list_value['manager'],
                'ownership_percentage'=>$founder_list_value['ownership_percentage'],
            ]);
        }

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company founders updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company founders added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.foundersvisa', ['id'=>$id]));

        // return redirect('/founder/foundersvisa');
        // return redirect('/founder');

    }

    public function foundersvisa($id){

        $user = Auth::user();

        $step = 4;

        $founders = Founder::where(['user_id'=>$user->id,'company_id'=>$id])->get();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $company_info = Company::where(['id'=>$id])->first();

        // if($count){
        //     return redirect(route('founder.dashboard.applications'));
        // }else{
            return Inertia::render('Founder/StepsForm/FounderVisa',['step'=>fn () => $step,'foundersList'=>fn () => $founders,  'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
        // }

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

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company phase 1 updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company phase 1 added by customer','step'=>$step]);
        }

        // if($user->formstep <= $step){
        //     User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        // }

        return Inertia::render('Founder/StepsForm/Summary',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'company_info'=>fn () => $company_info, 'registration_completed_step'=>$last_step]);
    }

    public function paynow($id){

        $user = Auth::user();

        $step = 6;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $id);

        $company_info = Company::where(['user_id'=>$user->id, 'id'=>$id])->first();

        $founders = Founder::where(['user_id'=>$user->id, 'id'=>$id])->get();

        return Inertia::render('Founder/StepsForm/PayNow',['step'=>fn () => $step,'foundersList'=>fn () => $founders, 'company_info'=> $company_info, 'registration_completed_step'=>$last_step]);
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

        Company::where(['user_id'=>$user->id,'id'=>$id])->update(['payment_status'=>'success']);

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

    public function adminviewsubmitedrequest($id){

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        // if($company_info['founders']){
        //     $company_info['user'] = [User::where(['id'=>$company_info->user_id])->first()];
        // }

        return Inertia::render('Admin/ViewSubmitedRequest',['request'=>$company_info]);
    }

    public function adminviewsubmitedrequeststore(Request $request,$id){

        Company::where(['id'=>$id])->update(['status'=>$request->company_status]);

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        return Inertia::render('Admin/ViewSubmitedRequest',['request'=>$company_info]);
    }


    public function founderviewdashboard(){

        $step = 1;

        $user = Auth::user();

        $company_info = Company::where(['user_id'=>$user->id, 'payment_status'=>'success'])->first();

        $last_step = 1;

        if($company_info){
            $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);
        }

        return Inertia::render('Founder/Dashboard/Dashboard',['auth' => fn () => ["user"=>$user],'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info]);
    }

}
