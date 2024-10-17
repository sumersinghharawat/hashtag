<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the education titles to insert
        $education_titles = [
            ['title' => 'High School Graduate'],
            ['title' => 'Associate of Arts (AA)'],
            ['title' => 'Associate of Science (AS)'],
            ['title' => 'Bachelor of Arts (BA)'],
            ['title' => 'Bachelor of Science (BS)'],
            ['title' => 'Bachelor of Business Administration (BBA)'],
            ['title' => 'Bachelor of Engineering (BE)'],
            ['title' => 'Master of Arts (MA)'],
            ['title' => 'Master of Science (MS)'],
            ['title' => 'Master of Business Administration (MBA)'],
            ['title' => 'Master of Engineering (ME)'],
            ['title' => 'Doctor of Philosophy (PhD)'],
            ['title' => 'Doctor of Education (EdD)'],
        ];

        // Insert the job titles into the JobTitle table
        foreach ($education_titles as $education_title) {
            Education::create($education_title);
        }
    }
}
