<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Sumer',
        //     'email' => 'sumer.singh@nayatmc.com',
        // ]);

        $this->call(RoleSeeder::class);
        $this->call(IndustrySeeder::class);
        $this->call(JobTitleSeeder::class);
        $this->call(EducationSeeder::class);
        $this->call(PackagesSeeder::class);
        $this->call(VariantsSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
