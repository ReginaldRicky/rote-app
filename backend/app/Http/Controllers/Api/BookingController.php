<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Silakan login terlebih dahulu.',
            ], 401);
        }

        $bookings = Booking::query()
            ->where('user_id', $user->id)
            ->with([
                'package',
                'review',
            ])
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data booking berhasil diambil.',
            'data' => $bookings,
        ]);
    }

    public function show(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Silakan login terlebih dahulu.',
            ], 401);
        }

        if ((int) $booking->user_id !== (int) $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Booking tidak ditemukan.',
            ], 404);
        }

        $booking->load([
            'package',
            'review',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Detail booking berhasil diambil.',
            'data' => $booking,
        ]);
    }

    public function store(Request $request): JsonResponse
{
    $user = $request->user();

    if (! $user) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized. Token tidak valid atau user belum login.',
        ], 401);
    }

    $validated = $request->validate([
        'package_id' => [
            'required',
            'integer',
            'exists:packages,id',
        ],

        'full_name' => [
            'required',
            'string',
            'max:255',
        ],

        'email' => [
            'required',
            'email',
            'max:255',
        ],

        'phone' => [
            'required',
            'string',
            'max:30',
        ],

        'trip_date' => [
            'required',
            'date',
        ],

        'guest_count' => [
            'required',
            'integer',
            'min:1',
        ],

        'note' => [
            'nullable',
            'string',
        ],
    ]);

    $package = Package::query()
        ->where('id', $validated['package_id'])
        ->firstOrFail();

    $guestCount = (int) $validated['guest_count'];
    $participantLimit = (int) ($package->participant_limit ?? 0);

    /*
     * Hitung jumlah peserta yang sudah booking package ini.
     * Booking cancelled tidak dihitung.
     */
    $bookedGuests = Booking::query()
        ->where('package_id', $package->id)
        ->whereIn('status', [
            'waiting_confirmation',
            'confirmed',
            'completed',
        ])
        ->sum('guest_count');

    $remainingQuota = $participantLimit > 0
        ? $participantLimit - $bookedGuests
        : null;

    /*
     * Kalau participant_limit diisi, guest_count tidak boleh melebihi sisa kuota.
     */
    if ($participantLimit > 0 && $guestCount > $remainingQuota) {
        return response()->json([
            'success' => false,
            'message' => "Jumlah tamu melebihi sisa kuota package. Sisa kuota saat ini: {$remainingQuota} peserta.",
        ], 422);
    }

    $pricePerPerson = (float) $package->price;
    $totalPrice = $pricePerPerson * $guestCount;

    $booking = Booking::create([
        'user_id' => $user->id,
        'package_id' => $package->id,
        'handled_by_admin_id' => null,
        'full_name' => $validated['full_name'],
        'email' => $validated['email'],
        'phone' => $validated['phone'],
        'trip_date' => $validated['trip_date'],
        'guest_count' => $guestCount,
        'price_per_person' => $pricePerPerson,
        'total_price' => $totalPrice,
        'currency' => $package->currency ?? 'IDR',
        'note' => $validated['note'] ?? null,
        'status' => 'waiting_confirmation',
    ]);

    $booking->load([
        'package',
        'review',
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Booking berhasil dibuat.',
        'data' => $booking,
    ], 201);
}
}
