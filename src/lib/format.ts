// Fungsi pemformatan angka tunggal untuk Rupiah, berat cucian, dan pembacaan input desimal.

import { APP_DEFAULTS } from '../config';

const formatterRibuan = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

export function formatRupiah(nominal: number): string {
  const bulat = Math.round(nominal);
  const angka = formatterRibuan.format(bulat);
  return APP_DEFAULTS.rupiahSpaceAfterPrefix ? `Rp ${angka}` : `Rp${angka}`;
}

export function formatBerat(beratKg: number): string {
  const dibulatkan = Math.round(beratKg * 10) / 10;
  if (Number.isInteger(dibulatkan)) {
    return String(dibulatkan);
  }
  return dibulatkan.toFixed(1).replace('.', ',');
}

export function parseBeratInput(teks: string): number | null {
  const bersih = teks.trim();
  if (!bersih) {
    return null;
  }
  const normalisasi = bersih.replace(',', '.');
  if (!/^\d*\.?\d+$/.test(normalisasi)) {
    return null;
  }
  const nilai = Number(normalisasi);
  if (!Number.isFinite(nilai)) {
    return null;
  }
  return nilai;
}
