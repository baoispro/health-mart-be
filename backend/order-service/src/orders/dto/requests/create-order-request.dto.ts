import { OrderShipMethod, OrderStatus } from "src/orders/enums/order.enum";

export class CreateOrderRequest {
    user_id: number;
    total_price: number;
    final_price: number;
    order_status: OrderStatus;
    ship_method: OrderShipMethod;
}
