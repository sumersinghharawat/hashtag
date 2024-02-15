<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Founder;
use App\Models\User;
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

        if($user->mobile_number == "" || $user->country_of_residenace == ""){
                return redirect('/founder/letsbegin');
        }

        $founder_info = Founder::where(['user_id'=>$user->id])->first();

        if(!$founder_info->company_id){
            return redirect('/founder/companyname');
        }

        $company = Company::where(['user_id'=>$user->id,'id'=>$founder_info->company_id])->first();
        if(empty($company->industry) || empty($company->description)){
            return redirect(route('founder.dashboard.companydetails'));
        }

        $founder = Founder::where(['user_id'=>$user->id])->first();

        if(empty($founder->visa_status)){
            return redirect(route('founder.dashboard.foundersvisa'));
        }

        if(empty($company->status)){
            return redirect(route('founder.dashboard.summary'));
        }

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
            'first_name' => 'required|string|max:255|unique:'.Founder::class,
            'last_name' => 'required|string|max:255'
        ]);

        $company = Company::where(['user_id'=>$user->id])->first();

        Founder::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
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

        return Inertia::render('Founder/LetsBegin',['auth' => ["user"=>$user]]);
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

        return Inertia::render('Founder/StepsForm/FoundersDetail',['step'=>$step,'foundersList'=>$founders,'totalSplits'=>$totalSplits]);

    }

    public function founderssplitstore(Request $request){
        $split = $request->split;

        foreach ($split as $splitKey => $splitValue) {
            # code...
            Founder::where(['id'=>$splitValue['id']])->update([
                'manager'=>$splitValue['manager'],
                'ownership_percentage'=>$splitValue['ownership_percentage'],
            ]);
        }

        return redirect('/founder');
    }

    public function foundersvisa(){

        $user = Auth::user();

        $step = 4;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Founder/StepsForm/FounderVisa',['step'=>$step,'foundersList'=>$founders]);
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


        return redirect('/founder/summary');
    }

    public function summary(){

        $user = Auth::user();

        $step = 5;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        $company_info = Company::where(['user_id'=>$user->id])->first();

        return Inertia::render('Founder/StepsForm/Summary',['step'=>$step,'foundersList'=>$founders,'company_info'=>$company_info]);
    }

    public function paynow(){

        $user = Auth::user();

        $step = 6;

        $founders = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Founder/StepsForm/PayNow',['step'=>$step,'foundersList'=>$founders]);
    }

    public function thankyou(){

        $user = Auth::user();

        Company::where(['user_id'=>$user->id])->update(['status'=>0]);

        $founders = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Founder/StepsForm/ThankYou',['foundersList'=>$founders]);
    }


    public function viewsubmitedrequest(){

        $user = Auth::user();

        $company_info = Company::where(['user_id'=>$user->id])->first();
        $company_info['founders'] = Founder::where(['user_id'=>$user->id])->get();

        return Inertia::render('Admin/ViewSubmitedRequest',['request'=>$company_info]);
    }
}
