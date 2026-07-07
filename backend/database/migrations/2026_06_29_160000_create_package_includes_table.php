<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_includes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('package_id');
            $table->string('item_name');
            $table->timestamps();

            $table->index('package_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_includes');
    }
};
