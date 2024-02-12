<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();

        $customer_info = Customer::where(['userid'=>$user->id, 'name'=>$user->name])->first();

        $company_info = Company::where(['customer_id'=>$user->id])->first();

        $step = 0;

        if($customer_info && $customer_info->mobile == ""){
            $step = 1;
            return redirect('/customer/letsbegin');
            // return Inertia::render('Customer/StepsForm/LetsBegin',['user'=>$user,'customer_info'=>$customer_info,'company_info'=>$company_info,'step'=>$step]);
        }

        if($company_info && $company_info->country == ""){
            $step = 1;
            return redirect('/customer/letsbegin');
        }

        if($company_info && $company_info->name == ""){
            $step = 2;
            return redirect('/customer/companyname');
        }

        return Inertia::render('CustomerDashboard',['user'=>$user,'customer_info'=>$customer_info,'company_info'=>$company_info,'step'=>$step]);
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
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function letsbegin(){

        $user = Auth::user();

        $customer_info = Customer::where(['userid'=>$user->id])->first();

        $company_info = Company::where(['customer_id'=>$user->id])->first();

        $step = 0;

        return Inertia::render('Customer/LetsBegin',['user'=>$user,'customer_info'=>$customer_info,'company_info'=>$company_info,'step'=>$step]);
    }

    public function letsbeginstore(Request $request){

        $user = Auth::user();

        $customer_info = Customer::where(['userid'=>$user->id, 'name'=>$user->name])->first();

        $company_info = Company::where(['customer_id'=>$user->id])->first();

        $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'country' => 'required|string',
        ]);

        $customer_info = Customer::where(['userid'=>$user->id])->update([
            'name' => $request->name,
            'mobile' => $request->mobile,
        ]);

        $company_info = Company::where(['customer_id'=>$user->id])->update([
            'country' => $request->country,
        ]);

        return Inertia::render('Customer/LetsBegin',['user'=>$user,'customer_info'=>$customer_info,'company_info'=>$company_info]);
    }

}
