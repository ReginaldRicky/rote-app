<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Pelanggan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CustomerAuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                'max:100',
                'unique:pelanggan,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $pelanggan = Pelanggan::create([
            'name' => trim($validated['nama']),
            'email' => strtolower(trim($validated['email'])),
            'password' => Hash::make($validated['password']),
            'status' => 'Aktif',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi pelanggan berhasil.',
            'data' => [
                'pelanggan' => $pelanggan,
            ],
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],
        ]);

        $email = strtolower(trim($validated['email']));

        $pelanggan = Pelanggan::query()
            ->where('email', $email)
            ->first();

        if (
            ! $pelanggan ||
            ! Hash::check(
                $validated['password'],
                $pelanggan->password
            )
        ) {
            throw ValidationException::withMessages([
                'email' => [
                    'Email atau password tidak sesuai.',
                ],
            ]);
        }

        if (
            strcasecmp(
                (string) $pelanggan->status,
                'Aktif'
            ) !== 0
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Akun pelanggan sedang tidak aktif.',
            ], 403);
        }

        $token = $pelanggan
            ->createToken(
                'customer-web',
                ['customer']
            )
            ->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login pelanggan berhasil.',
            'data' => [
                'pelanggan' => $pelanggan,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Data pelanggan berhasil diambil.',
            'data' => [
                'pelanggan' => $request->user(),
            ],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $pelanggan = $request->user();

        if (! $pelanggan) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Silakan login terlebih dahulu.',
            ], 401);
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                'max:100',
                Rule::unique('pelanggan', 'email')->ignore($pelanggan->id),
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $pelanggan->name = trim($validated['name']);
        $pelanggan->email = strtolower(trim($validated['email']));

        if (! empty($validated['password'])) {
            $pelanggan->password = Hash::make($validated['password']);
        }

        $pelanggan->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui.',
            'data' => [
                'pelanggan' => $pelanggan->fresh(),
            ],
        ]);
    }

    public function verifyResetEmail(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],
        ]);

        $email = strtolower(trim($validated['email']));

        $pelanggan = Pelanggan::query()
            ->where('email', $email)
            ->first();

        if ($pelanggan) {
            return response()->json([
                'success' => true,
                'message' => 'Email pelanggan ditemukan.',
                'data' => [
                    'account_type' => 'customer',
                    'email' => $pelanggan->email,
                    'name' => $pelanggan->name,
                ],
            ]);
        }

        $admin = Admin::query()
            ->where('email', $email)
            ->first();

        if ($admin) {
            return response()->json([
                'success' => true,
                'message' => 'Email admin ditemukan.',
                'data' => [
                    'account_type' => 'admin',
                    'email' => $admin->email,
                    'name' => $admin->name,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email tidak terdaftar sebagai customer atau admin.',
        ], 404);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],

            'account_type' => [
                'nullable',
                'string',
                Rule::in(['customer', 'admin']),
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $email = strtolower(trim($validated['email']));
        $accountType = $validated['account_type'] ?? null;

        $account = null;

        if ($accountType === 'admin') {
            $account = Admin::query()
                ->where('email', $email)
                ->first();
        }

        if ($accountType === 'customer' || $accountType === null) {
            $account = Pelanggan::query()
                ->where('email', $email)
                ->first();
        }

        if (! $account && $accountType === null) {
            $account = Admin::query()
                ->where('email', $email)
                ->first();
        }

        if (! $account) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan. Silakan cek kembali email yang digunakan.',
            ], 404);
        }

        $account->password = Hash::make($validated['password']);
        $account->save();

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diganti. Silakan login menggunakan password baru.',
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request
            ->user()
            ->currentAccessToken();

        if ($token !== null) {
            $token->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logout pelanggan berhasil.',
        ]);
    }
}
