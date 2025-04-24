import { OrderItem } from '../entities/order_items.entity';
import { CreateOrderItemRequest } from '../dto/requests/create-order_items-request.dto';

export interface OrderItemsService {
  findAll(): Promise<OrderItem[]>;
  findByOrderId(orderId: number): Promise<OrderItem[]>;
  createOrderItem(dtos: CreateOrderItemRequest[]): Promise<OrderItem[]>;
  deleteItemById(orderItemId: number): Promise<{ message: string }>;
}
