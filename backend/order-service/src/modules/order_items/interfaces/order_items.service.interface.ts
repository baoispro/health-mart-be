import { OrderItem } from '../entities/order_items.entity';
import { CreateOrderItemRequestDto } from '../dto/requests/create-order_item-request.dto';

export interface OrderItemsService {
  findAll(): Promise<OrderItem[]>;
  findByOrderId(orderId: number): Promise<OrderItem[]>;
  createOrderItem(dtos: CreateOrderItemRequestDto[]): Promise<OrderItem[]>;
  deleteItemById(orderItemId: number): Promise<{ message: string }>;
}
