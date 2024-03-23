<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Http\Controllers\CustomerController;
use App\Models\Founder;
use App\Models\Industry;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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

    public function companyname(){
        $step = 1;

        $user = Auth::user();

        $company_info_existornot = Company::where(['user_id'=>$user->id])->count();

        $company_info = Company::where(['user_id'=>$user->id])->first();


        $count = Company::where(['user_id'=>$user->id,'status'=>1])->count();

        if($count){
            return redirect('/founder/viewrequest');
        }else{
            return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step,'company_info'=>fn () => $company_info]);
        }
    }

    public function companynamestore(Request $request){
        $step = 1;

        $user = Auth::user();

        $request->validate([
            'company_name' => 'required|string|max:255'
        ]);

        $company_info_existornot = Company::where(['user_id'=>$user->id])->count();

        if($company_info_existornot>0){

            Company::where(['user_id'=>$user->id])->update([
                'name' => $request->company_name,
                'user_id'=>$user->id,
                'country'=>$user->country_of_residenace
            ]);

            if($user->formstep <= $step){
                User::where(['id'=>$user->id])->update(["formstep"=>$step]);
            }
        }else{
            Company::create([
                'name' => $request->company_name,
                'user_id'=>$user->id,
                'country'=>$user->country_of_residenace
            ]);

            if($user->formstep <= $step){
                User::where(['id'=>$user->id])->update(["formstep"=>$step]);
            }
        }

        return redirect('/founder/companydetails');
    }

    public function companydetails(){

        $user = Auth::user();

        $step = 2;

        $listIndustiesData = Industry::select(['name'])->get();

        $listIndusties[] = ["name" => "Select Industry"];

        foreach($listIndustiesData as $listIndusty){
            $listIndusties[] = ["name"=> $listIndusty->name];
        }

        $company_info = Company::where(['user_id'=>$user->id])->first();

        $count = Company::where(['user_id'=>$user->id,'status'=>1])->count();

        if($count){
            return redirect('/founder/viewrequest');
        }else{
            return Inertia::render('Founder/StepsForm/CompanyDetails',['auth' =>fn () =>  ["user"=>$user],'step'=>fn () => $step,'listindusties'=>fn () => $listIndusties,'company_info'=>fn () => $company_info]);
        }

    }

    public function companydetailsstore(Request $request){

        $user = Auth::user();

        $step = 2;

        $request->validate([
            'company_industry' => 'required|string|max:255',
            'company_description' => 'required|string|min:20|max:255',
        ]);

        $company = Company::where(['user_id'=>$user->id])->update([
            'user_id'=>$user->id,
            'industry' => $request->company_industry,
            'description' => $request->company_description,
            'country' => $user->country_of_residenace,
        ]);

        if($user->formstep <= $step){
            User::where(['id'=>$user->id])->update(["formstep"=>$step]);
        }

        $founder = Founder::where(['user_id'=>$user->id])->update(['company_id'=>$company]);

        return redirect('/founder/foundersdetail');
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
}
