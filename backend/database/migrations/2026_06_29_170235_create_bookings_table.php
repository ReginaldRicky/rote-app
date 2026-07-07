<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('pelanggan')
                ->restrictOnDelete();

            $table->foreignId('package_id')
                ->constrained('packages')
                ->restrictOnDelete();

            $table->foreignId('handled_by_admin_id')
                ->nullable()
                ->constrained('admins')
                ->nullOnDelete();

            $table->string('full_name');
            $table->string('email');
            $table->string('phone', 30);
            $table->date('trip_date');
            $table->unsignedInteger('guest_count');
            $table->decimal('price_per_person', 14, 2);
            $table->decimal('total_price', 14, 2);
            $table->char('currency', 3)->default('IDR');
            $table->text('note')->nullable();

            $table->enum('status', [
                'waiting_confirmation',
                'confirmed',
                'cancelled',
                'completed',
            ])->default('waiting_confirmation');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
