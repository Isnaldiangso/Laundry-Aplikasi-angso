// Komponen FT-04 & pemicu FT-06: Menampilkan rincian estimasi biaya realtime di panel desktop dan bar bawah ponsel.

import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { APP_DEFAULTS } from '../config';
import { formatBerat, formatRupiah } from '../lib/format';
import type { HasilKalkulasi } from '../lib/kalkulator';

interface RingkasanHargaProps {
  kalkulasi: HasilKalkulasi;
  isDelivery: boolean;
  isPremiumFragrance: boolean;
  onSubmit: () => void;
}

function DaftarRincian({
  kalkulasi,
  isDelivery,
  isPremiumFragrance,
}: Omit<RingkasanHargaProps, 'onSubmit'>) {
  const beratValid = kalkulasi.isValidWeight;

  return (
    <dl className="space-y-3 text-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <dt className="font-medium text-neutral-900">Biaya Layanan Utama</dt>
          <dd className="text-neutral-600">
            {kalkulasi.service.name}
            {beratValid
              ? ` (${formatBerat(kalkulasi.billedWeight)} kg ditagih)`
              : ' (berat belum diisi)'}
          </dd>
        </div>
        <dd className="shrink-0 font-semibold tabular-nums text-neutral-900">
          {beratValid ? formatRupiah(kalkulasi.mainServiceCost) : '-'}
        </dd>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <dt className="font-medium text-neutral-900">Biaya Tambahan</dt>
          <dd className="space-y-1 text-neutral-600">
            {!isDelivery && !isPremiumFragrance && <span>Tidak ada</span>}
            {isDelivery && (
              <span className="block tabular-nums">
                Antar-Jemput ({formatRupiah(kalkulasi.deliveryCost)})
              </span>
            )}
            {isPremiumFragrance && (
              <span className="block tabular-nums">
                Pewangi Premium (
                {beratValid ? formatRupiah(kalkulasi.fragranceCost) : '-'})
              </span>
            )}
          </dd>
        </div>
        <dd className="shrink-0 font-semibold tabular-nums text-neutral-900">
          {beratValid ? formatRupiah(kalkulasi.addOnsTotal) : '-'}
        </dd>
      </div>
    </dl>
  );
}

export function RingkasanHarga({
  kalkulasi,
  isDelivery,
  isPremiumFragrance,
  onSubmit,
}: RingkasanHargaProps) {
  const [rincianTerbuka, setRincianTerbuka] = useState(false);

  const labelTotal = kalkulasi.isValidWeight
    ? formatRupiah(kalkulasi.estimatedTotal)
    : '-';

  return (
    <>
      {/* Panel ringkasan sticky untuk layar desktop */}
      <aside
        aria-labelledby="judul-ringkasan-desktop"
        className="hidden lg:sticky lg:top-8 lg:block"
      >
        <div className="space-y-6 rounded-2xl bg-white p-6">
          <h2
            id="judul-ringkasan-desktop"
            className="text-lg font-semibold text-neutral-900"
          >
            Ringkasan Biaya
          </h2>

          <DaftarRincian
            kalkulasi={kalkulasi}
            isDelivery={isDelivery}
            isPremiumFragrance={isPremiumFragrance}
          />

          <div className="border-t border-neutral-200 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-base font-semibold text-neutral-900">
                Total Estimasi
              </span>
              <span className="text-3xl font-semibold tabular-nums text-neutral-900">
                {labelTotal}
              </span>
            </div>
            {!kalkulasi.isValidWeight && (
              <p className="mt-2 text-sm text-neutral-600">
                Masukkan berat cucian minimal 0,1 kg untuk menghitung total.
              </p>
            )}
          </div>

          <p className="text-sm text-neutral-600">
            {APP_DEFAULTS.estimationClause}
          </p>

          <button
            type="button"
            onClick={onSubmit}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold text-white transition-colors duration-150 ease-out hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">Kirim ke WhatsApp</span>
          </button>
        </div>
      </aside>

      {/* Bar ringkasan menempel di bawah layar untuk ponsel */}
      <div
        aria-label="Ringkasan biaya dan kirim pesanan"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <div className="mx-auto max-w-2xl px-4 py-3">
          {rincianTerbuka && (
            <div
              id="rincian-biaya-ponsel"
              className="mb-3 space-y-3 border-b border-neutral-200 pb-3"
            >
              <DaftarRincian
                kalkulasi={kalkulasi}
                isDelivery={isDelivery}
                isPremiumFragrance={isPremiumFragrance}
              />
              <p className="text-sm text-neutral-600">
                {APP_DEFAULTS.estimationClause}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setRincianTerbuka((sebelumnya) => !sebelumnya)}
              aria-expanded={rincianTerbuka}
              aria-controls="rincian-biaya-ponsel"
              className="flex min-h-[44px] min-w-0 flex-col items-start justify-center rounded-xl pr-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <span className="flex items-center gap-1 text-sm text-neutral-600">
                <span>Total Estimasi</span>
                {rincianTerbuka ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-blue-700" />
                ) : (
                  <ChevronUp className="h-4 w-4 shrink-0 text-blue-700" />
                )}
              </span>
              <span className="text-xl font-semibold tabular-nums text-neutral-900">
                {labelTotal}
              </span>
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Kirim ke WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
