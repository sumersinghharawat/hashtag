<?php

namespace App\Http\Controllers;

use App\Models\Packages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PackagesController extends Controller
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
        $user = Auth::user();

        return Inertia::render('Admin/Packages/AddPackage',['auth'=>$user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();

        $request->validate([
            'title' => 'required|string|max:255|unique:'.Packages::class,
            // 'description' => 'required|string',
        ]);

        Packages::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect(route('admin.dashboard.packagesofproduct'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Packages $packages)
    {
        //

        $user = Auth::user();

        $packages = Packages::all();

        return Inertia::render('Admin/Packages/ViewPackage',['auth'=>$user,'packagesofproduct'=>$packages]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Packages $packages, $id)
    {
        //
        $user = Auth::user();

        $pacakage = Packages::where(['id'=> $id])->first();

        return Inertia::render('Admin/Packages/AddPackage',['auth'=>$user,'packageofproduct'=>$pacakage]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Packages $packages, $id)
    {
        //
        $user = Auth::user();

        $request->validate([
            'title' => 'required|string|max:255',
            // 'description' => 'required|string',
        ]);

        Packages::where(['id'=>$id])->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect(route('admin.dashboard.packagesofproduct'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatestatus(Request $request, Packages $packages, $id)
    {
        //
        $user = Auth::user();

        $package = Packages::where(['id'=>$id])->first();

        Packages::where(['id'=>$id])->update([
            'status' => $package->status?0:1,
        ]);

        return redirect(route('admin.dashboard.packagesofproduct'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Packages $packages, $id)
    {
        //
        $user = Auth::user();

        Packages::where(['id'=>$id])->delete();

        return redirect(route('admin.dashboard.packagesofproduct'));

    }
}
