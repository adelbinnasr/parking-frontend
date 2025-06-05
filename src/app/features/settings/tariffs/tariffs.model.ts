export interface Tariff {
  id: number;
  tariffNameEn: string;
  tariffNameAr: string;
  pricePerHour: number;
  startDate: string; // ISO format
  endDate: string;
  status: number; // FK to GeneralStatus
}
