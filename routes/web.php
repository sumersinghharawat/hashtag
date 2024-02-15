<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FounderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Google Authentication
Route::get('auth/google', [RegisteredUserController::class, 'redirectToGoogle'])->name('google.auth');
Route::get('auth/google/callback', [RegisteredUserController::class, 'handleGoogleCallback']);

Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function(){
    Route::get('/admin', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/admin/viewrequests',[CompanyController::class,'viewrequests'])->name('admin.dashboard.viewrequest');
});

// Founder Dashboard Routes
Route::middleware(['auth', 'verified', 'role:founder'])->group(function (){
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
    Route::get('/founder/viewrequest',[FounderController::class,'viewsubmitedrequest'])->name('founder.dashboard.viewrequest');



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
