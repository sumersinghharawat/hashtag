<?php

namespace App\Http\Controllers;

use App\Models\FormSubmissionInput;
use Illuminate\Http\Request;

class FormSubmissionInputController extends Controller
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
    public function create($formid, $data)
    {
        //

        foreach ($data as $key => $value) {
            # code...
            FormSubmissionInput::create(['input'=>$key, 'value'=>$value, 'formid'=>$formid]);
        }
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
    public function show(FormSubmissionInput $formSubmissionInput)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FormSubmissionInput $formSubmissionInput)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FormSubmissionInput $formSubmissionInput)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormSubmissionInput $formSubmissionInput)
    {
        //
    }
}
