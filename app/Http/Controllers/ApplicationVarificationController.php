<?php

namespace App\Http\Controllers;

use App\Mail\FounderNotificationEmailTemplate;
use App\Mail\NotificationEmailTemplate;
use App\Models\ApplicationVarification;
use App\Models\Company;
use App\Models\Document;
use App\Models\FormSubmission;
use App\Models\Founder;
use App\Models\Packages;
use App\Models\User;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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

        $company_info['rejected_fields_count'] = ApplicationVarification::where(['company_id'=>$company_info->id])
            ->whereIn('varification_status', ['Rejected', 'Pending', 'Under Review'])
            ->count();

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
            'status' => 'required|in:Rejected,Confirmed',
        ]);

        ApplicationVarification::where(['id'=>$request->application_form_field_id])->update([
            'agent_id' => $user->id,
            'description' => $request->description,
            'varification_status' => $request->status,
        ]);

        $update_application_form_field = ApplicationVarification::where(['id'=>$request->application_form_field_id])->first();

        if(!empty($update_application_form_field->founder_id)){
            Document::where(['document_type'=>$update_application_form_field->application_form_field_name, 'company_id'=>$id, 'founder_id'=>$update_application_form_field->founder_id])->update([
                'document_status' => $request->status=='Rejected'?'Cancel':'Confirmed',
            ]);
        }else{
            Document::where(['document_type'=>$update_application_form_field->application_form_field_name, 'company_id'=>$id])->update([
                'document_status' => $request->status=='Rejected'?'Cancel':'Confirmed',
            ]);
        }

        if($request->status == 'Rejected'){
            $field_name = $update_application_form_field->application_form_field_name;
            $user_id = $update_application_form_field->user_id;
            $this->sendEmailforRejectionsToFounder($id, $user_id, $field_name, $request->description);
        }

        return redirect(url()->previous());

    }

    public function adminviewsubmitedrequestdocument($id){
        //
        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        $company_info['rejected_fields_count'] = ApplicationVarification::where(['company_id'=>$company_info->id])
            ->whereIn('varification_status', ['Rejected', 'Pending', 'Under Review'])
            ->count();

        return Inertia::render('Admin/Application/GeneralDocuments',['company_info'=>$company_info]);

    }

    // adminviewsubmitedrequestshareholder

    public function adminviewsubmitedrequestshareholder($id){
        //
        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        $company_info['rejected_fields_count'] = ApplicationVarification::where(['company_id'=>$company_info->id])
            ->whereIn('varification_status', ['Rejected', 'Pending', 'Under Review'])
            ->count();

        // if($company_info['rejected_fields_count'] == 0){
        //     return redirect(route('admin.dashboard.adminuploaddocumentview', $id));
        // }

        return Inertia::render('Admin/Application/Shareholders',['company_info'=>$company_info]);

    }

    public function adminviewsubmitedrequestpackage($id){
        //
        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $variantDetails = Variant::where(['id'=>$company_info->package])->first();

        $package_id = $variantDetails->package_id;

        $packageDetails = Packages::where(['id'=>$package_id])->first();

        return Inertia::render('Admin/Application/PackageDetails',['company_info'=>$company_info, 'packageDetails'=>$packageDetails, 'variantDetails' => $variantDetails]);
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
        $agent = Auth::user();


        $assigned = ApplicationVarification::where(['company_id'=>$id])->update([
            'agent_id' => $agent->id,
        ]);


        $admin = \Spatie\Permission\Models\Role::where('name', 'superadmin')->first()->users->first();

        $data = [
            'subject' => 'Update: A New Company Registration Has Been Assigned to You!',
            'view' => 'emails.founders.finalpaymentsuccessful',
            'email' => $agent->email, // Email sent to the agent
            'name' => $agent->first_name, // Personalize with agent's name
            'support_description' => 'If you have any questions, contact us at <a href="'.$admin->email.'">'.$admin->email.'</a>.',
            'title' => 'New Application Assigned to You!',
            'subtitle' => 'You’ve been assigned a new application!',
            'description' => "Dear ".$agent->first_name.", <br>
            We are pleased to inform you that a new company registration application has been assigned to you for review. Please log in to the dashboard and review the application to proceed with the next steps. <br>
            Click the button below to view the application details.",
            'button_text' => 'View Application',
            'link' => route('admin.dashboard.viewrequestinformation', ['id' => $id]), // Assuming $id refers to the application
            'footer' => '&copy; 2024 Incorpx. All rights reserved.',
        ];

        $view = view('emails.founders.finalpaymentsuccessful', $data)->render();

        Mail::to($data['email'])->queue(new NotificationEmailTemplate($data, $view));

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

                $singlefounder = [];

                foreach($founders as $founder){
                    if($founder['id'] == $value->founder_id){
                        $singlefounder = $founder;
                    }
                };

                // dd($singlefounder);

                if(ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name, 'varification_status' => 'Rejected'])->first()){

                    Founder::where(['id'=>$value->founder_id])->update(
                        [
                            'manager' => $singlefounder['manager'],
                            'visa_status' => $singlefounder['visa_status'],
                        ]
                    );


                    Document::where(['document_type'=>$value->application_form_field_name, 'company_id'=>$id, 'founder_id'=>$value->founder_id])->update([
                        'document_status' => 'Under Review',
                    ]);

                    $founderDocuments = Document::where(['document_type'=>$value->application_form_field_name, 'company_id'=>$id, 'founder_id'=>$value->founder_id])->get();

                    $founderDocumentsList = [];

                    foreach($founderDocuments as $key => $founderDocument){

                        $singlefounder[$founderDocument->document_type] = $founderDocument->document_file;
                    }

                    ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                        'application_form_field_value' => $singlefounder[$value->application_form_field_name],
                        'varification_status' => 'Under Review',
                    ]);

                }

            }else{

                if(ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name, 'varification_status' => 'Rejected'])->first()){

                    Document::where(['document_type'=>$value->application_form_field_name, 'company_id'=>$id])->update([
                        'document_status' => 'Under Review',
                    ]);

                    if($value->application_form_field_name == 'company_name_1'){
                        ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                            'application_form_field_value' => $request->company_name_1,
                            'varification_status' => 'Under Review',
                        ]);
                    }

                    if($value->application_form_field_name == 'company_name_2'){
                        ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                            'application_form_field_value' => $request->company_name_2,
                            'varification_status' => 'Under Review',
                        ]);
                    }

                    if($value->application_form_field_name == 'company_name_3'){
                        ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                            'application_form_field_value' => $request->company_name_3,
                            'varification_status' => 'Under Review',
                        ]);
                    }

                    if($value->application_form_field_name == 'industry'){
                        ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                            'application_form_field_value' => $request->company_industry,
                            'varification_status' => 'Under Review',
                        ]);
                    }

                    if($value->application_form_field_name == 'description'){
                        ApplicationVarification::where(['id'=>$value->id, 'application_form_field_name' => $value->application_form_field_name])->update([
                            'application_form_field_value' => $request->company_description,
                            'varification_status' => 'Under Review',
                        ]);
                    }

                }
            }


        }

        // ApplicationVarification::where(['id'=>$id])->update([
        //     'agent_id' => $request->agent_id,
        //     'description' => $request->description,
        //     'varification_status' => 'Reject',
        // ]);


        return redirect(url()->previous());
    }

    public function adminuploaddocumentview(Request $request, $id){

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $company_info['founders'] = Founder::where(['user_id'=>$company_info->user_id])->get();

        $company_info['application_fields'] = ApplicationVarification::where(['company_id'=>$company_info->id])->get();

        $company_info['rejected_fields_count'] = ApplicationVarification::where(['company_id'=>$company_info->id])
            ->whereIn('varification_status', ['Rejected', 'Pending', 'Under Review'])
            ->count();

        $company_info['documents'] = Document::where(['company_id'=>$company_info->id])->whereNotIn('document_type',['Business Plan', 'Other Document', 'Valid Passport Copy', 'UAE Visa Page', 'Address Proof Copy', 'Educational Qualification', 'Trade License'])->get();

        $company_info['documents'] = $company_info['documents']->map(function ($item) {
            return [
                'document_type' => $item->document_type,
                'document_file' => asset($item->document_file),
                'document_file_name' => basename($item->document_file)
            ];
        });

        $company_info['trade_license_documents'] = Document::where(['company_id'=>$company_info->id])->where(['document_type'=>'Trade License'])->first();

        if($company_info['trade_license_documents']){
            $company_info['trade_license_documents'] = [
                'document_file' => asset($company_info['trade_license_documents']->document_file),
                'document_file_name' => basename($company_info['trade_license_documents']->document_file),
            ];
        }

        return Inertia::render('Admin/Application/ApplicationUploadLicense',['company_info'=>$company_info]);


    }

    public function adminuploaddocumentstore(Request $request, $id){
        //

        Company::where(['id'=>$id])->update([
            'application_status'=>'Completed'
        ]);

        $company_info = Company::where(['id'=>$id])->first();

        FormSubmission::updateOrCreate([
            'user_id' => $company_info->user_id,
            'company_id' => $id,
            'step' => 11
        ], [
            'details' => 'Application Updated by Admin and upload license'
        ]);

        $this->sendEmailforApplicationCompletedToFounder($id, $company_info->user_id);

        return redirect(url()->previous());
    }

    public function sendEmailforRejectionsToFounder($id, $user_id, $field_name, $description){

        $user = User::where(['id'=>$user_id])->first();

        $admin = \Spatie\Permission\Models\Role::where('name', 'superadmin')->first()->users->first();

        $data = [
            'subject' => 'Application Rejected - Please Update the Following Documents',
            'view' => 'emails.founders.finalpaymentsuccessful',
            'email' => $user->email,
            'name' => $user->first_name,
            'support_description' => 'If you have any questions, contact us at <a href="'.$admin->email.'">'.$admin->email.'</a> or call us at 04 123 4567.',
            'title' => 'Update Required for Your Application',
            'subtitle' => 'Please update the following documents',
            'description' => "Dear ".$user->first_name.", <br>
            We have received your application, but we need some updates from you. Please update the following documents: ".$field_name." <br>
            Reason for rejection: ".$description." <br>
            You can view your application and its current status by clicking the button below.",
            'button_text' => 'Update Now',
            'link' => route('founder.dashboard.final-review', ['id' => $id]),
            'footer' => '&copy; 2024 Incorpx. All rights reserved.',
        ];

        Mail::to($data['email'])->queue(new NotificationEmailTemplate($data));
    }


    public function sendEmailforApplicationCompletedToFounder($id, $user_id){
        $user = User::where(['id'=>$user_id])->first();
        $admin = \Spatie\Permission\Models\Role::where('name', 'superadmin')->first()->users->first();
        $data = [
            'subject' => 'Application Completed Successfully',
            'view' => 'emails.founders.finalpaymentsuccessful',
            'email' => $user->email,
            'name' => $user->first_name,
            'support_description' => 'If you have any questions, contact us at <a href="'.$admin->email.'">'.$admin->email.'</a> or call us at 04 123 4567.',
            'title' => 'Application Completed Successfully',
            'subtitle' => 'Your Company License is Ready',
            'description' => "Dear ".$user->first_name.", <br>
            Congratulations! Your company license is now ready. You can download your license by clicking the button below.",
            'button_text' => 'Download License',
            'link' => route('founder.dashboard.download-all-documents', ['id' => $id]),
            'footer' => '&copy; 2024 Incorpx. All rights reserved.',
        ];
        Mail::to($data['email'])->queue(new NotificationEmailTemplate($data));
    }
}
