<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $user = User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'superadmin',
                'first_name' => 'superadmin',
                'last_name' => '',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        );

        $user->assignRole('superadmin');

        $agent = User::updateOrCreate(
            ['email' => 'agent@agent.com'],
            [
                'name' => 'agent',
                'first_name' => 'agent',
                'last_name' => '',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        );

        $agent->assignRole('agent');

        $agent->givePermissionTo(['edit applications', 'view applications']);
    }
}
