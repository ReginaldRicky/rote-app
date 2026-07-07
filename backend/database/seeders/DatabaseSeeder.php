<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Package;
use App\Models\Pelanggan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Admin::query()->updateOrCreate(
            ['email' => 'admin@nickholiday.com'],
            [
                'name' => 'Admin Nick Holiday',
                'password' => Hash::make('admin123'),
            ]
        );

        Pelanggan::query()->updateOrCreate(
            ['email' => 'siti@example.com'],
            [
                'name' => 'Siti Rahma',
                'password' => Hash::make('password123'),
                'status' => 'Aktif',
            ]
        );

        $package = Package::query()->updateOrCreate(
            ['title' => 'Bali Beach'],
            [
                'location' => 'Indonesia',
                'description' => 'Bali beach travel package with transport and guided itinerary.',
                'start_date' => now()->addDays(14)->toDateString(),
                'end_date' => now()->addDays(16)->toDateString(),
                'duration' => '3 Days / 2 Nights',
                'price' => 1000000,
                'currency' => 'IDR',
                'participant_limit' => 10,
                'rating' => 0,
                'image' => null,
                'is_published' => true,
            ]
        );

        $package->includes()->delete();
        foreach (['Transport Included', 'Tour Guide', 'Hotel Pickup'] as $item) {
            $package->includes()->create(['item_name' => $item]);
        }

        $package->schedules()->delete();
        $package->schedules()->create(['day_number' => 1, 'title' => 'Arrival', 'activity' => 'Arrival and check-in.']);
        $package->schedules()->create(['day_number' => 2, 'title' => 'Beach Tour', 'activity' => 'Visit beach and local attractions.']);
        $package->schedules()->create(['day_number' => 3, 'title' => 'Departure', 'activity' => 'Checkout and return trip.']);
    }
}
