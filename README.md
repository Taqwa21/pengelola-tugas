# Aplikasi Daftar Tugas

## Status Proyek

Saat ini masih belum final dan masih dalam tahap pengembangan.

## Deskripsi

Aplikasi Daftar Tugas adalah aplikasi pencatat dan pengelola tugas berbasis HTML, CSS, dan JavaScript. Data tersimpan menggunakan localStorage sehingga tetap aman meskipun browser ditutup. Tampilan menggunakan desain modern dengan latar animasi bertema ruang angkasa.

## Fitur Utama

- Halaman utama langsung menampilkan daftar tugas
- Tambah, Selesai, Hapus, dan lihat detail tugas
- Form tugas berisi:
  - Nama pelajaran
  - Dosen (opsional)
  - Deskripsi tugas
  - Tanggal diberikan
  - Tanggal dikumpulkan (format Indonesia lengkap, contoh Kamis 27 Oktober 2025)
  - Catatan tambahan
  - Status tugas
  - Prioritas tugas
- Tampilan kartu tugas dengan warna prioritas
- Animasi kartu saat tampil
- Background animasi ruang angkasa
- Penyimpanan data menggunakan localStorage

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- localStorage

## Cara Menggunakan

1. Buka file `index.html` di browser.
2. Klik tombol Tambah Tugas untuk membuat tugas baru.
3. Isi seluruh form sesuai kebutuhan.
4. Tugas akan muncul di daftar dengan opsi detail, hapus, dan selesai.
5. Semua data tersimpan otomatis ke localStorage.

## Struktur File

- index.html (daftar tugas)
- tambah.html (tambah tugas)
- detail.html (detail tugas)
- assets/js/script.js (logika aplikasi)
