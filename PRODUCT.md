# LaundryCalc - Daftar Fitur dan Status Produk

Dokumen ini merangkum seluruh fitur dari PRD LaundryCalc & Catalog (v1.1 / MVP v0.1), prioritas, ketergantungan, keputusan klarifikasi, dan status pengerjaan.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | Tidak ada | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | Tidak ada | Selesai |

## Catatan Ruang Lingkup

- Seluruh fitur **FT-01 sampai FT-07** sudah selesai disusun spesifikasinya dan dibangun.

## Klarifikasi PRD dan Keputusan

1. **Kondisi awal kalkulator saat halaman dibuka**: Paket **Cuci Setrika (L02)** dengan berat awal **3 kg** langsung terpilih agar pelanggan segera melihat contoh estimasi biaya.
2. **Format penulisan Rupiah**: Menggunakan format tanpa spasi (`Rp6.000`, `Rp18.000`, `Rp61.000`) secara konsisten di layar dan di pesan WhatsApp agar nominal identik.
3. **Pembulatan dan batas atas berat**: Input berat menerima minimal `0,1` kg hingga maksimal `100` kg dengan pemisah desimal koma atau titik; hasil perkalian uang dibulatkan ke bilangan bulat terdekat (`Math.round`).
4. **Nomor WhatsApp toko**: PRD mencantumkan placeholder `628xxxxxxxxxx`. Aplikasi memakai nomor contoh aman `6281234567890` di `src/config.ts` agar tautan WhatsApp bisa diuji tanpa memakai data pribadi asli.
5. **Teks klausul estimasi wajib**: Ditampilkan di ringkasan harga dan disertakan utuh di template pesan WhatsApp sesuai PRD Bagian 7 dan 10.
6. **Jadwal operasional toko (FT-07)**: Diperbarui sesuai permintaan pengguna menjadi **Senin–Jumat**, jam buka **08.00–20.00 WIB**, jadwal penjemputan **09.00–17.00 WIB**, dengan keterangan **Sabtu dan Minggu tutup**, ditampilkan di bagian atas halaman di bawah judul LaundryCalc.
