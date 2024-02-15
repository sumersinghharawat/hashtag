<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Industry;

class IndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Industry::create(['name' => 'E-Commerce']);
        Industry::create(['name' => 'Health & Fitness Coaching']);
        Industry::create(['name' => 'Consultant/Creator']);
        Industry::create(['name' => 'Education']);
        Industry::create(['name' => 'Hospitality']);
        Industry::create(['name' => 'Marketplace']);
        Industry::create(['name' => 'Marketing Service']);
        Industry::create(['name' => 'Social Media']);
        Industry::create(['name' => 'B2B Software']);
        Industry::create(['name' => 'B2C Software']);
        Industry::create(['name' => 'Other']);
    }
}
