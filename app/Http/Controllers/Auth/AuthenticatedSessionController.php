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


        $user->assignRole('agent');

        $user->givePermissionTo(['edit applications', 'view applications']);

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

        $allagents = User::role('agent')->whereNotIn('id', [1])->with('permissions')->get();

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

        $dashboard['paymentdue'] = Company::whereNull('second_payment_status')
        ->orWhere('second_payment_status', 'Pending')
        ->count();

        $dashboard['todayapplications'] = Company::whereNot('application_status','Pending')->whereDate('created_at', today())->count();
        $dashboard['underreview'] = Company::where('application_status','Under Process')->count();
        $dashboard['inprogress'] = Company::where('application_status','In Progress')->count();

        return Inertia::render('Dashboard',['auth'=> $user,'dashboard'=>$dashboard]);
    }
}
