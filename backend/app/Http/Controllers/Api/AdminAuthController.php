<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Booking;
use App\Models\Package;
use App\Models\Pelanggan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $admin = Admin::where('email', $validated['email'])->first();

        if (!$admin || !Hash::check($validated['password'], $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'admin' => $admin,
                'token' => $admin->createToken('admin-token')->plainTextToken,
            ],
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'admin' => $request->user(),
            ],
        ]);
    }

    public function profile(Request $request)
    {
        $admin = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Profile admin berhasil diambil.',
            'data' => [
                'admin' => $admin,
                'stats' => [
                    'managed_bookings' => Booking::count(),
                    'pending_bookings' => Booking::where('status', 'waiting_confirmation')->count(),
                    'confirmed_trips' => Booking::whereIn('status', ['confirmed', 'completed'])->count(),
                    'tour_packages' => Package::count(),
                    'customers' => Pelanggan::count(),
                    'joined_date' => optional($admin->created_at)->format('Y-m-d'),
                    'last_updated' => optional($admin->updated_at)->format('Y-m-d H:i:s'),
                ],
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $admin = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('admins', 'email')->ignore($admin->id),
            ],
            'current_password' => ['nullable', 'string'],
            'new_password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        if (!empty($validated['new_password'])) {
            if (empty($validated['current_password'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password lama wajib diisi untuk mengganti password.',
                ], 422);
            }

            if (!Hash::check($validated['current_password'], $admin->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password lama tidak sesuai.',
                ], 422);
            }
        }

        $admin->name = $validated['name'];
        $admin->email = $validated['email'];

        if (!empty($validated['new_password'])) {
            $admin->password = $validated['new_password'];
        }

        $admin->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile admin berhasil diperbarui.',
            'data' => [
                'admin' => $admin->fresh(),
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->user()?->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logout admin berhasil.',
        ]);
    }
}
