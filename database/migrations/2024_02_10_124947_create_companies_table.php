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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('company_name_1')->nullable();
            $table->string('company_name_2')->nullable();
            $table->string('company_name_3')->nullable();
            $table->string('type_of_freezone')->nullable();
            $table->string('entity_type')->nullable();
            $table->string('industry')->nullable();
            $table->longText('description')->nullable();
            $table->string('country')->nullable();
            $table->string('package')->nullable();
            $table->enum('first_payment_status', ['cancel', 'pending', 'success'])->default('pending');
            $table->enum('second_payment_status', ['cancel', 'pending', 'success'])->default('pending');
            $table->enum('application_status', ['Rejected', 'Uncompleted', 'In Progress', 'Under Process' ,'Completed'])->default('Uncompleted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
