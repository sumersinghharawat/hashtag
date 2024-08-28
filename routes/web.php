<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FounderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\IndustryController;
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
    if($user){

        $roles = $user->getRoleNames()->toArray();

        $emailsent = false;

        if(Session::has('message')){
            $message = Session::get('message');
            $emailsent = true;
        }


        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'auth'=> ['user'=>$user],
            'roles' => $roles,
            'emailSent' => $emailsent
        ]);
    }else{

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'auth'=> ['user'=>$user],
            'roles' => ''
        ]);

    }
})->name('home');

// Google Authentication
Route::get('auth/google', [RegisteredUserController::class, 'redirectToGoogle'])->name('google.auth');
Route::get('auth/google/callback', [RegisteredUserController::class, 'handleGoogleCallback']);

Route::post('formsubmission', [FormSubmissionController::class, 'store'])->name("formsubmission");




Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function(){
    Route::get('/admin',[AuthenticatedSessionController::class,'dashboard'])->name('dashboard');

    Route::get('/admin/viewrequests',[CompanyController::class,'viewrequests'])->name('admin.dashboard.viewrequests');

    Route::get('/admin/viewleads',[CompanyController::class,'viewleads'])->name('admin.dashboard.viewleads');

    Route::get('/admin/viewrequest/{id}',[FounderController::class,'adminviewsubmitedrequest'])->name('admin.dashboard.viewrequest');

    Route::post('/admin/viewrequest/{id}',[FounderController::class,'adminviewsubmitedrequeststore'])->name('admin.dashboard.viewrequeststore');

    // View Agents
    Route::get('/admin/viewagents',[AuthenticatedSessionController::class,'getagentlist'])->name('admin.dashboard.viewagents');
    Route::get('/admin/addagents',[AuthenticatedSessionController::class,'addagent'])->name('admin.dashboard.addagents');
    Route::get('/admin/editagent/{id}',[AuthenticatedSessionController::class,'editagent'])->name('admin.dashboard.editagent');
    Route::post('/admin/editagent/{id}',[RegisteredUserController::class,'agenteditstore'])->name('admin.dashboard.agenteditstore');

    Route::post('/admin/agentregister',[RegisteredUserController::class,'agentregister'])->name('admin.dashboard.agentregister');

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

    Route::get('/founder/letsbegin',[FounderController::class,'letsbegin'])->name('founder.dashboard.letsbegin');
    Route::post('/founder/letsbegin',[FounderController::class,'letsbeginstore'])->name('founder.dashboard.letsbeginstore');

    Route::get('/founder/companyname',[CompanyController::class,'companyname'])->name('founder.dashboard.companyname');
    Route::post('/founder/companyname',[CompanyController::class,'companynamestore'])->name('founder.dashboard.companynamestore');

    Route::get('/founder/companydetails',[CompanyController::class,'companydetails'])->name('founder.dashboard.companydetails');
    Route::post('/founder/companydetails',[CompanyController::class,'companydetailsstore'])->name('founder.dashboard.companydetailsstore');

    Route::get('/founder/foundersdetail',[FounderController::class,'foundersdetail'])->name('founder.dashboard.foundersdetail');
    Route::post('/founder/founderstore',[FounderController::class,'founderstore'])->name('founder.dashboard.founderstore');
    Route::get('/founder/deletefounder', [FounderController::class, 'founderdelete'])->name('founder.dasshboard.founderdelete');
    Route::post('/founder/founderssplitstore',[FounderController::class,'founderssplitstore'])->name('founder.dashboard.founderssplitstore');

    Route::get('/founder/foundersvisa',[FounderController::class,'foundersvisa'])->name('founder.dashboard.foundersvisa');
    Route::post('/founder/foundersvisastore',[FounderController::class,'foundersvisastore'])->name('founder.dashboard.foundersvisastore');

    Route::get('/founder/summary',[FounderController::class,'summary'])->name('founder.dashboard.summary');
    Route::get('/founder/paynow',[FounderController::class,'paynow'])->name('founder.dashboard.paynow');

    Route::get('/founder/thankyou',[FounderController::class,'thankyou'])->name('founder.dashboard.thankyou');
    Route::get('/founder/viewrequest',[FounderController::class,'founderviewsubmitedrequest'])->name('founder.dashboard.viewrequest');



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
