# Keputusan Desain LaundryCalc

Dokumen ini mencatat seluruh pilihan tampilan yang disetujui pengguna serta token gaya yang digunakan di seluruh aplikasi.

## Profil Desain Disetujui

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Nama aplikasi | LaundryCalc |
| Kesan visual | Ramah dan hangat (`Plus Jakarta Sans`) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir |
| Posisi aksi utama | Bar menempel di bawah layar (ponsel) dan panel kanan sticky (desktop) |
| Gambar | Tanpa gambar |
| Bentuk pilihan layanan | Kartu radio interaktif (FT-01) dan kartu checkbox interaktif (FT-03) |

## Token Visual

### Permukaan dan Bentuk
- Latar halaman: `bg-neutral-50`
- Kartu dan panel utama: `bg-white` (tanpa kartu bersarang di dalam kartu)
- Garis tepi input, pemisah, dan kartu pilihan: `border-neutral-200`
- Sudut: panel/kartu `rounded-2xl`, tombol/input `rounded-xl`
- Bayangan (khusus elemen melayang seperti bar bawah ponsel): `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`

### Warna
- Teks utama: `text-neutral-900`
- Teks pendukung: `text-neutral-600`
- Placeholder: `text-neutral-500`
- Tombol utama: `bg-blue-700`, hover `hover:bg-blue-800`, teks putih
- Teks aksen: `text-blue-700`
- Elemen terpilih: `border-blue-700 bg-blue-50`
- Cincin fokus: `focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2`
- Status peringatan (minimum charge 3 kg): `bg-amber-50 text-amber-800` + ikon `Info`
- Status gagal (validasi form): `bg-red-50 text-red-800` + ikon `AlertCircle`
- Status berhasil (konfirmasi kirim/salin): `bg-emerald-50 text-emerald-800` + ikon `CheckCircle2`

### Tipografi
- Font: `@fontsource/plus-jakarta-sans` (ketebalan 400, 500, 600)
- Judul halaman: `text-2xl font-semibold`
- Judul bagian: `text-lg font-semibold`
- Isi teks: `text-base`
- Label dan teks bantuan: `text-sm` (minimal 14 px)
- Teks input: `text-base` (minimal 16 px)
- Angka total utama: `text-3xl font-semibold tabular-nums`
- Semua angka harga dan berat memakai `tabular-nums`

### Aksesibilitas dan Tata Letak
- Dirancang dari layar `360 × 740 px` dengan tombol aksi utama selalu terlihat tanpa menggulir.
- Area sentuh seluruh tombol, kartu pilihan, dan kontrol minimal `44 × 44 px`.
- Kontras teks minimal 4,5:1 dan setiap input memiliki label yang selalu terlihat.
- Transisi halus 150–200 ms `ease-out` hanya untuk `transform`, `opacity`, dan warna, dengan dukungan `motion-reduce:transition-none`.
