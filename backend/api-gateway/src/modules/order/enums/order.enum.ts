export enum OrderStatus {
  PENDING = 'PENDING',
  PENDING_NOTPAYMENT = 'PENDING_NOTPAYMENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum OrderShipMethod {
  HOME_DELIVERY = 'HOME_DELIVERY',
  PICK_UP = 'PICK_UP',
}

export enum DiscountType {
  NONE = 'NONE',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}
