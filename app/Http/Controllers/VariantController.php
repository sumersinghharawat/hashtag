<?php

namespace App\Http\Controllers;

use App\Models\Packages;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VariantController extends Controller
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
    public function create($package_id)
    {
        //
        $user = Auth::user();

        $package = Packages::where(['id'=>$package_id])->first();

        return Inertia::render('Admin/Variants/AddVariant',['auth'=>$user, 'packageofproduct'=>$package]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $package_id)
    {
        //

        $user = Auth::user();

        $request->validate([
            'title' => 'required|string|max:255',
            // 'description' => 'required|string',
            'variant_type' => 'required|string',
            'price' => 'required|max:10',
        ]);

        Variant::create([
            'title' => $request->title,
            'package_id' => $package_id,
            'description' => $request->description?$request->description:null,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'variant_type' => $request->variant_type,
            'visa_count' => $request->visa_count,
        ]);

        return redirect(route('admin.dashboard.variantofproduct', $package_id));
    }

    /**
     * Display the specified resource.
     */
    public function show(Variant $variant, $package_id)
    {
        //
        $user = Auth::user();

        $package = Packages::where(['id'=>$package_id])->first();

        $variants = Variant::where(['package_id'=>$package_id])->get();

        return Inertia::render('Admin/Variants/ViewVariant',['auth'=>$user,'variantsofproduct'=>$variants, 'packageofproduct'=>$package]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Variant $variant, $package_id, $id)
    {
        //
        $user = Auth::user();

        $package = Packages::where(['id'=>$package_id])->first();

        $variant = Variant::where(['id'=> $id, 'package_id'=>$package_id])->first();

        return Inertia::render('Admin/Variants/AddVariant',['auth'=>$user,'packageofproduct'=>$package, 'variantofproduct'=>$variant]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Variant $variant, $package_id, $id)
    {
        //

        $user = Auth::user();

        $request->validate([
            'title' => 'required|string|max:255',
            // 'description' => 'required|string',
            'variant_type' => 'required|string',
            'price' => 'required|max:10',
        ]);


        Variant::where(['id'=>$id, 'package_id'=>$package_id])->update([
            'title' => $request->title,
            'description' => $request->description?$request->description:null,
            'price' => $request->price,
            'discount_price' => $request->discount_price?$request->discount_price:0,
            'variant_type' => $request->variant_type,
            'visa_count' => $request->visa_count,
        ]);

        return redirect(route('admin.dashboard.variantofproduct', $package_id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variant $variant, $package_id, $id)
    {
        //
        $user = Auth::user();

        Variant::where(['id'=>$id, 'package_id'=>$package_id])->delete();

        return redirect(route('admin.dashboard.variantofproduct', $package_id));

    }
}
