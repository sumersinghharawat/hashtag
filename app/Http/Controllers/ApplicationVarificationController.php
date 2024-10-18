<?php

namespace App\Http\Controllers;

use App\Models\ApplicationVarification;
use App\Models\Company;
use App\Models\Document;
use App\Models\Founder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationVarificationController extends Controller
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
    public function show(ApplicationVarification $applicationVarification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationVarification $applicationVarification)
    {
        //
    }

    public function adminviewsubmitedrequest($id){

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        return Inertia::render('Admin/Application/GeneralInformation',['company_info'=>$company_info]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function adminviewsubmitedrequestupdate(Request $request, ApplicationVarification $applicationVarification, $id)
    {

        $user = Auth::user();

        $request->validate([
            'application_form_field_id' => 'required|integer|exists:application_varifications,id',
            'description' => 'nullable|string',
            'status' => 'required|in:Cancel,Verified',
        ]);

        ApplicationVarification::where(['id'=>$request->application_form_field_id])->update([
            'agent_id' => $user->id,
            'description' => $request->description,
            'varification_status' => $request->status,
        ]);

        $update_application_form_field = ApplicationVarification::where(['id'=>$request->application_form_field_id])->first();

        if(!empty($update_application_form_field->founder_id)){
            Document::where(['document_type'=>$update_application_form_field->application_form_field_name, 'company_id'=>$id, 'founder_id'=>$update_application_form_field->founder_id])->update([
                'document_status' => $request->status,
            ]);
        }else{
            Document::where(['document_type'=>$update_application_form_field->application_form_field_name, 'company_id'=>$id])->update([
                'document_status' => $request->status,
            ]);
        }

        return redirect(url()->previous());

    }

    public function adminviewsubmitedrequestdocument($id){
        //
        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        return Inertia::render('Admin/Application/GeneralDocuments',['company_info'=>$company_info]);

    }

    // adminviewsubmitedrequestshareholder

    public function adminviewsubmitedrequestshareholder($id){
        //
        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        return Inertia::render('Admin/Application/Shareholders',['company_info'=>$company_info]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationVarification $applicationVarification)
    {
        //
    }

    public function adminassignapplicationtoagent(Request $request, $id){
        //
        $user = Auth::user();

        ApplicationVarification::where(['company_id'=>$id])->update([
            'agent_id' => $user->id,
        ]);

        return redirect(url()->previous());
    }

    public function updaterejecteddetails(Request $request, $id){
        //
        // dd($request->all());

        $company_info = Company::where(['id'=>$id])->update([
            'company_name_1' => $request->company_name_1,
            'company_name_2' => $request->company_name_2,
            'company_name_3' => $request->company_name_3,
            'industry' => $request->company_industry,
            'description' => $request->company_description,
        ]);

        $founders = $request->foundersList;

        $company_fields = ApplicationVarification::where(['company_id'=>$id])->get();

        foreach ($company_fields as $key => $value) {

            if(!empty($value->founder_id)){
                Document::where(['document_type'=>$value->application_form_field_name, 'company_id'=>$id, 'founder_id'=>$value->founder_id])->update([
                    'document_status' => 'Under Review',
                ]);

                $singlefounder = [];

                // dd($value->founder_id);

                foreach($founders as $founder){
                    if($founder['id'] == $value->founder_id){
                        $singlefounder = $founder;
                    }
                }

                Founder::where(['id'=>$value->founder_id])->update(
                    [
                        'manager' => $singlefounder['manager'],
                        'visa_status' => $singlefounder['visa_status'],
                    ]
                );

                ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                    'application_form_field_value' => $singlefounder[$value->application_form_field_name],
                    'varification_status' => 'Under Review',
                ]);

            }else{

                Document::where(['document_type'=>$value->application_form_field_name, 'company_id'=>$id])->update([
                    'document_status' => 'Under Review',
                ]);

                if($value->application_form_field_name == 'company_')
                ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                    'application_form_field_value' => $singlefounder[$request->],
                    'varification_status' => 'Under Review',
                ]);
            }


        }



        // ApplicationVarification::where(['id'=>$id])->update([
        //     'agent_id' => $request->agent_id,
        //     'description' => $request->description,
        //     'varification_status' => 'Reject',
        // ]);


        return redirect(url()->previous());
    }
}
