<?php

namespace Database\Seeders;

use App\Models\Packages;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $packages = [
            ['title' => 'Sharjah Publishing City Free Zone (SPC)', 'status'=>1],
            ['title' => 'Ajman Free Zone Authority (AFZ)', 'status'=>1],
            ['title' => 'International Free Zone Authority (IFZA)', 'status'=>1],
            ['title' => 'Ras Al Khaimah Economic Zone (RAKEZ)', 'status'=>1],
        ];

        // Insert the job titles into the JobTitle table
        foreach ($packages as $package) {
            Packages::create($package);
        }
    }
}
