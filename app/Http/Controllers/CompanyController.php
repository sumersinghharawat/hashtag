<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Http\Controllers\CustomerController;
use App\Models\ApplicationVarification;
use App\Models\Document;
use App\Models\Education;
use App\Models\FormSubmission;
use App\Models\Founder;
use App\Models\Industry;
use App\Models\JobTitle;
use App\Models\Packages;
use App\Models\User;
use Illuminate\Console\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use ZipArchive;

class CompanyController extends Controller
{
    public function __construct()
    {

    }
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

    public function companyformsubmission(){

    }

    public function companyname(Request $request, $id=null){

        $id = $request->id;

        $step = 1;

        $user = Auth::user();

        $company = Company::where(['id'=>$id])->first();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        if($user->country_of_residenace){
            if($company){
                $last_step = $this->getCompletedLastStep($user->id, $id);
                return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step, 'company_id'=>$id, 'company_info'=>$company, 'registration_completed_step'=> $last_step, 'company_count'=>$companyRegistrationCount]);
            }else{
                return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step, 'company_id'=>$id, 'registration_completed_step'=> 1, 'company_count'=>$companyRegistrationCount]);
            }
        }else{
            return redirect(route('founder.dashboard.letsbegin'));
        }
    }

    public function companynamestore(Request $request){
        $step = 1;

        $user = Auth::user();

        if(isset($request->company_id)){
            $company_id = $request->company_id;

            $company = Company::where(['id'=>$company_id])->first();

            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$company->id, 'step'=>$step])->update(['details'=>'Company name updated by customer']);
        }else{
            $company = Company::create(['user_id'=>$user->id]);

            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$company->id, 'details'=>'Company name added by customer','step'=>$step]);
        }

        $request->validate([
            'company_name_1' => 'required|string|max:255',
            'company_name_2' => 'required|string|max:255',
            'company_name_3' => 'required|string|max:255'
        ]);

        Company::where(['user_id'=>$user->id, 'id'=>$company->id])->update([
            'company_name_1' => $request->company_name_1,
            'company_name_2' => $request->company_name_2,
            'company_name_3' => $request->company_name_3,
            'user_id' => $user->id,
            'country' => $user->country_of_residenace
        ]);

        return redirect(route('founder.dashboard.companydetails', ['id'=>$company->id]));
    }

    public function companydetails(Request $request){

        $id = $request->id;

        $user = Auth::user();

        $step = 2;

        $last_step = $this->getCompletedLastStep($user->id, $id);

        $listIndustiesData = Industry::select(['name'])->get();

        $listIndusties[] = ["name" => "Select Industry"];

        foreach($listIndustiesData as $listIndusty){
            $listIndusties[] = ["name"=> $listIndusty->name];
        }

        $company_info = Company::where(['user_id'=>$user->id,'id'=>$id])->first();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/StepsForm/CompanyDetails',['auth' =>fn () =>  ["user"=>$user],'step'=>fn () => $step,'registration_completed_step'=>$last_step,'listindusties'=>fn () => $listIndusties,'company_info'=>fn () => $company_info, 'company_count'=>$companyRegistrationCount]);

    }

    public function companydetailsstore(Request $request, $id){

        $user = Auth::user();

        $step = 2;

        $last_step = $this->getCompletedLastStep($user->id, $id);

        $request->validate([
            'company_industry' => 'required|string|max:255',
            'company_description' => 'required|string|min:20|max:255',
        ]);

        $company_id = Company::where(['user_id'=>$user->id])->update([
            'user_id'=>$user->id,
            'industry' => $request->company_industry,
            'description' => $request->company_description,
            'country' => $user->country_of_residenace,
        ]);

        if($step < $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$company_id, 'step'=>$step])->update(['details'=>'Company details updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$company_id, 'details'=>'Company details added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.foundersdetail', ['id'=>$id]));
    }

    public function viewrequests(){

        $user = Auth::user();

        $companies = Company::all();

        foreach($companies as $index => $company){
            $founders = Founder::where(['user_id'=>$company->user_id, 'company_id'=>$company->id])->get();
            $company['founders'] = $founders;

            $agent_id = 0;
            $agent_id = ApplicationVarification::where(['company_id'=>$company->id])->select('agent_id')->first();

            if(isset($agent_id->agent_id)){
                $company['assign_agent_details'] = User::where(['id'=>$agent_id->agent_id])->first();
            }else{
                $company['assign_agent_details'] = null;
            }
        }

        return Inertia::render('Admin/ViewSubmitedRequestList',['auth'=>$user,'companyrequests'=>$companies]);
    }

    public function viewleads(){

        $user = Auth::user();

        $companies = Company::where(['status'=>0])->orWhere(['status'=>null])->get();


        foreach($companies as $index => $company){

            $founders = Founder::where(['user_id'=>$company->user_id])->get();
            $company['founders'] = $founders;
        }

        return Inertia::render('Admin/ViewSubmitedLeadList',['auth'=>$user,'companyleads'=>$companies]);

    }

    public function newcompanysetup(){
        $step = 1;

        $user = Auth::user();

        return Inertia::render('Founder/StepsForm/CompanyName',['auth' => fn () => ["user"=>$user],'step'=>fn () => $step]);
    }


    // Check Form Current Step
    public function getCompletedLastStep($user_id, $company_id){

        $completedSteps = FormSubmission::where(['user_id'=>$user_id, 'company_id'=>$company_id])->select('step')->get();

        // $completedSteps

        $stepList = [];
        foreach($completedSteps as $completedStep){
            $stepList[] = $completedStep->step;
        }
        if($stepList){
            return $last_step = max($stepList);
        }else{
            return 1;
        }
    }

    public function deletecomapnyregistration(Request $request, $id){

        Company::where(['id'=>$id])->delete();

        FormSubmission::where(['company_id'=>$id])->delete();

        return redirect(route('founder.dashboard.applications'));

    }


    // Phase 2
    public function reviewregistration($id){
        $step = 7;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);


        $listIndustiesData = Industry::select(['name'])->get();

        $listIndusties[] = ["name" => "Select Industry"];

        foreach($listIndustiesData as $listIndusty){
            $listIndusties[] = ["name"=> $listIndusty->name];
        }

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $totalSplits = 0;

        foreach($founders as $founder){
            $totalSplits = $totalSplits + $founder->ownership_percentage;
        }

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/PhaseTwo/FormOverview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info,'listindusties'=>fn () => $listIndusties, 'totalSplits'=>$totalSplits, 'company_count'=>$companyRegistrationCount]);
    }

    public function reviewregistrationstore(Request $request, $id){

        $step = 7;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        // Update Company Name
        $request->validate([
            'company_name_1' => 'required|string|max:255',
            'company_name_2' => 'required|string|max:255',
            'company_name_3' => 'required|string|max:255',
            'company_industry' => 'required|string|max:255',
            'company_description' => 'required|string|min:20|max:255',
        ]);

        Company::where(['user_id'=>$user->id, 'id'=>$company_info->id])->update([
            'company_name_1' => $request->company_name_1,
            'company_name_2' => $request->company_name_2,
            'company_name_3' => $request->company_name_3,
        ]);

        // Update Company Details
        Company::where(['user_id'=>$user->id])->update([
            'industry' => $request->company_industry,
            'description' => $request->company_description,
        ]);

        // Update Founder Details
        $founder_list = $request->foundersList;

        foreach ($founder_list as $founder_list_Key => $founder_list_value) {
            Founder::where(['id'=>$founder_list_value['id']])->update([
                'first_name'=>$founder_list_value['first_name'],
                'last_name'=>$founder_list_value['last_name'],
                'manager'=>$founder_list_value['manager'],
                'ownership_percentage'=>$founder_list_value['ownership_percentage'],
                'visa_status'=>$founder_list_value['visa_status']?$founder_list_value['visa_status']:0,
            ]);
        }

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company details updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company details added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.general-document',$id));
    }

    public function generaldocument($id){

        $step = 8;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $ducomentbusinessplan = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>0, 'document_type'=>'Business Plan'])->first();
        $company_info['documentBusinessPlanFileName'] = $ducomentbusinessplan?basename($ducomentbusinessplan->document_file):null;
        $company_info['documentBusinessPlanFileUrl'] = $ducomentbusinessplan?asset($ducomentbusinessplan->document_file):null;

        $ducomentotherdocument = Document::where(['user_id'=>$user->id, 'company_id'=>$id, 'founder_id'=>0, 'document_type'=>'Other Document'])->first();
        $company_info['documentOtherDocumentFileName'] = $ducomentotherdocument?basename($ducomentotherdocument->document_file):null;
        $company_info['documentOtherDocumentFileUrl'] = $ducomentotherdocument?asset($ducomentotherdocument->document_file):null;

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/PhaseTwo/GeneralDocuments',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'company_count'=>$companyRegistrationCount]);

    }

    public function generaldocumentstore(Request $request, $id){

        $request->validate([
            'BusinessPlanFile' => 'required|string',
            'OtherDocumentFile' => 'required|string',
        ]);

        $step = 8;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $documents = Document::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        foreach($documents as $document){
            $document->document_file = asset($document->document_file);
            $document->document_file_name = basename($document->document_file);
        }

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company document updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company document added by customer','step'=>$step]);
        }

        return redirect(route('founder.dashboard.shareholder-details',$id));

    }

    public function finalpayment($id){

        $step = 10;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $founder_visa = 0;

        foreach($founders as $founder){
            $founder_visa += (Integer) $founder->visa_status==1?1:0;
        }

        $packagesWithVariants = Packages::where('status', 1)
        ->whereHas('variants', function ($query) use ($founder_visa) {
            $query->where(function ($query) use ($founder_visa) {
                $query->where('variant_type', 'visa')
                      ->where('visa_count', $founder_visa);
            })->orWhere(function ($query) {
                $query->where('variant_type', 'license')
                      ->whereNull('visa_count');
            });
        })
        ->with(['variants' => function ($query) use ($founder_visa) {
            $query->where(function ($query) use ($founder_visa) {
                $query->where('variant_type', 'visa')
                      ->where('visa_count', $founder_visa);
            })->orWhere(function ($query) {
                $query->where('variant_type', 'license')
                      ->whereNull('visa_count');
            });
        }])
        ->get();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        return Inertia::render('Founder/PhaseTwo/FinalPayment',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info, 'packages_with_variants'=>$packagesWithVariants, 'company_count'=>$companyRegistrationCount]);
    }

    public function storefinalpayment(Request $request,$id){

        $request->validate([
            'selectedPackage' => 'required',
        ],
        [
            'required' => 'Please select any package.',
        ]);

        $step = 10;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        Company::where(['user_id'=>$user->id,'id'=>$id])->update([
            'package'=>$request->selectedPackage,
            'second_payment_status'=>'success',
            'application_status'=>'Under Review'
        ]);

        if($step <= $last_step){
            $form = FormSubmission::where(['user_id'=>$user->id, 'company_id'=>$id, 'step'=>$step])->update(['details'=>'Company final payment updated by customer']);
        }else{
            $form = FormSubmission::create(['user_id'=>$user->id, 'company_id'=>$id, 'details'=>'Company final payment added by customer','step'=>$step]);
        }

        $founders = Founder::where(['user_id'=>$user->id,'company_id'=>$id])->get();
        $documents = Document::where(['user_id'=>$user->id,'company_id'=>$id])->get();
        $company = Company::where(['user_id'=>$user->id,'id'=>$id])->first();

        foreach($founders as $founder){
            ApplicationVarification::updateOrCreate([
                'user_id'=>$user->id,
                'company_id'=>$id,
                'founder_id'=>$founder->id,
                'application_form_field_name'=>'manager',
            ],[
                'application_form_field_value'=>$founder->manager,
                'varification_status'=>'Under Review',
            ]);

            // ApplicationVarification::updateOrCreate([
            //     'user_id'=>$user->id,
            //     'company_id'=>$id,
            //     'founder_id'=>$founder->id,
            //     'application_form_field_name'=>'ownership_percentage',
            // ],[
            //     'application_form_field_value'=>$founder->ownership_percentage,
            //     'varification_status'=>'pending',
            // ]);

            ApplicationVarification::updateOrCreate([
                'user_id'=>$user->id,
                'company_id'=>$id,
                'founder_id'=>$founder->id,
                'application_form_field_name'=>'visa_status',
            ],[
                'application_form_field_value'=>$founder->visa_status,
                'varification_status'=>'Under Review',
            ]);
        }

        foreach($documents as $document){
            if($document->document_type == 'Valid Passport Copy' || $document->document_type == 'UAE Visa Page' || $document->document_type == 'Address Proof Copy' || $document->document_type == 'Educational Qualification'){
                ApplicationVarification::updateOrCreate([
                    'user_id'=>$user->id,
                    'company_id'=>$id,
                    'founder_id'=>$document->founder_id,
                    'application_form_field_name'=>$document->document_type,
                ],[
                    'application_form_field_value'=>$document->document_file,
                    'varification_status'=>'Under Review',
                ]);
            }else{
                ApplicationVarification::updateOrCreate([
                    'user_id'=>$user->id,
                    'company_id'=>$id,
                    'founder_id'=>null,
                    'application_form_field_name'=>$document->document_type,
                ],[
                    'application_form_field_value'=>$document->document_file,
                    'varification_status'=>'Under Review',
                ]);
            }
        }

        ApplicationVarification::updateOrCreate([
            'user_id'=>$user->id,
            'company_id'=>$id,
            'founder_id'=>null,
            'application_form_field_name'=>'company_name_1',
        ],[
            'application_form_field_value'=>$company->company_name_1,
            'varification_status'=>'Under Review',
        ]);

        ApplicationVarification::updateOrCreate([
            'user_id'=>$user->id,
            'company_id'=>$id,
            'founder_id'=>null,
            'application_form_field_name'=>'company_name_2',
        ],[
            'application_form_field_value'=>$company->company_name_2,
            'varification_status'=>'Under Review',
        ]);

        ApplicationVarification::updateOrCreate([
            'user_id'=>$user->id,
            'company_id'=>$id,
            'founder_id'=>null,
            'application_form_field_name'=>'company_name_3',
        ],[
            'application_form_field_value'=>$company->company_name_3,
            'varification_status'=>'Under Review',
        ]);

        ApplicationVarification::updateOrCreate([
            'user_id'=>$user->id,
            'company_id'=>$id,
            'founder_id'=>null,
            'application_form_field_name'=>'industry',
        ],[
            'application_form_field_value'=>$company->industry,
            'varification_status'=>'Under Review',
        ]);

        ApplicationVarification::updateOrCreate([
            'user_id'=>$user->id,
            'company_id'=>$id,
            'founder_id'=>null,
            'application_form_field_name'=>'description',
        ],[
            'application_form_field_value'=>$company->description,
            'varification_status'=>'Under Review',
        ]);

        return redirect(route('founder.dashboard.final-review',$id));
    }

    public function finalreview($id){

        $step = 11;

        $user = Auth::user();

        $company_info = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);

        $founders = Founder::where(['user_id'=>$user->id, 'company_id'=>$id])->get();

        $companyRegistrationCount = Company::where(['user_id'=>$user->id, 'first_payment_status'=>'success'])->count();

        $rejectedFields = ApplicationVarification::where(['user_id'=>$user->id, 'company_id'=>$id, 'varification_status'=>'Rejected'])->get();

        $founder_rejected_fields = [];
        $company_rejected_fields = [];
        $index = 0;
        $rejectedField_founder_id = 0;
        foreach($rejectedFields as $rejectedField){
            if($rejectedField->founder_id){
                $document = Document::where(['company_id'=>$id, 'founder_id'=>$rejectedField->founder_id, 'document_type'=>$rejectedField->application_form_field_name])->first();
                $rejectedField->document = $document?$document:null;
                $founder_rejected_fields[$rejectedField->founder_id]['rejected_fields'][] = $rejectedField;
                $founder_rejected_fields[$rejectedField->founder_id]['founder_details'] = Founder::where(['id'=>$rejectedField->founder_id])->first();
            }else{
                $document = Document::where(['company_id'=>$id, 'founder_id'=>0, 'document_type'=>$rejectedField->application_form_field_name])->first();
                $rejectedField->document = $document?$document:null;
                $company_rejected_fields[] = $rejectedField;
            }
        }

        $rejectedFields = array_merge(['company_rejected_fields'=>$company_rejected_fields], ['founder_rejected_fields'=>array_values($founder_rejected_fields)]);

        $listIndustiesData = Industry::select(['name'])->get();

        $listIndusties[] = ["name" => "Select Industry"];

        foreach($listIndustiesData as $listIndusty){
            $listIndusties[] = ["name"=> $listIndusty->name];
        }



        // ->with(['founder'=>function($query){
        //     $query->select('id','first_name','last_name','manager','ownership_percentage','visa_status');
        // },'company'=>function($query){
        //     $query->select('id','company_name_1','company_name_2','company_name_3','industry','description','package');
        // },'document'=>function($query){
        //     $query->whereIn('document_type', ApplicationVarification::get('application_form_field_name'));
        // }])->get();

        return Inertia::render('Founder/PhaseTwo/UnderReview',['auth' => fn () => ["user"=>$user], 'foundersList'=>fn () => $founders,'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company_info,  'company_count'=>$companyRegistrationCount, 'rejectedFields'=>$rejectedFields, 'listindusties'=>$listIndusties]);

    }

    public function checkformsteptoredirect($id){
        $user = Auth::user();
        $company_info = Company::where(['id'=>$id])->first();
        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company_info->id);
    }

    public function downloadtradelicense($id){

        $step = 12;

        $user = Auth::user();

        $company = Company::where(['id'=>$id])->first();

        $last_step = (new CompanyController)->getCompletedLastStep($user->id, $company->id);

        $document = Document::where(['user_id'=>$user->id, 'company_id'=>$company->id, 'founder_id'=>0, 'document_type'=>'Trade License'])->first();

        return Inertia::render('Founder/PhaseTwo/DownloadLicense',['auth' => fn () => ["user"=>$user],'step'=>$step,'registration_completed_step'=>$last_step, 'company_info'=>$company]);
    }

    public function downloadalldocuments($id){

        $user = Auth::user();
        $company_info = Company::where(['id'=>$id])->first();

        $documents = Document::where(['company_id'=>$company_info->id])->whereNotIn('document_type',['Business Plan', 'Other Document', 'Valid Passport Copy', 'UAE Visa Page', 'Address Proof Copy', 'Educational Qualification'])->get();

        try {
            $zipFolder = storage_path('app/public/company-documents/company-id-'.$company_info->id);

            if (!file_exists($zipFolder)) {
                mkdir($zipFolder, 0777, true);
            }

            $zipFile = $zipFolder . '/documents.zip';

            if (!file_exists($zipFile)) {
                touch($zipFile);
            }

            $zip = new ZipArchive;

            if ($zip->open($zipFile, ZipArchive::CREATE) !== TRUE) {
                return response()->json(['error' => 'Unable to create zip file'], 500);
            }


            foreach ($documents as $document) {

                // dd(storage_path('/app/public/document/'.'company-id-'.$company_info->id.'/'.$document->document_file));

                $documentFilePath = storage_path('app/public/document/company-id-'.$company_info->id.'/'.basename($document->document_file));

                if (file_exists($documentFilePath)) {
                    $fileName = basename($document->document_file);
                    $zip->addFile($documentFilePath, $fileName);
                }
            }

            // $zip->close();
            // dd($zipFile);
            if (file_exists($zipFile)) {

                $downloadableZip = asset('storage/company-documents/company-id-'.$company_info->id.'/documents.zip');

                return Inertia::location($downloadableZip, 200, [], ['Content-Type'=>'application/zip', 'Content-Disposition'=>'inline; filename="documents.zip"']);
            } else {
                return response()->json(['error file' => 'The file "'.$zipFile.'" does not exist'], 500);
            }
        } catch (\Exception $e) {
            // Handle the error here
            return response()->json(['try catch error' => $e->getMessage()], 500);
        }

    }
}
