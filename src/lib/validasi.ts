// Aturan validasi formulir pemesanan laundry sesuai BL-01 dan BL-03 di PRD.

import { STORE_INFO } from '../config';
import { parseBeratInput } from './format';

export type FieldErrorKey = 'weight' | 'customerName' | 'pickupAddress';

export interface InputValidasi {
  weightInput: string;
  customerName: string;
  pickupAddress: string;
  isDelivery: boolean;
}

export interface HasilValidasi {
  isValid: boolean;
  errors: Partial<Record<FieldErrorKey, string>>;
  firstErrorField: FieldErrorKey | null;
}

export function validasiPesanan(input: InputValidasi): HasilValidasi {
  const errors: Partial<Record<FieldErrorKey, string>> = {};
  const berat = parseBeratInput(input.weightInput);

  if (berat === null || berat < STORE_INFO.minWeightInputKg) {
    errors.weight = 'Masukkan estimasi berat minimal 0,1 kg, contoh: 2,5.';
  } else if (berat > STORE_INFO.maxWeightInputKg) {
    errors.weight = `Estimasi berat maksimal ${STORE_INFO.maxWeightInputKg} kg per pesanan, contoh: 15.`;
  }

  if (input.customerName.trim().length === 0) {
    errors.customerName =
      'Masukkan nama Anda agar admin mudah menghubungi, contoh: Budi Santoso.';
  }

  if (input.isDelivery && input.pickupAddress.trim().length === 0) {
    errors.pickupAddress =
      'Masukkan alamat jemput lengkap beserta patokan, contoh: Jl. Melati No. 12, Kost Putri.';
  }

  const urutan: FieldErrorKey[] = ['weight', 'customerName', 'pickupAddress'];
  const firstErrorField = urutan.find((key) => Boolean(errors[key])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
