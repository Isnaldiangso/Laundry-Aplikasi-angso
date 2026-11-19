// Generator pesan template WhatsApp (PRD Bagian 7) dan pembuat tautan wa.me yang aman (BL-03).

import { APP_DEFAULTS, STORE_INFO } from '../config';
import { formatBerat, formatRupiah } from './format';
import type { HasilKalkulasi } from './kalkulator';

export interface InputPesanWhatsApp {
  customerName: string;
  pickupAddress: string;
  notes: string;
  isDelivery: boolean;
  isPremiumFragrance: boolean;
  kalkulasi: HasilKalkulasi;
}

export function buatPesanWhatsApp(input: InputPesanWhatsApp): string {
  const nama = input.customerName.trim();
  const alamat = input.isDelivery
    ? input.pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const catatan = input.notes.trim().length > 0 ? input.notes.trim() : '-';

  const teksAntarJemput = input.isDelivery
    ? `Ya (+${formatRupiah(input.kalkulasi.deliveryCost)})`
    : 'Tidak';

  const teksPewangi = input.isPremiumFragrance
    ? `Ya (+${formatRupiah(input.kalkulasi.fragranceCost)})`
    : 'Tidak';

  const barisPesan = [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${nama}`,
    `*Layanan Utama:* ${input.kalkulasi.service.name}`,
    `*Estimasi Berat:* ${formatBerat(input.kalkulasi.actualWeight)} kg (Berat Ditagih: ${formatBerat(input.kalkulasi.billedWeight)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${teksAntarJemput}`,
    `- Pewangi Premium: ${teksPewangi}`,
    '',
    `*Alamat Penjemputan:* ${alamat}`,
    `*Catatan Khusus:* ${catatan}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(input.kalkulasi.estimatedTotal)}*`,
    '',
    APP_DEFAULTS.whatsappEstimationClause,
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ];

  return barisPesan.join('\n');
}

export function buatTautanWhatsApp(
  pesan: string,
  nomorWa: string = STORE_INFO.whatsappNumber,
): string {
  const nomorBersih = nomorWa.replace(/\D/g, '');
  return `https://wa.me/${nomorBersih}?text=${encodeURIComponent(pesan)}`;
}
