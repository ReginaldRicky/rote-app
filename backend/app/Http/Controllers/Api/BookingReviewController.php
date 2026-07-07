<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingReview;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingReviewController extends Controller
{
    public function store(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
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

        if (!in_array($booking->status, ['confirmed', 'completed'], true)) {
            return response()->json([
                'success' => false,
                'message' => 'Review hanya bisa diberikan setelah booking dikonfirmasi.',
            ], 403);
        }

        $existingReview = BookingReview::query()
            ->where('booking_id', $booking->id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'success' => false,
                'message' => 'Kamu sudah memberi review untuk booking ini.',
            ], 409);
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:1000'],
        ]);

        $review = BookingReview::create([
            'booking_id' => $booking->id,
            'user_id' => $user->id,
            'package_id' => $booking->package_id,
            'rating' => $validated['rating'],
            'comment' => trim($validated['comment']),
        ]);

        $averageRating = BookingReview::query()
            ->where('package_id', $booking->package_id)
            ->avg('rating');

        Package::query()
            ->where('id', $booking->package_id)
            ->update([
                'rating' => round((float) $averageRating, 1),
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil dikirim.',
            'data' => $review->load(['pelanggan', 'package']),
        ], 201);
    }

    public function packageReviews(Package $package): JsonResponse
    {
        $reviews = BookingReview::query()
            ->where('package_id', $package->id)
            ->with('pelanggan:id,name,email')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Review package berhasil diambil.',
            'data' => $reviews,
        ]);
    }
}
