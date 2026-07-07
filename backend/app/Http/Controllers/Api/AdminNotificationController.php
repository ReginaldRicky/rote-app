<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use App\Models\Pelanggan;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class AdminNotificationController extends Controller
{
    public function index(): JsonResponse
    {
        $items = collect()
            ->merge($this->bookingNotifications())
            ->merge($this->packageNotifications())
            ->merge($this->customerNotifications())
            ->merge($this->scheduleReminderNotifications())
            ->merge($this->lowAvailabilityNotifications())
            ->sortByDesc('sort_at')
            ->values()
            ->map(function (array $item) {
                unset($item['sort_at']);

                return $item;
            })
            ->take(40)
            ->values();

        return response()->json([
            'success' => true,
            'message' => 'Admin notifications berhasil diambil.',
            'data' => $items,
        ]);
    }

    private function bookingNotifications()
    {
        return Booking::query()
            ->with(['package', 'pelanggan'])
            ->latest('updated_at')
            ->limit(25)
            ->get()
            ->map(function (Booking $booking) {
                $status = $booking->status ?: 'waiting_confirmation';
                $packageName = $booking->package?->title ?: 'Unknown Package';
                $customerName = $booking->full_name ?: $booking->pelanggan?->name ?: 'Customer';
                $tripDate = $booking->trip_date
                    ? Carbon::parse($booking->trip_date)->translatedFormat('d F Y')
                    : '-';

                $config = match ($status) {
                    'confirmed' => [
                        'title' => 'Booking confirmed',
                        'type' => 'Booking',
                        'message' => "Booking {$customerName} untuk {$packageName} sudah dikonfirmasi. Trip date: {$tripDate}.",
                    ],
                    'cancelled' => [
                        'title' => 'Booking cancelled',
                        'type' => 'Cancellation',
                        'message' => "Booking {$customerName} untuk {$packageName} dibatalkan. Trip date: {$tripDate}.",
                    ],
                    'completed' => [
                        'title' => 'Trip completed',
                        'type' => 'Booking',
                        'message' => "Booking {$customerName} untuk {$packageName} sudah selesai. Total peserta: {$booking->guest_count} pax.",
                    ],
                    default => [
                        'title' => 'New booking received',
                        'type' => 'Booking',
                        'message' => "{$customerName} membuat booking {$packageName} untuk {$booking->guest_count} pax. Trip date: {$tripDate}.",
                    ],
                };

                return $this->makeNotification([
                    'id' => "booking-{$booking->id}-{$status}",
                    'title' => $config['title'],
                    'message' => $config['message'],
                    'type' => $config['type'],
                    'source' => 'booking',
                    'source_id' => $booking->id,
                    'link' => "/admin/bookings/{$booking->id}/edit",
                    'created_at' => $booking->updated_at ?: $booking->created_at,
                ]);
            });
    }

    private function packageNotifications()
    {
        return Package::query()
            ->latest('created_at')
            ->limit(12)
            ->get()
            ->map(function (Package $package) {
                $startDate = $package->start_date
                    ? Carbon::parse($package->start_date)->translatedFormat('d F Y')
                    : '-';

                return $this->makeNotification([
                    'id' => "package-created-{$package->id}",
                    'title' => 'New package created',
                    'message' => "Package {$package->title} dibuat untuk {$package->location}. Start date: {$startDate}.",
                    'type' => 'Package',
                    'source' => 'package',
                    'source_id' => $package->id,
                    'link' => "/admin/packages/{$package->id}",
                    'created_at' => $package->created_at,
                ]);
            });
    }

    private function customerNotifications()
    {
        return Pelanggan::query()
            ->latest('created_at')
            ->limit(12)
            ->get()
            ->map(function (Pelanggan $pelanggan) {
                return $this->makeNotification([
                    'id' => "customer-registered-{$pelanggan->id}",
                    'title' => 'New customer registered',
                    'message' => "{$pelanggan->name} mendaftar sebagai customer baru dengan email {$pelanggan->email}.",
                    'type' => 'Customer',
                    'source' => 'customer',
                    'source_id' => $pelanggan->id,
                    'link' => '/admin/bookings',
                    'created_at' => $pelanggan->created_at,
                ]);
            });
    }

    private function scheduleReminderNotifications()
    {
        $today = Carbon::today();
        $nextWeek = Carbon::today()->addDays(7);

        return Booking::query()
            ->with(['package', 'pelanggan'])
            ->whereIn('status', ['waiting_confirmation', 'confirmed'])
            ->whereBetween('trip_date', [$today->toDateString(), $nextWeek->toDateString()])
            ->orderBy('trip_date')
            ->limit(12)
            ->get()
            ->map(function (Booking $booking) {
                $tripDate = Carbon::parse($booking->trip_date);
                $customerName = $booking->full_name ?: $booking->pelanggan?->name ?: 'Customer';
                $packageName = $booking->package?->title ?: 'Unknown Package';

                return $this->makeNotification([
                    'id' => "schedule-reminder-{$booking->id}",
                    'title' => 'Schedule reminder',
                    'message' => "Trip {$packageName} untuk {$customerName} akan berjalan pada {$tripDate->translatedFormat('d F Y')}.",
                    'type' => 'Schedule',
                    'source' => 'booking',
                    'source_id' => $booking->id,
                    'link' => "/admin/bookings/{$booking->id}/edit",
                    'created_at' => $tripDate,
                ]);
            });
    }

    private function lowAvailabilityNotifications()
    {
        return Package::query()
            ->withSum([
                'bookings as active_guest_count' => function ($query) {
                    $query->whereIn('status', [
                        'waiting_confirmation',
                        'confirmed',
                        'completed',
                    ]);
                },
            ], 'guest_count')
            ->whereNotNull('participant_limit')
            ->where('participant_limit', '>', 0)
            ->get()
            ->filter(function (Package $package) {
                $limit = (int) $package->participant_limit;
                $booked = (int) ($package->active_guest_count ?? 0);
                $remaining = max($limit - $booked, 0);

                return $remaining <= 3 || ($limit > 0 && ($remaining / $limit) <= 0.2);
            })
            ->map(function (Package $package) {
                $limit = (int) $package->participant_limit;
                $booked = (int) ($package->active_guest_count ?? 0);
                $remaining = max($limit - $booked, 0);

                return $this->makeNotification([
                    'id' => "low-availability-{$package->id}",
                    'title' => 'Low availability warning',
                    'message' => "Kuota {$package->title} tersisa {$remaining} dari {$limit} peserta.",
                    'type' => 'Package',
                    'source' => 'package',
                    'source_id' => $package->id,
                    'link' => "/admin/packages/{$package->id}",
                    'created_at' => now(),
                ]);
            });
    }

    private function makeNotification(array $data): array
    {
        $createdAt = $data['created_at'] ? Carbon::parse($data['created_at']) : now();

        return [
            'id' => $data['id'],
            'title' => $data['title'],
            'message' => $data['message'],
            'type' => $data['type'],
            'status' => $createdAt->greaterThanOrEqualTo(now()->subDay()) ? 'Unread' : 'Read',
            'time' => $createdAt->diffForHumans(),
            'created_at' => $createdAt->toISOString(),
            'source' => $data['source'] ?? null,
            'source_id' => $data['source_id'] ?? null,
            'link' => $data['link'] ?? '/admin/notifications',
            'sort_at' => $createdAt->timestamp,
        ];
    }
}
