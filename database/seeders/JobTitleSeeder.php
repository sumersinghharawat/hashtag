<?php

namespace Database\Seeders;

use App\Models\JobTitle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the job titles to insert
        $jobTitles = [
            ['title' => 'Manager'],
            ['title' => 'Director'],
            ['title' => 'Secretary'],
            ['title' => 'Engineer'],
            ['title' => 'Accountant'],
            ['title' => 'Marketing Specialist'],
            ['title' => 'Human Resources Manager'],
            ['title' => 'Software Developer'],
            ['title' => 'Sales Representative'],
            ['title' => 'Project Manager'],
            ['title' => 'Operations Manager'],
            ['title' => 'Consultant'],
        ];

        // Insert the job titles into the JobTitle table
        foreach ($jobTitles as $jobTitle) {
            JobTitle::create($jobTitle);
        }
    }
}
