import { OrderShipMethod, OrderStatus } from 'src/modules/orders/enums/order.enum';

export class UpdateOrderRequest {
  order_status?: OrderStatus;
  ship_method?: OrderShipMethod;
}
