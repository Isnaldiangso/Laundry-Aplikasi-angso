// Komponen FT-01: Menampilkan katalog paket layanan utama dengan tarif per kg, durasi pengerjaan, dan pilihan tunggal.

import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface KatalogLayananProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export function KatalogLayanan({
  selectedCode,
  onSelect,
}: KatalogLayananProps) {
  return (
    <section aria-labelledby="judul-layanan-utama" className="space-y-4">
      <div className="space-y-1">
        <h2
          id="judul-layanan-utama"
          className="text-lg font-semibold text-neutral-900"
        >
          Pilih Layanan Utama
        </h2>
        <p className="text-sm text-neutral-600">
          Pilih satu paket sesuai kebutuhan cucian Anda.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="judul-layanan-utama"
        className="space-y-3"
      >
        {MAIN_SERVICES.map((layanan) => {
          const aktif = layanan.code === selectedCode;
          const teksDurasi =
            layanan.durationDays === 1
              ? 'Selesai 1 hari'
              : `Selesai ${layanan.durationDays} hari`;

          return (
            <label
              key={layanan.code}
              className={`flex min-h-[44px] cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                aktif
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="mainService"
                value={layanan.code}
                checked={aktif}
                onChange={() => onSelect(layanan.code)}
                className="sr-only"
              />

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ease-out motion-reduce:transition-none ${
                    aktif
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {aktif && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {layanan.name}
                    </span>
                    <span className="text-sm font-medium text-neutral-600">
                      {teksDurasi}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {layanan.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`block text-base font-semibold tabular-nums ${
                    aktif ? 'text-blue-700' : 'text-neutral-900'
                  }`}
                >
                  {formatRupiah(layanan.pricePerKg)}
                </span>
                <span className="block text-sm text-neutral-600">per kg</span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
