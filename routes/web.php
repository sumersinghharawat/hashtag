<?php

use App\Http\Controllers\ApplicationVarificationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FounderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\PackagesController;
use App\Http\Controllers\VariantController;
use App\Models\Packages;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $user = Auth::user();


    $emailsent = false;

    if(Session::has('message')){
        $message = Session::get('message');
        $emailsent = true;
    }

    $packages = Packages::with('variants')->get();

    if($user){

        $roles = $user->getRoleNames()->toArray();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'auth'=> ['user'=>$user],
            'roles' => $roles,
            'emailSent' => $emailsent,
            'packages' => $packages
        ]);

    }else{

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'auth'=> ['user'=>$user],
            'roles' => '',
            'emailSent' => $emailsent,
            'packages' => $packages
        ]);

    }
})->name('home');

// Google Authentication
Route::get('auth/google', [RegisteredUserController::class, 'redirectToGoogle'])->name('google.auth');
Route::get('auth/google/callback', [RegisteredUserController::class, 'handleGoogleCallback']);

// Form Submission
Route::post('formsubmission', [FormSubmissionController::class, 'store'])->name("formsubmission");



// Admin
Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function(){
    Route::get('/admin',[AuthenticatedSessionController::class,'dashboard'])->name('dashboard');

    Route::get('/admin/viewrequests',[CompanyController::class,'viewrequests'])->name('admin.dashboard.viewrequests');

    Route::get('/admin/viewleads',[CompanyController::class,'viewleads'])->name('admin.dashboard.viewleads');

    Route::get('/admin/viewrequest/{id}/general-information',[ApplicationVarificationController::class,'adminviewsubmitedrequest'])->name('admin.dashboard.viewrequestinformation');

    Route::get('/admin/viewrequest/{id}/general-document',[ApplicationVarificationController::class,'adminviewsubmitedrequestdocument'])->name('admin.dashboard.viewrequestdocument');

    Route::get('/admin/viewrequest/{id}/shareholder-details',[ApplicationVarificationController::class,'adminviewsubmitedrequestshareholder'])->name('admin.dashboard.viewrequestshareholder');

    Route::put('/admin/viewrequest/{id}',[ApplicationVarificationController::class,'adminviewsubmitedrequestupdate'])->name('admin.dashboard.viewrequestupdate');

    Route::post('/admin/viewrequest/{id}',[FounderController::class,'adminviewsubmitedrequeststore'])->name('admin.dashboard.viewrequeststore');

    // View Agents
    Route::get('/admin/viewagents',[AuthenticatedSessionController::class,'getagentlist'])->name('admin.dashboard.viewagents');
    Route::get('/admin/addagents',[AuthenticatedSessionController::class,'addagent'])->name('admin.dashboard.addagents');
    Route::get('/admin/editagent/{id}',[AuthenticatedSessionController::class,'editagent'])->name('admin.dashboard.editagent');
    Route::post('/admin/editagent/{id}',[RegisteredUserController::class,'agenteditstore'])->name('admin.dashboard.agenteditstore');

    // Agent Registration
    Route::post('/admin/agentregister',[RegisteredUserController::class,'agentregister'])->name('admin.dashboard.agentregister');

    // Packages
    Route::get('/admin/packagesofproduct',[PackagesController::class,'show'])->name('admin.dashboard.packagesofproduct');
    Route::get('/admin/addpackagesofproduct',[PackagesController::class,'create'])->name('admin.dashboard.addpackagesofproduct');
    Route::post('/admin/addpackagesofproduct',[PackagesController::class,'store'])->name('admin.dashboard.storepackagesofproduct');
    Route::get('/admin/addpackagesofproduct/{id}',[PackagesController::class,'edit'])->name('admin.dashboard.editpackagesofproduct');
    Route::put('/admin/addpackagesofproduct/{id}',[PackagesController::class,'update'])->name('admin.dashboard.updatepackagesofproduct');
    Route::patch('/admin/addpackagesofproduct/{id}',[PackagesController::class,'updatestatus'])->name('admin.dashboard.updatestatuspackagesofproduct');
    Route::get('/admin/deletepackagesofproduct/{id}',[PackagesController::class,'destroy'])->name('admin.dashboard.destroypackagesofproduct');

    // Variants
    Route::get('/admin/{package_id}/variantofproduct',[VariantController::class,'show'])->name('admin.dashboard.variantofproduct');
    Route::get('/admin/{package_id}/addvariantofproduct',[VariantController::class,'create'])->name('admin.dashboard.addvariantofproduct');
    Route::post('/admin/{package_id}/addvariantofproduct',[VariantController::class,'store'])->name('admin.dashboard.storevariantofproduct');
    Route::get('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'edit'])->name('admin.dashboard.editvariantofproduct');
    Route::put('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'update'])->name('admin.dashboard.updatevariantofproduct');
    Route::patch('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'updatestatus'])->name('admin.dashboard.updatestatusvariantofproduct');
    Route::get('/admin/{package_id}/deletevariantofproduct/{id}',[VariantController::class,'destroy'])->name('admin.dashboard.destroyvariantofproduct');

    // Industry
    Route::get('/admin/viewindustry',[IndustryController::class,'show'])->name('admin.dashboard.viewindustry');
    Route::get('/admin/addindustry',[IndustryController::class,'create'])->name('admin.dashboard.addindustry');
    Route::post('/admin/addindustry',[IndustryController::class,'store'])->name('admin.dashboard.storeindustry');
    Route::get('/admin/addindustry/{id}',[IndustryController::class,'edit'])->name('admin.dashboard.editindustry');
    Route::put('/admin/addindustry/{id}',[IndustryController::class,'update'])->name('admin.dashboard.updateindustry');
    Route::get('/admin/deleteindustry/{id}',[IndustryController::class,'destroy'])->name('admin.dashboard.destroyindustry');

    Route::get('/admin/forms',[FormSubmissionController::class,'show'])->name('admin.dashboard.forms');

});


// Agent


Route::middleware(['auth', 'verified', 'role:agent'])->group(function(){
    Route::get('/admin',[AuthenticatedSessionController::class,'dashboard'])->name('dashboard');

    Route::get('/admin/viewrequests',[CompanyController::class,'viewrequests'])->name('admin.dashboard.viewrequests');

    Route::get('/admin/viewleads',[CompanyController::class,'viewleads'])->name('admin.dashboard.viewleads');

    // Application Verification Routes
    Route::get('/admin/viewrequest/{id}/general-information',[ApplicationVarificationController::class,'adminviewsubmitedrequest'])->name('admin.dashboard.viewrequestinformation');
    Route::get('/admin/viewrequest/{id}/general-document',[ApplicationVarificationController::class,'adminviewsubmitedrequestdocument'])->name('admin.dashboard.viewrequestdocument');
    Route::get('/admin/viewrequest/{id}/shareholder-details',[ApplicationVarificationController::class,'adminviewsubmitedrequestshareholder'])->name('admin.dashboard.viewrequestshareholder');
    Route::get('/admin/viewrequest/{id}/upload-document-view',[ApplicationVarificationController::class,'adminuploaddocumentview'])->name('admin.dashboard.adminuploaddocumentview');
    Route::put('/admin/viewrequest/{id}/upload-document-view',[ApplicationVarificationController::class,'adminuploaddocumentstore'])->name('admin.dashboard.adminuploaddocumentstore');

    Route::put('/admin/viewrequest/{id}',[ApplicationVarificationController::class,'adminviewsubmitedrequestupdate'])->name('admin.dashboard.viewrequestupdate');
    Route::post('/admin/viewrequest/{id}',[FounderController::class,'adminviewsubmitedrequeststore'])->name('admin.dashboard.viewrequeststore');
    Route::get('/admin/assignapplication/{id}',[ApplicationVarificationController::class,'adminassignapplicationtoagent'])->name('admin.dashboard.assignapplication');

    // View Agents
    // Route::get('/admin/viewagents',[AuthenticatedSessionController::class,'getagentlist'])->name('admin.dashboard.viewagents');
    // Route::get('/admin/addagents',[AuthenticatedSessionController::class,'addagent'])->name('admin.dashboard.addagents');
    // Route::get('/admin/editagent/{id}',[AuthenticatedSessionController::class,'editagent'])->name('admin.dashboard.editagent');
    // Route::post('/admin/editagent/{id}',[RegisteredUserController::class,'agenteditstore'])->name('admin.dashboard.agenteditstore');
    // Route::post('/admin/agentregister',[RegisteredUserController::class,'agentregister'])->name('admin.dashboard.agentregister');

    // Packages
    Route::get('/admin/packagesofproduct',[PackagesController::class,'show'])->name('admin.dashboard.packagesofproduct');
    Route::get('/admin/addpackagesofproduct',[PackagesController::class,'create'])->name('admin.dashboard.addpackagesofproduct');
    Route::post('/admin/addpackagesofproduct',[PackagesController::class,'store'])->name('admin.dashboard.storepackagesofproduct');
    Route::get('/admin/addpackagesofproduct/{id}',[PackagesController::class,'edit'])->name('admin.dashboard.editpackagesofproduct');
    Route::put('/admin/addpackagesofproduct/{id}',[PackagesController::class,'update'])->name('admin.dashboard.updatepackagesofproduct');
    Route::patch('/admin/addpackagesofproduct/{id}',[PackagesController::class,'updatestatus'])->name('admin.dashboard.updatestatuspackagesofproduct');
    Route::get('/admin/deletepackagesofproduct/{id}',[PackagesController::class,'destroy'])->name('admin.dashboard.destroypackagesofproduct');

    // Variants
    Route::get('/admin/{package_id}/variantofproduct',[VariantController::class,'show'])->name('admin.dashboard.variantofproduct');
    Route::get('/admin/{package_id}/addvariantofproduct',[VariantController::class,'create'])->name('admin.dashboard.addvariantofproduct');
    Route::post('/admin/{package_id}/addvariantofproduct',[VariantController::class,'store'])->name('admin.dashboard.storevariantofproduct');
    Route::get('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'edit'])->name('admin.dashboard.editvariantofproduct');
    Route::put('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'update'])->name('admin.dashboard.updatevariantofproduct');
    Route::patch('/admin/{package_id}/addvariantofproduct/{id}',[VariantController::class,'updatestatus'])->name('admin.dashboard.updatestatusvariantofproduct');
    Route::get('/admin/{package_id}/deletevariantofproduct/{id}',[VariantController::class,'destroy'])->name('admin.dashboard.destroyvariantofproduct');

    // Industry
    Route::get('/admin/viewindustry',[IndustryController::class,'show'])->name('admin.dashboard.viewindustry');
    Route::get('/admin/addindustry',[IndustryController::class,'create'])->name('admin.dashboard.addindustry');
    Route::post('/admin/addindustry',[IndustryController::class,'store'])->name('admin.dashboard.storeindustry');
    Route::get('/admin/addindustry/{id}',[IndustryController::class,'edit'])->name('admin.dashboard.editindustry');
    Route::put('/admin/addindustry/{id}',[IndustryController::class,'update'])->name('admin.dashboard.updateindustry');
    Route::get('/admin/deleteindustry/{id}',[IndustryController::class,'destroy'])->name('admin.dashboard.destroyindustry');

    Route::get('/admin/forms',[FormSubmissionController::class,'show'])->name('admin.dashboard.forms');

});

// Founder Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function (){
    Route::get('/founder',[FounderController::class,'index'])->name('founder.dashboard');
    Route::get('/founder-profile',[ProfileController::class,'editFounder'])->name('founder.dashboard.editprofile');

    // Let's begin
    Route::get('/founder/letsbegin',[FounderController::class,'letsbegin'])->name('founder.dashboard.letsbegin');
    Route::post('/founder/letsbegin',[FounderController::class,'letsbeginstore'])->name('founder.dashboard.letsbeginstore');

    // Company Details
    Route::get('/founder/companyname',[CompanyController::class,'companyname'])->name('founder.dashboard.companyname');
    Route::get('/founder/companyname/{id}',[CompanyController::class,'companyname'])->name('founder.dashboard.companynameupdate');
    Route::put('/founder/companyname/{id}',[CompanyController::class,'companynamestore'])->name('founder.dashboard.companynamestoreandupdate');
    Route::post('/founder/companyname/{id}',[CompanyController::class,'companynamestore'])->name('founder.dashboard.companynamestore');

    Route::get('/founder/companydetails/{id}',[CompanyController::class,'companydetails'])->name('founder.dashboard.companydetails');
    Route::put('/founder/companydetails/{id}',[CompanyController::class,'companydetailsstore'])->name('founder.dashboard.companydetailsstore');

    // Company Registration Delete
    Route::delete('/founder/companydelete/{id}',[CompanyController::class,'deletecomapnyregistration'])->name('founder.dashboard.companydelete');

    // Founder Details
    Route::get('/founder/foundersdetail/{id}',[FounderController::class,'foundersdetail'])->name('founder.dashboard.foundersdetail');
    Route::post('/founder/founderstore/{id}',[FounderController::class,'founderstore'])->name('founder.dashboard.founderstore');

    Route::get('/founder/deletefounder/{id}/{founder_id}', [FounderController::class, 'founderdelete'])->name('founder.dasshboard.founderdelete');
    Route::post('/founder/founderssplitstore/{id}',[FounderController::class,'founderssplitstore'])->name('founder.dashboard.founderssplitstore');

    // Founder Visa Status
    Route::get('/founder/foundersvisa/{id}',[FounderController::class,'foundersvisa'])->name('founder.dashboard.foundersvisa');
    Route::post('/founder/foundersvisastore/{id}',[FounderController::class,'foundersvisastore'])->name('founder.dashboard.foundersvisastore');

    Route::get('/founder/summary/{id}',[FounderController::class,'summary'])->name('founder.dashboard.summary');
    Route::get('/founder/paynow/{id}',[FounderController::class,'paynow'])->name('founder.dashboard.paynow');

    Route::get('/founder/thankyou/{id}',[FounderController::class,'thankyou'])->name('founder.dashboard.thankyou');
    Route::get('/founder/applications',[FounderController::class,'applications'])->name('founder.dashboard.applications');

    Route::get('/founder/support',[FounderController::class,'support'])->name('founder.dashboard.support');

    Route::get('/founder/dashboard',[FounderController::class,'founderviewdashboard'])->name('founder.dashboard.index');

    // Phase 2
    Route::get('/founder/review-registration/{id}',[CompanyController::class,'reviewregistration'])->name('founder.dashboard.review-registration');
    Route::get('/founder/deletefounderphase2/{id}/{founder_id}', [FounderController::class, 'founderdeletephase2'])->name('founder.dasshboard.founderdeletephase2');

    Route::put('/founder/review-registration/{id}',[CompanyController::class,'reviewregistrationstore'])->name('founder.dashboard.review-registrationstore');

    Route::get('/founder/general-document/{id}',[CompanyController::class,'generaldocument'])->name('founder.dashboard.general-document');
    Route::put('/founder/general-document/{id}',[CompanyController::class,'generaldocumentstore'])->name('founder.dashboard.general-documentstore');

    Route::get('/founder/shareholder-details/{id}',[FounderController::class,'shareholderdetails'])->name('founder.dashboard.shareholder-details');
    Route::put('/founder/shareholder-details/{id}',[FounderController::class,'shareholderdetailsstore'])->name('founder.dashboard.shareholder-detailsstore');


    Route::get('/founder/final-payment/{id}',[CompanyController::class,'finalpayment'])->name('founder.dashboard.final-payment');
    Route::put('/founder/final-payment/{id}',[CompanyController::class,'storefinalpayment'])->name('founder.dashboard.store-final-payment');

    Route::post('/founder/upload-document/{id}',[DocumentController::class,'uploaddocumentstore'])->name('founder.dashboard.upload-document');
    Route::delete('/founder/upload-document/{id}',[DocumentController::class,'uploaddocumentdelete'])->name('founder.dashboard.upload-documentdelete');

    // Final Review
    Route::get('/founder/final-review/{id}',[CompanyController::class,'finalreview'])->name('founder.dashboard.final-review');
    Route::post('/founder/updaterejecteddetails/{id}',[ApplicationVarificationController::class,'updaterejecteddetails'])->name('founder.dashboard.updaterejecteddetails');

    // Download Trade License
    Route::get('/founder/download-trade-license/{id}',[CompanyController::class,'downloadtradelicense'])->name('founder.dashboard.download-trade-license');

    // Download All Documents
    Route::get('/founder/download-all-documents/{id}',[CompanyController::class,'downloadalldocuments'])->name('founder.dashboard.download-all-documents');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Country

Route::get('/country-list', function () {
    $contents = File::get(base_path('/resources/json/country.json'));
    return $json = json_decode(json: $contents, associative: true);
});

require __DIR__.'/auth.php';
