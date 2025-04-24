import { DeleteResult } from 'typeorm';
import { CreateOrderItemRequestDto } from '../dto/requests/create-order_item-request.dto';
import { UpdateOrderItemRequestDto } from '../dto/requests/update-order_item-request.dto';
import { OrderItem } from '../entities/order_items.entity';

export interface IOrderItemService {
  create(createOrderItemRequest: CreateOrderItemRequestDto): Promise<OrderItem>;
  findAll(): Promise<OrderItem[]>;
  findOne(id: number): Promise<OrderItem>;
  update(id: number, updateOrderItemRequest: UpdateOrderItemRequestDto): Promise<OrderItem>;
  remove(id: number): Promise<DeleteResult>;
}