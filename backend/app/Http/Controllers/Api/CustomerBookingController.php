<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CustomerBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['package', 'review'])
            ->latest('id')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar booking berhasil diambil.',
            'data' => $bookings,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'package_id' => ['required', 'integer', 'exists:packages,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'trip_date' => ['required', 'date', 'after_or_equal:today'],
            'guest_count' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string', 'max:2000'],
        ]);

        $booking = DB::transaction(function () use ($request, $validated) {
            $package = Package::query()
                ->whereKey($validated['package_id'])
                ->where('is_published', true)
                ->lockForUpdate()
                ->first();

            if (! $package) {
                throw ValidationException::withMessages([
                    'package_id' => ['Paket tidak tersedia untuk dipesan.'],
                ]);
            }

            $tripDate = Carbon::parse($validated['trip_date'])->startOfDay();

            if ($package->participant_limit > 0) {
                $reservedGuests = Booking::query()
                    ->where('package_id', $package->id)
                    ->whereNotIn('status', ['cancelled'])
                    ->sum('guest_count');

                if ($reservedGuests + $validated['guest_count'] > $package->participant_limit) {
                    $remaining = max($package->participant_limit - $reservedGuests, 0);

                    throw ValidationException::withMessages([
                        'guest_count' => [
                            "Sisa kapasitas package hanya {$remaining} orang.",
                        ],
                    ]);
                }
            }

            $pricePerPerson = (float) $package->price;
            $totalPrice = $pricePerPerson * (int) $validated['guest_count'];

            return Booking::create([
                'user_id' => $request->user()->id,
                'package_id' => $package->id,
                'handled_by_admin_id' => null,
                'full_name' => trim($validated['full_name']),
                'email' => strtolower(trim($validated['email'])),
                'phone' => trim($validated['phone']),
                'trip_date' => $tripDate->toDateString(),
                'guest_count' => (int) $validated['guest_count'],
                'price_per_person' => $pricePerPerson,
                'total_price' => $totalPrice,
                'currency' => strtoupper($package->currency ?: 'IDR'),
                'note' => isset($validated['note'])
                    ? trim((string) $validated['note'])
                    : null,
                'status' => 'waiting_confirmation',
            ]);
        });

        $booking->load(['package', 'review']);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dibuat dan menunggu konfirmasi.',
            'data' => $booking,
        ], 201);
    }

    public function show(Request $request, string $booking): JsonResponse
    {
        $bookingData = $this->customerBookingQuery($request, $booking)
            ->with(['package', 'review'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Detail booking berhasil diambil.',
            'data' => $bookingData,
        ]);
    }

    public function cancel(Request $request, string $booking): JsonResponse
    {
        $bookingData = $this->customerBookingQuery($request, $booking)
            ->firstOrFail();

        if ($bookingData->status === 'cancelled') {
            $bookingData->load('package');

            return response()->json([
                'success' => true,
                'message' => 'Booking sudah dibatalkan sebelumnya.',
                'data' => $bookingData,
            ]);
        }

        if ($bookingData->status === 'completed') {
            throw ValidationException::withMessages([
                'status' => ['Booking yang sudah selesai tidak dapat dibatalkan.'],
            ]);
        }

        $bookingData->update([
            'status' => 'cancelled',
        ]);

        $bookingData->load('package');

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dibatalkan.',
            'data' => $bookingData,
        ]);
    }

    private function customerBookingQuery(Request $request, string $identifier): Builder
    {
        return Booking::query()
            ->where('user_id', $request->user()->id)
            ->where('id', (int) $identifier);
    }
}
