export interface CreateOrderDTO {
  user_id?: number;
  total_price: number;
  discount: number;
  final_price: number;
  ship_method: 'HOME_DELIVERY' | 'PICK_UP';
  shippingAddress?: {
    recipientName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    address: string;
  };
  // Thêm items nếu bạn muốn lưu luôn thông tin sản phẩm
  items?: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
}
