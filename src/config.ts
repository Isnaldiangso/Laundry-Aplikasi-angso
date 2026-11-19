// Konfigurasi terpusat data bisnis dari PRD LaundryCalc dan pengaturan desain aplikasi.

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';
export type AddOnCalculationType = 'flat' | 'per_billed_kg';

export interface StoreInfo {
  name: string;
  whatsappNumber: string;
  operatingDays: string;
  openingHours: string;
  pickupHours: string;
  closedDaysNote: string;
  pickupRadiusMaxKm: number;
  minimumChargeKg: number;
  minWeightInputKg: number;
  maxWeightInputKg: number;
  weightStepKg: number;
}

export interface MainService {
  code: ServiceCode;
  name: string;
  pricePerKg: number;
  durationDays: number;
  description: string;
}

export interface AddOnService {
  code: AddOnCode;
  name: string;
  price: number;
  calculationType: AddOnCalculationType;
  notes: string;
}

export interface AppDefaults {
  defaultServiceCode: ServiceCode;
  defaultWeightInput: string;
  rupiahSpaceAfterPrefix: boolean;
  estimationClause: string;
  whatsappEstimationClause: string;
}

export const STORE_INFO: StoreInfo = {
  name: 'Laundry UMKM',
  whatsappNumber: '6281234567890',
  operatingDays: 'Senin–Jumat',
  openingHours: '08.00–20.00 WIB',
  pickupHours: '09.00–17.00 WIB',
  closedDaysNote: 'Sabtu dan Minggu tutup',
  pickupRadiusMaxKm: 5,
  minimumChargeKg: 3,
  minWeightInputKg: 0.1,
  maxWeightInputKg: 100,
  weightStepKg: 0.1,
};

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    durationDays: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    durationDays: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    durationDays: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculationType: 'flat',
    notes: 'Area penjemputan radius maks 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculationType: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const APP_DEFAULTS: AppDefaults = {
  defaultServiceCode: 'L02',
  defaultWeightInput: '3',
  rupiahSpaceAfterPrefix: false,
  estimationClause:
    'Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir atau kurir laundry.',
  whatsappEstimationClause:
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
};

export const DESIGN_CONFIG = {
  appName: 'LaundryCalc',
  accent: 'blue',
  fontFamily: 'Plus Jakarta Sans',
  addressing: 'Anda',
} as const;
