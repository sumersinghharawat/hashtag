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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->integer('company_id');
            $table->string('founder_id')->nullable();
            $table->string('document_type');
            $table->longText('document_file')->nullable();
            $table->enum('document_status', ['Cancel', 'Pending', 'Under Review', 'Verified'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
