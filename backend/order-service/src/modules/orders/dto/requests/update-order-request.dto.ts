import { OrderShipMethod, OrderStatus } from 'src/modules/orders/enums/order.enum';

export class UpdateOrderRequest {
  total_price?: number;
  final_price?: number;
  order_status?: OrderStatus;
  ship_method?: OrderShipMethod;
  discount?: number;
}
