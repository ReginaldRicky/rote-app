<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminBookingController extends Controller
{
    public function index(): JsonResponse
    {
        $bookings = Booking::query()
            ->with(['package', 'pelanggan', 'handledByAdmin', 'review'])
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data booking admin berhasil diambil.',
            'data' => $bookings,
        ]);
    }

    public function show(Booking $booking): JsonResponse
    {
        $booking->load(['package', 'pelanggan', 'handledByAdmin', 'review']);

        return response()->json([
            'success' => true,
            'message' => 'Detail booking admin berhasil diambil.',
            'data' => $booking,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validateBooking($request);
        $package = Package::query()->findOrFail($validated['package_id']);
        $guestCount = (int) $validated['guest_count'];

        $quotaError = $this->validateQuota($package, $guestCount);

        if ($quotaError) {
            return $quotaError;
        }

        $pelanggan = $this->resolvePelanggan($validated);
        $pricePerPerson = (float) $package->price;

        $booking = Booking::create([
            'user_id' => $pelanggan->id,
            'package_id' => $package->id,
            'handled_by_admin_id' => $request->user()?->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'trip_date' => $validated['trip_date'],
            'guest_count' => $guestCount,
            'price_per_person' => $pricePerPerson,
            'total_price' => $pricePerPerson * $guestCount,
            'currency' => $package->currency ?? 'IDR',
            'note' => $validated['note'] ?? null,
            'status' => $validated['status'] ?? 'waiting_confirmation',
        ]);

        $booking->load(['package', 'pelanggan', 'handledByAdmin', 'review']);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dibuat admin.',
            'data' => $booking,
        ], 201);
    }

    public function update(Request $request, Booking $booking): JsonResponse
    {
        $validated = $this->validateBooking($request, true);
        $package = Package::query()->findOrFail($validated['package_id']);
        $guestCount = (int) $validated['guest_count'];

        $quotaError = $this->validateQuota($package, $guestCount, $booking->id);

        if ($quotaError) {
            return $quotaError;
        }

        $pelanggan = $this->resolvePelanggan($validated);
        $pricePerPerson = (float) $package->price;

        $booking->update([
            'user_id' => $pelanggan->id,
            'package_id' => $package->id,
            'handled_by_admin_id' => $request->user()?->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'trip_date' => $validated['trip_date'],
            'guest_count' => $guestCount,
            'price_per_person' => $pricePerPerson,
            'total_price' => $pricePerPerson * $guestCount,
            'currency' => $package->currency ?? 'IDR',
            'note' => $validated['note'] ?? null,
            'status' => $validated['status'] ?? $booking->status,
        ]);

        $booking->load(['package', 'pelanggan', 'handledByAdmin', 'review']);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil diperbarui admin.',
            'data' => $booking,
        ]);
    }

    private function validateBooking(Request $request): array
    {
        return $request->validate([
            'package_id' => ['required', 'integer', 'exists:packages,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'trip_date' => ['required', 'date'],
            'guest_count' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string'],
            'status' => ['nullable', 'in:waiting_confirmation,confirmed,cancelled,completed'],
        ]);
    }

    private function resolvePelanggan(array $validated): Pelanggan
    {
        return Pelanggan::query()->firstOrCreate(
            ['email' => strtolower(trim($validated['email']))],
            [
                'name' => trim($validated['full_name']),
                'password' => Hash::make(Str::random(16)),
                'status' => 'Aktif',
            ]
        );
    }

    private function validateQuota(Package $package, int $guestCount, ?int $ignoreBookingId = null): ?JsonResponse
    {
        $participantLimit = (int) ($package->participant_limit ?? 0);

        if ($participantLimit <= 0) {
            return null;
        }

        $query = Booking::query()
            ->where('package_id', $package->id)
            ->whereIn('status', ['waiting_confirmation', 'confirmed', 'completed']);

        if ($ignoreBookingId) {
            $query->where('id', '!=', $ignoreBookingId);
        }

        $bookedGuests = (int) $query->sum('guest_count');
        $remainingQuota = $participantLimit - $bookedGuests;

        if ($guestCount > $remainingQuota) {
            return response()->json([
                'success' => false,
                'message' => "Jumlah tamu melebihi sisa kuota package. Sisa kuota saat ini: {$remainingQuota} peserta.",
            ], 422);
        }

        return null;
    }
}
