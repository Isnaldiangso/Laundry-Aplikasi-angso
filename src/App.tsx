// Halaman utama LaundryCalc yang menyatukan alur fitur FT-01 sampai FT-06 dalam satu halaman bergulir.

import { useMemo, useRef, useState } from 'react';
import { FormPemesan } from './components/FormPemesan';
import { InputBerat } from './components/InputBerat';
import { KatalogLayanan } from './components/KatalogLayanan';
import { OpsiTambahan } from './components/OpsiTambahan';
import { PanelKonfirmasiWa } from './components/PanelKonfirmasiWa';
import { RingkasanHarga } from './components/RingkasanHarga';
import { APP_DEFAULTS, DESIGN_CONFIG, type ServiceCode } from './config';
import { parseBeratInput } from './lib/format';
import { hitungEstimasiBiaya } from './lib/kalkulator';
import { validasiPesanan, type FieldErrorKey } from './lib/validasi';
import { buatPesanWhatsApp, buatTautanWhatsApp } from './lib/whatsapp';

interface PesananTerkirim {
  url: string;
  pesan: string;
}

export default function App() {
  const [serviceCode, setServiceCode] = useState<ServiceCode>(
    APP_DEFAULTS.defaultServiceCode,
  );
  const [weightInput, setWeightInput] = useState<string>(
    APP_DEFAULTS.defaultWeightInput,
  );
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [isPremiumFragrance, setIsPremiumFragrance] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<FieldErrorKey, string>>>(
    {},
  );
  const [pesananTerkirim, setPesananTerkirim] =
    useState<PesananTerkirim | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const actualWeight = useMemo(
    () => parseBeratInput(weightInput),
    [weightInput],
  );

  const kalkulasi = useMemo(
    () =>
      hitungEstimasiBiaya({
        serviceCode,
        actualWeight,
        isDelivery,
        isPremiumFragrance,
      }),
    [serviceCode, actualWeight, isDelivery, isPremiumFragrance],
  );

  function hapusError(field: FieldErrorKey) {
    setErrors((sebelumnya) => {
      if (!sebelumnya[field]) {
        return sebelumnya;
      }
      const salinan = { ...sebelumnya };
      delete salinan[field];
      return salinan;
    });
  }

  function handleSelectService(code: ServiceCode) {
    setServiceCode(code);
    setPesananTerkirim(null);
  }

  function handleWeightChange(value: string) {
    setWeightInput(value);
    hapusError('weight');
    setPesananTerkirim(null);
  }

  function handleToggleDelivery(checked: boolean) {
    setIsDelivery(checked);
    if (!checked) {
      hapusError('pickupAddress');
    }
    setPesananTerkirim(null);
  }

  function handleToggleFragrance(checked: boolean) {
    setIsPremiumFragrance(checked);
    setPesananTerkirim(null);
  }

  function handleNameChange(value: string) {
    setCustomerName(value);
    hapusError('customerName');
    setPesananTerkirim(null);
  }

  function handleAddressChange(value: string) {
    setPickupAddress(value);
    hapusError('pickupAddress');
    setPesananTerkirim(null);
  }

  function handleNotesChange(value: string) {
    setNotes(value);
    setPesananTerkirim(null);
  }

  function fokusKolomError(field: FieldErrorKey) {
    if (field === 'weight') {
      weightInputRef.current?.focus();
    } else if (field === 'customerName') {
      nameInputRef.current?.focus();
    } else if (field === 'pickupAddress') {
      addressInputRef.current?.focus();
    }
  }

  function bukaTautanBaru(url: string) {
    const tautan = document.createElement('a');
    tautan.href = url;
    tautan.target = '_blank';
    tautan.rel = 'noopener noreferrer';
    document.body.appendChild(tautan);
    tautan.click();
    document.body.removeChild(tautan);
  }

  function handleKirimWhatsApp() {
    const hasilValidasi = validasiPesanan({
      weightInput,
      customerName,
      pickupAddress,
      isDelivery,
    });

    if (!hasilValidasi.isValid) {
      setErrors(hasilValidasi.errors);
      setPesananTerkirim(null);
      if (hasilValidasi.firstErrorField) {
        fokusKolomError(hasilValidasi.firstErrorField);
      }
      return;
    }

    setErrors({});

    const pesan = buatPesanWhatsApp({
      customerName,
      pickupAddress,
      notes,
      isDelivery,
      isPremiumFragrance,
      kalkulasi,
    });
    const url = buatTautanWhatsApp(pesan);

    setPesananTerkirim({ url, pesan });
    bukaTautanBaru(url);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-5xl px-4 pt-6 pb-28 sm:px-6 lg:py-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {DESIGN_CONFIG.appName}
          </h1>
          <p className="text-base text-neutral-600">
            Hitung estimasi biaya cucian Anda dan pesan lewat WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <KatalogLayanan
              selectedCode={serviceCode}
              onSelect={handleSelectService}
            />

            <InputBerat
              weightInput={weightInput}
              isMinChargeApplied={kalkulasi.isMinChargeApplied}
              billedWeight={kalkulasi.billedWeight}
              error={errors.weight}
              inputRef={weightInputRef}
              onChange={handleWeightChange}
            />

            <OpsiTambahan
              isDelivery={isDelivery}
              isPremiumFragrance={isPremiumFragrance}
              isValidWeight={kalkulasi.isValidWeight}
              billedWeight={kalkulasi.billedWeight}
              fragranceCost={kalkulasi.fragranceCost}
              onToggleDelivery={handleToggleDelivery}
              onToggleFragrance={handleToggleFragrance}
            />

            <FormPemesan
              customerName={customerName}
              pickupAddress={pickupAddress}
              notes={notes}
              isDelivery={isDelivery}
              nameError={errors.customerName}
              addressError={errors.pickupAddress}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
              onNameChange={handleNameChange}
              onAddressChange={handleAddressChange}
              onNotesChange={handleNotesChange}
            />

            <p className="text-sm text-neutral-600 lg:hidden">
              {APP_DEFAULTS.estimationClause}
            </p>

            {pesananTerkirim && (
              <PanelKonfirmasiWa
                url={pesananTerkirim.url}
                pesan={pesananTerkirim.pesan}
              />
            )}
          </div>

          <div className="lg:col-span-5">
            <RingkasanHarga
              kalkulasi={kalkulasi}
              isDelivery={isDelivery}
              isPremiumFragrance={isPremiumFragrance}
              onSubmit={handleKirimWhatsApp}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
