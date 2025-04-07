export enum OrderStatus {
  PENDING = 'PENDING', // Chờ xử lý
  CONFIRMED = 'CONFIRMED', // Đã xác nhận
  PROCESSING = 'PROCESSING', // Đang xử lý
  SHIPPING = 'SHIPPING', // Đang giao hàng
  DELIVERED = 'DELIVERED', // Đã giao hàng
  COMPLETED = 'COMPLETED', // Đã hoàn thành
  CANCELLED = 'CANCELLED', // Đã hủy
  FAILED = 'FAILED', // Thất bại
  REFUNDED = 'REFUNDED', // Đã hoàn tiền
  DELETED = 'DELETED', // Đã xóa
}

export enum OrderShipMethod {
  HOME_DELIVERY = 'HOME_DELIVERY',
  PICK_UP = 'PICK_UP',
}
