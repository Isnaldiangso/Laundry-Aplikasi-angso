// Komponen FT-07: Menampilkan jam operasional toko, jadwal penjemputan, dan keterangan hari libur dari konfigurasi.

import { Clock, Truck } from 'lucide-react';
import { STORE_INFO } from '../config';

export function InfoOperasional() {
  return (
    <section
      aria-label="Jam operasional toko"
      className="mb-8 rounded-2xl bg-white p-4 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex items-start gap-3">
          <Clock
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-neutral-900">
              Jam Buka Toko
            </p>
            <p className="text-sm tabular-nums text-neutral-900">
              {STORE_INFO.operatingDays}, {STORE_INFO.openingHours}
            </p>
            <p className="text-sm text-neutral-600">
              {STORE_INFO.closedDaysNote}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-neutral-200 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
          <Truck
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-neutral-900">
              Jadwal Penjemputan
            </p>
            <p className="text-sm tabular-nums text-neutral-900">
              {STORE_INFO.operatingDays}, {STORE_INFO.pickupHours}
            </p>
            <p className="text-sm text-neutral-600">
              Khusus hari operasional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
