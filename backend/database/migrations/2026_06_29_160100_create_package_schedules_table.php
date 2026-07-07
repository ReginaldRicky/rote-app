<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('package_id');
            $table->unsignedInteger('day_number');
            $table->string('title');
            $table->text('activity');
            $table->timestamps();

            $table->index(['package_id', 'day_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_schedules');
    }
};
