<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('founders', function (Blueprint $table) {
            $table->id();
            $table->integer('company_id')->nullable();
            $table->integer('user_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->boolean('manager')->default(0);
            $table->boolean('visa_status')->nullable();
            $table->enum('country_status', ['Outside', 'Inside', 'pending'])->nullable();
            $table->enum('religion', ['Islam: Shia', 'Islam: Sunni', 'Other'])->nullable();
            $table->enum('marital_status', ['pending', 'single', 'married', 'divorced'])->nullable();
            $table->string('job_title')->nullable();
            $table->string('educational_qualification')->nullable();
            $table->string('basic_salary')->nullable();
            $table->string('transportation_allowance')->nullable();
            $table->string('accommodation_allowance')->nullable();
            $table->string('other_allowances')->nullable();
            $table->string('ownership_percentage')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('founders');
    }
};
