<?php

use App\Http\Controllers\CustomerController;
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

Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'role:superadmin'])->name('dashboard');

// Founder Dashboard Routes
Route::middleware(['auth', 'verified', 'role:founder'])->group(function (){
    Route::get('/founder',[CustomerController::class,'index'])->name('founder.dashboard');

    Route::get('/founder/letsbegin',[CustomerController::class,'letsbegin'])->name('founder.dashboard.letsbegin');
    Route::post('/founder/letsbegin',[CustomerController::class,'letsbeginstore'])->name('founder.dashboard.letsbeginstore');

    Route::get('/founder/companyname',[CompanyController::class,'companyname'])->name('founder.dashboard.companyname');
    Route::post('/founder/letsbegin',[CustomerController::class,'letsbeginstore'])->name('founder.dashboard.letsbeginstore');
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
