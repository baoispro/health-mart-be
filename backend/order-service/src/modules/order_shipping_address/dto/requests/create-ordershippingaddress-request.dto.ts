export class CreateOrderShippingAddressRequest {
  orderId: number;
  city: string;
  district: string;
  ward: string;
  address: string;
  pharmacy_id?: number;
}
