export interface Plan {
  id: number;
  planNameEn: string;
  planNameAr: string;
  hoursIncluded: number;
  price: number;
  salePrice?: number;
  tariffAfterFree?: number;
  status: number;
}
