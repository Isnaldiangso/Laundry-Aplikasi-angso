// Komponen FT-02: Input estimasi berat cucian (kg) dengan kontrol step 0,1 kg dan notifikasi minimum charge 3 kg.

import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import type { RefObject } from 'react';
import { STORE_INFO } from '../config';
import { formatBerat, parseBeratInput } from '../lib/format';

interface InputBeratProps {
  weightInput: string;
  isMinChargeApplied: boolean;
  billedWeight: number;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
}

export function InputBerat({
  weightInput,
  isMinChargeApplied,
  billedWeight,
  error,
  inputRef,
  onChange,
}: InputBeratProps) {
  const beratSaatIni = parseBeratInput(weightInput);
  const tidakBisaKurang =
    beratSaatIni !== null && beratSaatIni <= STORE_INFO.minWeightInputKg;
  const tidakBisaTambah =
    beratSaatIni !== null && beratSaatIni >= STORE_INFO.maxWeightInputKg;

  function handleStep(delta: number) {
    const dasar =
      beratSaatIni !== null && beratSaatIni > 0
        ? beratSaatIni
        : STORE_INFO.minimumChargeKg;
    const nilaiBaru = Math.round((dasar + delta) * 10) / 10;
    const dibatasi = Math.min(
      STORE_INFO.maxWeightInputKg,
      Math.max(STORE_INFO.minWeightInputKg, nilaiBaru),
    );
    onChange(formatBerat(dibatasi));
  }

  const errorId = 'error-berat-cucian';
  const bantuanId = 'bantuan-berat-cucian';

  return (
    <section aria-labelledby="judul-berat-cucian" className="space-y-4">
      <h2
        id="judul-berat-cucian"
        className="text-lg font-semibold text-neutral-900"
      >
        Estimasi Berat Cucian
      </h2>

      <div className="space-y-4 rounded-2xl bg-white p-6">
        <div className="space-y-2">
          <label
            htmlFor="input-berat-cucian"
            className="block text-sm font-medium text-neutral-900"
          >
            Berat cucian (kg)
          </label>

          <div className="flex items-stretch gap-2">
            <button
              type="button"
              onClick={() => handleStep(-STORE_INFO.weightStepKg)}
              disabled={tidakBisaKurang}
              aria-label="Kurangi berat 0,1 kg"
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition-colors duration-150 ease-out hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
            >
              <Minus className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                id="input-berat-cucian"
                name="weight"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={weightInput}
                onChange={(event) => onChange(event.target.value)}
                placeholder="3"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${errorId} ${bantuanId}` : bantuanId}
                className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pr-12 pl-4 text-base font-medium tabular-nums text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  error ? 'border-red-700' : 'border-neutral-200'
                }`}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-neutral-600"
              >
                kg
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleStep(STORE_INFO.weightStepKg)}
              disabled={tidakBisaTambah}
              aria-label="Tambah berat 0,1 kg"
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition-colors duration-150 ease-out hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <p id={bantuanId} className="text-sm text-neutral-600">
            Minimal tagihan {formatBerat(STORE_INFO.minimumChargeKg)} kg. Contoh: 2,5 atau 4.
          </p>

          {error && (
            <div
              id={errorId}
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {isMinChargeApplied && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Ketentuan minimum charge {formatBerat(STORE_INFO.minimumChargeKg)}{' '}
              kg berlaku. Berat ditagih dihitung{' '}
              <span className="font-semibold tabular-nums">
                {formatBerat(billedWeight)} kg
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
