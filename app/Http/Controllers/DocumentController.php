<?php

namespace App\Http\Controllers;

use App\Models\ApplicationVarification;
use App\Models\Company;
use App\Models\Document;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
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
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }

    public function uploaddocumentstore(Request $request, $id){

        $request->validate([
            'document_type' => 'required|string',
            'document_file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('document_file') && $request->file('document_file')->isValid()) {

            $file = $request->file('document_file');
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            $directory = 'document/company-id-'.$id;

            $fileName = $name . '.' . $extension;

            $counter = 1;
            while (file_exists(public_path($directory . '/' . $fileName))) {
                $fileName = $name . '-' . $counter . '.' . $extension;
                $counter++;
            }

            $file->move(public_path($directory), $fileName);
            $url = asset($directory . '/' . $fileName);

            $user_id = Company::where('id', $id)->value('user_id');

            $fileDetails = Document::updateOrCreate(
                [
                    'document_type' => $request->document_type,
                    'user_id' => $user_id,
                    'company_id' => $id,
                    'founder_id' => $request->founder_id?$request->founder_id:0
                ],
                [
                    'document_file' => $url,
                    'document_status' => 'Under Review',
                ]
            );

            if($request->founder_id){
                $applicationVarification = ApplicationVarification::where([
                    'founder_id' => $request->founder_id,
                    'company_id' => $id,
                    'application_form_field_name' => $request->document_type
                ])->first();

                if($applicationVarification){
                    ApplicationVarification::where([
                        'founder_id' => $request->founder_id,
                        'company_id' => $id,
                        'application_form_field_name' => $request->document_type
                    ])->update([
                        'varification_status' => 'Under Review',
                        'application_form_field_value' => $url
                    ]);
                }
            }else{
                $applicationVarification = ApplicationVarification::where([
                    'company_id' => $id,
                    'application_form_field_name' => $request->document_type
                ])->first();

                if($applicationVarification){
                    ApplicationVarification::where([
                        'company_id' => $id,
                        'application_form_field_name' => $request->document_type
                    ])->update([
                        'varification_status' => 'Under Review',
                        'application_form_field_value' => $url
                    ]);
                }
            }

        }

        return redirect(url()->previous());
    }

    public function uploaddocumentdelete(Request $request, $id,){

        $deletedDocumentId = Document::where([
            'document_type' => $request->document_type,
            'company_id' => $id,
            'founder_id' => $request->founder_id,
        ])->delete();

        return redirect(url()->previous());
    }
}
