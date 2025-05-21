export class CreateOrderShippingAddressRequest {
  orderId: number;
  city: string;
  district: string;
  ward: string;
  address: string;
  pharmacy_id?: number;
  recipientName: string;
  phoneNumber: string;

  // Các trường của người đặt
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  note?: string;
}
