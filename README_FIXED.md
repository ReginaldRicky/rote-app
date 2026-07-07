# Rote App Fixed Version

Perbaikan utama:

- Admin dashboard memakai data API booking dan package, bukan hanya dummy.
- Admin booking sudah tersambung database.
- Add/Edit booking tidak memakai booking code.
- Add/Edit booking memakai dropdown package dari database.
- Harga booking otomatis dihitung dari harga package x jumlah guest.
- Admin booking punya tombol WhatsApp direct chat dan placeholder payment gateway DANA/Midtrans.
- Admin package memakai upload gambar, bukan URL thumbnail.
- Duration package dihitung otomatis dari start_date dan end_date.
- Validasi tanggal package tidak boleh masa lalu.
- Booking customer memakai validasi participant_limit.
- Review dan rating customer setelah booking confirmed/completed.
- Tampilan harga memakai format IDR.
- Kalender admin mengambil event dari package dan booking.
- Migration duplicate handled_by_admin_id sudah dibuat aman.
- Seeder membuat akun admin default.

## Cara jalan cepat

Backend:

```bash
cd backend
composer install
php artisan optimize:clear
php artisan storage:link
php artisan migrate:fresh --seed
php artisan serve
```

Frontend:

```bash
npm install
npm run dev
```

Admin login:

```text
Email: admin@nickholiday.com
Password: admin123
```

Customer demo dari seeder:

```text
Email: siti@example.com
Password: password123
```

Catatan: `migrate:fresh --seed` akan menghapus data lama dan membuat data awal baru.

## Update: customer feature activation + dashboard quick actions

Perubahan tambahan:
- Hero search sekarang benar-benar mengirim filter ke halaman Destinations.
- Sidebar filter Destinations sekarang aktif: tanggal, guest, theme, duration, dan destination.
- Tombol reset filter dan clear filter aktif.
- Sorting destination tetap aktif: popularity, rating, price low/high.
- Specials section memakai package database, bukan dummy static.
- Gallery card dan View All Images sekarang mengarah ke daftar destination.
- Trending section memakai package terbaik dari database dan tombolnya mengarah ke detail package.
- Dashboard admin punya tombol Refresh dan Add Booking.
- Recent Bookings search aktif dan tombol View All/Open mengarah ke halaman terkait.
- Travel Packages di dashboard bisa disortir Latest/Popular/Cheapest dan tombol detail aktif.
- Mini calendar dashboard bisa pindah bulan dan menandai tanggal package/booking.
- Upcoming Trips bisa dibuka ke edit booking dan tombol plus mengarah ke Add Booking.
