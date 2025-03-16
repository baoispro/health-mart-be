import { OrderShipMethod, OrderStatus } from "src/orders/order.enum";

export class UpdateOrderRequest {
    user_id?: number;
    total_price?: number;
    final_price?: number;
    order_status?: OrderStatus;
    ship_method?: OrderShipMethod;
}
