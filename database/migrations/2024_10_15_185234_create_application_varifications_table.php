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
        Schema::create('application_varifications', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('company_id');
            $table->string('founder_id')->nullable();
            $table->string('agent_id')->nullable();
            $table->string('application_form_field_name');
            $table->longText('application_form_field_value');
            $table->longText('description')->nullable();
            $table->enum('varification_status', ['Rejected', 'Pending', 'Under Review', 'Verified'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_varifications');
    }
};
