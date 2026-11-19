// Komponen FT-03: Pilihan layanan tambahan Antar-Jemput dan Pewangi Premium dalam bentuk kartu checkbox.

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatBerat, formatRupiah } from '../lib/format';

interface OpsiTambahanProps {
  isDelivery: boolean;
  isPremiumFragrance: boolean;
  isValidWeight: boolean;
  billedWeight: number;
  fragranceCost: number;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
}

export function OpsiTambahan({
  isDelivery,
  isPremiumFragrance,
  isValidWeight,
  billedWeight,
  fragranceCost,
  onToggleDelivery,
  onToggleFragrance,
}: OpsiTambahanProps) {
  return (
    <section aria-labelledby="judul-layanan-tambahan" className="space-y-4">
      <div className="space-y-1">
        <h2
          id="judul-layanan-tambahan"
          className="text-lg font-semibold text-neutral-900"
        >
          Layanan Tambahan
        </h2>
        <p className="text-sm text-neutral-600">
          Opsional. Pilih tambahan sesuai kebutuhan Anda.
        </p>
      </div>

      <div className="space-y-3">
        {ADD_ONS.map((addOn) => {
          const adalahAntarJemput = addOn.code === 'T01';
          const aktif = adalahAntarJemput ? isDelivery : isPremiumFragrance;
          const handleChange = adalahAntarJemput
            ? onToggleDelivery
            : onToggleFragrance;

          const labelTarif =
            addOn.calculationType === 'flat'
              ? `+${formatRupiah(addOn.price)}`
              : `+${formatRupiah(addOn.price)}/kg`;

          return (
            <label
              key={addOn.code}
              className={`flex min-h-[44px] cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                aktif
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="checkbox"
                name={adalahAntarJemput ? 'addonDelivery' : 'addonFragrance'}
                checked={aktif}
                onChange={(event) => handleChange(event.target.checked)}
                className="sr-only"
              />

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ease-out motion-reduce:transition-none ${
                    aktif
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {aktif && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>

                <div className="space-y-1">
                  <span className="block text-base font-semibold text-neutral-900">
                    {addOn.name}
                  </span>
                  <p className="text-sm text-neutral-600">{addOn.notes}</p>
                  {!adalahAntarJemput && aktif && isValidWeight && (
                    <p className="text-sm font-medium tabular-nums text-blue-700">
                      Subtotal pewangi ({formatBerat(billedWeight)} kg):{' '}
                      {formatRupiah(fragranceCost)}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`block text-base font-semibold tabular-nums ${
                    aktif ? 'text-blue-700' : 'text-neutral-900'
                  }`}
                >
                  {labelTarif}
                </span>
                <span className="block text-sm text-neutral-600">
                  {addOn.calculationType === 'flat' ? 'per pesanan' : 'ditagih'}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
