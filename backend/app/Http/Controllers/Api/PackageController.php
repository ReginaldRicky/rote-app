<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = Package::query()
            ->with(['includes', 'schedules'])
            ->withCount('reviews')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data package berhasil diambil.',
            'data' => $packages,
        ]);
    }

    public function show(Package $package): JsonResponse
    {
        $package->load(['includes', 'schedules']);
        $package->loadCount('reviews');

        return response()->json([
            'success' => true,
            'message' => 'Detail package berhasil diambil.',
            'data' => $package,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validatePackage($request);
        $imageUrl = $this->storeImage($request);

        $package = Package::create([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'duration' => $this->generateDuration($validated['start_date'], $validated['end_date']),
            'price' => $validated['price'],
            'currency' => $validated['currency'] ?? 'IDR',
            'participant_limit' => $validated['participant_limit'],
            'rating' => $validated['rating'] ?? 0,
            'image' => $imageUrl,
            'is_published' => $validated['is_published'] ?? true,
        ]);

        $this->syncIncludes($package, $request->input('includes', []));
        $this->syncSchedules($package, $request->input('schedules', []));

        $package->load(['includes', 'schedules']);

        return response()->json([
            'success' => true,
            'message' => 'Package berhasil dibuat.',
            'data' => $package,
        ], 201);
    }

    public function update(Request $request, Package $package): JsonResponse
    {
        $validated = $this->validatePackage($request);
        $imageUrl = $package->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredImage($package->image);
            $imageUrl = $this->storeImage($request);
        }

        $package->update([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'duration' => $this->generateDuration($validated['start_date'], $validated['end_date']),
            'price' => $validated['price'],
            'currency' => $validated['currency'] ?? 'IDR',
            'participant_limit' => $validated['participant_limit'],
            'rating' => $validated['rating'] ?? $package->rating ?? 0,
            'image' => $imageUrl,
            'is_published' => $validated['is_published'] ?? true,
        ]);

        $this->syncIncludes($package, $request->input('includes', []));
        $this->syncSchedules($package, $request->input('schedules', []));

        $package->load(['includes', 'schedules']);

        return response()->json([
            'success' => true,
            'message' => 'Package berhasil diperbarui.',
            'data' => $package,
        ]);
    }

    public function destroy(Package $package): JsonResponse
    {
        $this->deleteStoredImage($package->image);
        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Package berhasil dihapus.',
        ]);
    }

    private function validatePackage(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:3'],
            'participant_limit' => ['required', 'integer', 'min:1'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'is_published' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'includes' => ['nullable', 'array'],
            'includes.*' => ['nullable', 'string', 'max:255'],
            'schedules' => ['nullable', 'array'],
            'schedules.*.day_number' => ['nullable', 'integer', 'min:1'],
            'schedules.*.title' => ['nullable', 'string', 'max:255'],
            'schedules.*.activity' => ['nullable', 'string'],
        ]);
    }

    private function storeImage(Request $request): ?string
    {
        if (! $request->hasFile('image')) {
            return null;
        }

        $path = $request->file('image')->store('packages', 'public');

        return $request->getSchemeAndHttpHost() . Storage::url($path);
    }

    private function deleteStoredImage(?string $imageUrl): void
    {
        if (! $imageUrl || ! str_contains($imageUrl, '/storage/')) {
            return;
        }

        $oldPath = explode('/storage/', $imageUrl)[1] ?? null;

        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }
    }

    private function syncIncludes(Package $package, mixed $includes): void
    {
        $package->includes()->delete();

        if (! is_array($includes)) {
            return;
        }

        foreach ($includes as $include) {
            $itemName = trim((string) $include);

            if ($itemName === '') {
                continue;
            }

            $package->includes()->create([
                'item_name' => $itemName,
            ]);
        }
    }

    private function syncSchedules(Package $package, mixed $schedules): void
    {
        $package->schedules()->delete();

        if (! is_array($schedules)) {
            return;
        }

        foreach ($schedules as $index => $schedule) {
            if (! is_array($schedule)) {
                continue;
            }

            $title = trim((string) ($schedule['title'] ?? ''));
            $activity = trim((string) ($schedule['activity'] ?? ''));
            $dayNumber = (int) ($schedule['day_number'] ?? ($index + 1));

            if ($title === '' && $activity === '') {
                continue;
            }

            $package->schedules()->create([
                'day_number' => max(1, $dayNumber),
                'title' => $title ?: 'Day ' . max(1, $dayNumber),
                'activity' => $activity,
            ]);
        }
    }

    private function generateDuration(?string $startDate, ?string $endDate): ?string
    {
        if (! $startDate || ! $endDate) {
            return null;
        }

        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);
        $days = $start->diffInDays($end) + 1;
        $nights = max($days - 1, 0);

        if ($days === 1) {
            return '1 Day';
        }

        return "{$days} Days / {$nights} Nights";
    }
}
