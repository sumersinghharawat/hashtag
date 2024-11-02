<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Founder;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->first_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Company::create(['user_id'=>$user->id]);

        $user->assignRole('founder');

        // Founder::create([
        //     'name'=>$user->name,
        //     'userid'=>$user->id,
        //     'customer_company_role'=>'founder'
        // ]);

        // Company::create([
        //     'customer_id'=>$user->id,
        // ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::FOUNDERHOME);
    }

    public function redirectToGoogle(){
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            //create a user using socialite driver google
            // $user = Socialite::driver('google')->user();
            $user = Socialite::driver('google')->stateless()->user();

            // if the user exits, use that user and login

            $finduser = User::where('google_id', $user->id)->first();
            if($finduser){
                //if the user exists, login and show dashboard
                Auth::login($finduser);
                return redirect(RouteServiceProvider::FOUNDERHOME);
            }else{
                $count = User::where('email', $user->email)->count();
                if($count>0){
                    $finduser->assignRole('founder');
                    $updateuserid = User::where('email', $user->email)->update(['google_id'=> $user->id]);
                    // if($updateuserid){
                    $finduser = User::where('google_id', $user->id)->first();
                    Auth::login($finduser);
                    return redirect(RouteServiceProvider::FOUNDERHOME);
                    // }
                }

                //user is not yet created, so create first
                $newUser = User::create([
                    'name' => $user->name,
                    'first_name' => $user->user['given_name'],
                    'last_name' => isset($user->user['family_name'])?$user->user['family_name']:'',
                    'email' => $user->email,
                    'google_id'=> $user->id,
                    'password' => encrypt('')
                ]);

                $newUser->assignRole('founder');

                Auth::login($newUser);
                // go to the dashboard
                return redirect(RouteServiceProvider::FOUNDERHOME);
            }
            //catch exceptions
        } catch (Exception $e) {
            // dd($e);
            return redirect(RouteServiceProvider::HOME);
        }
    }

    public function agentregister(Request $request){
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->first_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('agent');

        return redirect(route('admin.dashboard.viewagents'));
    }



    public function agenteditstore(Request $request,$id){
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::where(['id'=>$id])->update([
            'name' => $request->first_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect(route('admin.dashboard.viewagents'));
    }
}
