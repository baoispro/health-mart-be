// src/modules/order_shipping_address/dto/requests/create-ordershippingaddress-request.dto.ts
export class CreateOrderShippingAddressRequest {
  orderId: number; 
  city: string;
  district: string;
  ward: string;
  address: string;
  pharmacy_id?: number;
}
