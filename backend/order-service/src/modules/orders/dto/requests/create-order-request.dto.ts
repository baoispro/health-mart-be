import {
  OrderShipMethod,
  OrderStatus,
} from 'src/modules/orders/enums/order.enum';

export class CreateOrderRequest {
  user_id: number;
  total_price: number;
  discount?: number;
  order_status: OrderStatus;
  ship_method: OrderShipMethod;
}
