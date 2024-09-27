<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Company;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {


        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        $roles = $user->getRoleNames()->toArray();


        if(in_array('founder',$roles)){
            return redirect()->intended(RouteServiceProvider::FOUNDERHOME);
        }else{
            return redirect()->intended(RouteServiceProvider::HOME);
        }



    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function getagentlist(){

        $allagents = User::role('admin')->get();

        return Inertia::render('Admin/Agents/ViewAgents',['agents'=>$allagents]);
    }

    public function addagent(){

        $user = Auth::user();

        return Inertia::render('Admin/Agents/AddAgents');
    }

    public function editagent($id){

        $agent = User::where(['id'=>$id])->first();

        return Inertia::render('Admin/Agents/AddAgents',['agent'=>$agent]);
    }

    public function dashboard(){
        $dashboard = [];
        $user = Auth::user();
        // DB::enableQueryLog();

        $dashboard['paymentdue'] = Company::whereNull('payment_status')
        ->orWhere('payment_status', 'pending')
        ->count();
        // $queries = DB::getQueryLog();
        // dd($queries);
        $dashboard['todayapplications'] = Company::whereNotIn('application_status', ['pending', null])->whereDate('created_at', today())->count();
        $dashboard['underreview'] = Company::where('application_status','underreview')->count();
        $dashboard['inprogress'] = Company::where('application_status','success')->count();

        // dd($dashboard);

        return Inertia::render('Dashboard',['auth'=> $user,'dashboard'=>$dashboard]);
    }
}
