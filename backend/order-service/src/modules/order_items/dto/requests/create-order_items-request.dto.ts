import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemRequest {
  order_id: number;
  product_id: number;
  quantity: number;
}
