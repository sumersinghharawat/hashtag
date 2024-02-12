<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Http\Controllers\CustomerController;
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
        $user = Auth::user();

        $customer_info = Customer::where(['userid'=>$user->id, 'name'=>$user->name])->first();

        $company_info = Company::where(['customer_id'=>$user->id])->first();

        return Inertia::render('Customer/StepsForm/CompanyName',['user'=>$user,'customer_info'=>$customer_info,'company_info'=>$company_info]);
    }
}
