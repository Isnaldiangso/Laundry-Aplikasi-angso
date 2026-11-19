// Komponen FT-05: Formulir data pemesan (Nama, Alamat kondisional saat Antar-Jemput aktif, dan Catatan Khusus).

import { AlertCircle } from 'lucide-react';
import type { RefObject } from 'react';
import { STORE_INFO } from '../config';

interface FormPemesanProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  isDelivery: boolean;
  nameError?: string;
  addressError?: string;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export function FormPemesan({
  customerName,
  pickupAddress,
  notes,
  isDelivery,
  nameError,
  addressError,
  nameInputRef,
  addressInputRef,
  onNameChange,
  onAddressChange,
  onNotesChange,
}: FormPemesanProps) {
  return (
    <section aria-labelledby="judul-data-pemesan" className="space-y-4">
      <div className="space-y-1">
        <h2
          id="judul-data-pemesan"
          className="text-lg font-semibold text-neutral-900"
        >
          Data Pemesan
        </h2>
        <p className="text-sm text-neutral-600">
          Lengkapi data berikut untuk dimasukkan ke pesan WhatsApp Anda.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl bg-white p-6">
        <div className="space-y-2">
          <label
            htmlFor="input-nama-pemesan"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan <span className="text-neutral-600">(Wajib)</span>
          </label>
          <input
            ref={nameInputRef}
            id="input-nama-pemesan"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'error-nama-pemesan' : undefined}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              nameError ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {nameError && (
            <div
              id="error-nama-pemesan"
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{nameError}</span>
            </div>
          )}
        </div>

        {isDelivery && (
          <div className="space-y-2">
            <label
              htmlFor="input-alamat-jemput"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan{' '}
              <span className="text-neutral-600">(Wajib)</span>
            </label>
            <textarea
              ref={addressInputRef}
              id="input-alamat-jemput"
              name="pickupAddress"
              rows={3}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(event) => onAddressChange(event.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, Kost Putri lantai 2"
              aria-invalid={Boolean(addressError)}
              aria-describedby={
                addressError
                  ? 'error-alamat-jemput bantuan-alamat-jemput'
                  : 'bantuan-alamat-jemput'
              }
              className={`min-h-[88px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                addressError ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <p id="bantuan-alamat-jemput" className="text-sm text-neutral-600">
              Radius jemput maks {STORE_INFO.pickupRadiusMaxKm} km dari toko.
            </p>
            {addressError && (
              <div
                id="error-alamat-jemput"
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{addressError}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="input-catatan-khusus"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus <span className="text-neutral-600">(Opsional)</span>
          </label>
          <textarea
            id="input-catatan-khusus"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="Contoh: Pisahkan baju putih atau bahan sutra"
            className="min-h-[72px] w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>
    </section>
  );
}
