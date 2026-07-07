<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('bookings') && ! Schema::hasColumn('bookings', 'handled_by_admin_id')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->foreignId('handled_by_admin_id')
                    ->nullable()
                    ->after('package_id')
                    ->constrained('admins')
                    ->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('bookings') && Schema::hasColumn('bookings', 'handled_by_admin_id')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropConstrainedForeignId('handled_by_admin_id');
            });
        }
    }
};
