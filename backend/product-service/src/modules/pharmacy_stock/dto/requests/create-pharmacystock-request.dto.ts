export class CreatePharmacyStockRequest {
  pharmacy_id: number;
  product_id: number;
  name: string;
  address_street: string;
  ward: string;
  district: string;
  city: string;
  quantity: number;
}