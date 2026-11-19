// Logika murni perhitungan berat ditagih (BL-01) dan estimasi biaya laundry (BL-02).

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  type AddOnCode,
  type AddOnService,
  type MainService,
  type ServiceCode,
} from '../config';

export interface InputKalkulasi {
  serviceCode: ServiceCode;
  actualWeight: number | null;
  isDelivery: boolean;
  isPremiumFragrance: boolean;
}

export interface HasilKalkulasi {
  service: MainService;
  isValidWeight: boolean;
  actualWeight: number;
  billedWeight: number;
  isMinChargeApplied: boolean;
  mainServiceCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnsTotal: number;
  estimatedTotal: number;
}

export function cariLayanan(kode: ServiceCode): MainService {
  const ditemukan = MAIN_SERVICES.find((item) => item.code === kode);
  return ditemukan ?? MAIN_SERVICES[0];
}

export function cariAddOn(kode: AddOnCode): AddOnService {
  const ditemukan = ADD_ONS.find((item) => item.code === kode);
  return ditemukan ?? ADD_ONS[0];
}

export function hitungBeratDitagih(beratAktual: number): number {
  return Math.max(STORE_INFO.minimumChargeKg, beratAktual);
}

export function hitungEstimasiBiaya(input: InputKalkulasi): HasilKalkulasi {
  const service = cariLayanan(input.serviceCode);
  const deliveryAddOn = cariAddOn('T01');
  const fragranceAddOn = cariAddOn('T02');

  const beratValid =
    input.actualWeight !== null &&
    input.actualWeight >= STORE_INFO.minWeightInputKg &&
    input.actualWeight <= STORE_INFO.maxWeightInputKg;

  if (!beratValid || input.actualWeight === null) {
    return {
      service,
      isValidWeight: false,
      actualWeight: input.actualWeight ?? 0,
      billedWeight: 0,
      isMinChargeApplied: false,
      mainServiceCost: 0,
      deliveryCost: 0,
      fragranceCost: 0,
      addOnsTotal: 0,
      estimatedTotal: 0,
    };
  }

  const billedWeight = hitungBeratDitagih(input.actualWeight);
  const isMinChargeApplied = input.actualWeight < STORE_INFO.minimumChargeKg;
  const mainServiceCost = Math.round(billedWeight * service.pricePerKg);
  const deliveryCost = input.isDelivery ? deliveryAddOn.price : 0;
  const fragranceCost = input.isPremiumFragrance
    ? Math.round(billedWeight * fragranceAddOn.price)
    : 0;
  const addOnsTotal = deliveryCost + fragranceCost;
  const estimatedTotal = mainServiceCost + addOnsTotal;

  return {
    service,
    isValidWeight: true,
    actualWeight: input.actualWeight,
    billedWeight,
    isMinChargeApplied,
    mainServiceCost,
    deliveryCost,
    fragranceCost,
    addOnsTotal,
    estimatedTotal,
  };
}
