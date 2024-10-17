<?php

namespace App\Http\Controllers;

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

        if ($request->hasFile('document_file') && $request->file('document_file')->isValid()) {// Get the uploaded file from the request

            $file = $request->file('document_file');  // This will be an instance of UploadedFile
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME); // Get the original file name without extension
            $extension = $file->getClientOriginalExtension(); // Get the file extension

            // Define the base directory where the file will be stored
            $directory = 'public/document/company-id-'.$id;

            // Set the initial file name
            $fileName = $name . '.' . $extension;

            // Check if the file exists in the storage
            $counter = 1;
            while (Storage::exists($directory . '/' . $fileName)) {
                // If the file exists, append `-1`, `-2`, etc. to the file name
                $fileName = $name . '-' . $counter . '.' . $extension;
                $counter++;
            }

            // Save the file to the specified directory with the final file name
            $path = Storage::putFileAs($directory, $file, $fileName);
            $url = Storage::url($path);

            $fileDetails = Document::updateOrCreate(
                [
                    'document_type'=>$request->document_type,
                    'user_id'=>$user->id,
                    'company_id'=>$id,
                    'founder_id'=> $request->founder_id
                ],
                [
                    'document_type'=>$request->document_type,
                    'user_id'=>$user->id,
                    'company_id'=>$id,
                    'founder_id'=> $request->founder_id,
                    'document_file'=>$url,
                    'document_status'=>'Under Review'
                ]
            );
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
