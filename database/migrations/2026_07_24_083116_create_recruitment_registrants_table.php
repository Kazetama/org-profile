<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recruitment_registrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruitment_id')->constrained()->cascadeOnDelete();
            $table->json('registration_data');
            $table->string('device_identifier')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recruitment_registrants');
    }
};
