<?php

namespace App\Http\Controllers;

use App\Mail\FormSubmissionConsultation;
use App\Models\FormSubmission;
use Illuminate\Foundation\Application;
use App\Rules\Phonenumber;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class FormSubmissionController extends Controller
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

        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:500',
            'phonenumber' => ['required','max:255', new Phonenumber],
            'message' => ['max:255']
        ]);


        $data = [
            'name' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phonenumber,
            'messages' => $request->message,
        ];

        // $formid = FormSubmission::create([
        //     'title'=>'consultatant'
        // ]);
        // $formInputsInsert = new FormSubmissionInputController;
        // $formInputsInsert->create($formid->id, $data);

        // Send an email
        try {
            //code...
            Mail::to($data['email'])->queue(new FormSubmissionConsultation($data));

            return redirect('/')->with('message', 'Thank you for filling out the form! We will be in touch with you shortly to provide free consultancy on setting up your business in the UAE.');

        } catch (\Throwable $th) {
            throw $th;
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(FormSubmission $formSubmission)
    {
        //
        $forms = FormSubmission::with('formFields')->get();

        return Inertia::render('Admin/Forms/ViewForms',['forms'=>$forms]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FormSubmission $formSubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FormSubmission $formSubmission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormSubmission $formSubmission)
    {
        //
    }
}
