<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IndustryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();

        $industries = Industry::all();

        return Inertia::render('Admin/Industry/ViewIndustry',['auth'=>$user,'industries'=>$industries]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $user = Auth::user();

        return Inertia::render('Admin/Industry/AddIndustry',['auth'=>$user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255|unique:'.Industry::class,
        ]);

        Industry::create([
            'name' => $request->name
        ]);

        return redirect('/admin/viewindustry');
    }

    /**
     * Display the specified resource.
     */
    public function show(Industry $industry)
    {
        //
        $user = Auth::user();

        $industries = Industry::all();

        return Inertia::render('Admin/Industry/ViewIndustry',['auth'=>$user,'industries'=>$industries]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id,Industry $industry)
    {
        //
        $user = Auth::user();

        $industry = Industry::where(['id'=> $id])->first();

        return Inertia::render('Admin/Industry/AddIndustry',['auth'=>$user,'industry'=>$industry]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id,Request $request, Industry $industry)
    {
        //
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Industry::where(['id'=>$id])->update([
            'name' => $request->name
        ]);

        return redirect('/admin/viewindustry');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id,Industry $industry)
    {
        //
        $user = Auth::user();

        Industry::where(['id'=>$id])->delete();

        return redirect('/admin/viewindustry');

    }
}
