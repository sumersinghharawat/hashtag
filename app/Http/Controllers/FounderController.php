<?php

namespace App\Http\Controllers;

use App\Models\Company;
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

        $step = 0;

        if($user->formstep == -1){
                return redirect('/founder/letsbegin');
        }

        $founder_info = Founder::where(['user_id'=>$user->id])->first();

        if($user->formstep == 0){
            return redirect('/founder/companyname');
        }

        if($user->formstep == 1){
            return redirect(route('founder.dashboard.companydetails'));
        }

        if($user->formstep == 2){
            return redirect(route('founder.dashboard.foundersdetail'));
        }

        if($user->formstep == 3){
            return redirect(route('founder.dashboard.foundersvisa'));
        }

        if($user->formstep == 4){
            return redirect(route('founder.dashboard.summary'));
        }

        if($user->formstep == 5){
            return redirect(route('founder.dashboard.paynow'));
        }

        if($user->formstep == 6){
            return redirect(route('founder.dashboard.viewrequest'));
        }

        $company = Company::where(['user_id'=>$user->id])->first();

        if($company->status == 0){
            return redirect(route('founder.dashboard.thankyou'));
        }

        if($company->status == 1){
            return redirect(route('founder.dashboard.viewrequest'));
        }

        return Inertia::render('CustomerDashboard',['user'=>$user,'step'=>$step]);
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
    public function founderstore(Request $request)
    {
        //
        $user = Auth::user();

        $request->validate([
            'first_name' => ['required','string','max:255',new UniqueNameCombination],
        ]);

        $company = Company::where(['user_id'=>$user->id])->first();

        Founder::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name?$request->last_name:"",
            'user_id' => $user->id,
            'company_id' => $company->id
        ]);

        return redirect('/founder/foundersdetail');
        // return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>$step,'founders'=>$founders]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Founder $founder)
    {
        //
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

    public function founderdelete(Request $request){

        if(Founder::where(['id'=>$request->id])->delete()){
            return redirect('/founder/foundersdetail');
        }


    }

    public function letsbegin(){

        $user = Auth::user();

        $count = Company::where(['user_id'=>$user->id,'status'=>1])->count();

        if($count){
            return redirect('/founder/viewrequest');
        }else{
            return Inertia::render('Founder/LetsBegin',['auth' => ["user"=>$user]]);
        }
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

        $isfounderexistornot = Founder::where(['user_id'=>$user->id])->count();
        if($isfounderexistornot>0){
            $founder_info = Founder::where(['user_id'=>$user->id])->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ]);
        }else{
            $founder_info = Founder::create([
                'user_id'=>$user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ]);
        }
        $step = 0;

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }


        return redirect('/founder');
    }

    public function foundersdetail(){

        $user = Auth::user();

        $step = 3;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        $totalSplits = 0;

        foreach($founders as $founder){
            $totalSplits = $totalSplits + $founder->ownership_percentage;
        }

        $count = Company::where(['user_id'=>$user->id,'status'=>1])->count();

        if($count){
            return redirect('/founder/viewrequest');
        }else{
            return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'totalSplits'=>fn () => $totalSplits]);
        }

    }

    public function founderssplitstore(Request $request){
        $split = $request->split;

        $user = Auth::user();

        $step = 3;

        foreach ($split as $splitKey => $splitValue) {
            # code...
            Founder::where(['id'=>$splitValue['id']])->update([
                'manager'=>$splitValue['manager'],
                'ownership_percentage'=>$splitValue['ownership_percentage'],
            ]);
        }

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        return redirect('/founder/foundersvisa');
        // return redirect('/founder');

    }

    public function foundersvisa(){

        $user = Auth::user();

        $step = 4;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        $count = Company::where(['user_id'=>$user->id,'status'=>1])->count();

        if($count){
            return redirect('/founder/viewrequest');
        }else{
            return Inertia::render('Founder/StepsForm/FounderVisa',['step'=>fn () => $step,'foundersList'=>fn () => $founders]);
        }

    }

    public function foundersvisastore(Request $request){
        $split = $request->split;

        if($request->visastatus){
            foreach ($split as $splitKey => $splitValue) {
                # code...
                Founder::where(['id'=>$splitValue['id']])->update([
                    'visa_status'=>$splitValue['visa_status'],
                ]);
            }
        }else{
            foreach ($split as $splitKey => $splitValue) {
                # code...
                Founder::where(['id'=>$splitValue['id']])->update([
                    'visa_status'=>0,
                ]);
            }
        }

        $user = Auth::user();

        $step = 4;

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        return redirect('/founder/summary');
    }

    public function summary(){

        $user = Auth::user();

        $step = 5;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        $company_info = Company::where(['user_id'=>$user->id])->first();

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        return Inertia::render('Founder/StepsForm/Summary',['step'=>fn () => $step,'foundersList'=>fn () => $founders,'company_info'=>fn () => $company_info]);
    }

    public function paynow(){

        $user = Auth::user();

        $step = 5;

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        $founders = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Founder/StepsForm/PayNow',['step'=>fn () => $step,'foundersList'=>fn () => $founders]);
    }

    public function thankyou(){

        $user = Auth::user();

        $step = 6;
        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        Company::where(['user_id'=>$user->id])->update(['status'=>1]);

        $founders = Founder::where(['user_id'=>$user->id])->get();

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


    // public function viewrequest($id){

    //     $user = Auth::user();

    //     $company_info = Company::where(['user_id'=>$user->id])->first();

    //     $company_info['founders'] = Founder::where(['user_id'=>$user->id])->get();

    //     return Inertia::render('Admin/ViewSubmitedRequest',['request'=>$company_info]);
    // }


}
