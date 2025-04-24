import { Order } from '../entities/orders.entity';

export interface OrderService {
  findAll(): Promise<any[]>;
  getOrderById(id: number): Promise<any>;
  createOrder(orderData: Partial<Order>): Promise<Order>;
  updateOrder(id: number, orderData: Partial<Order>): Promise<Order>;
}
