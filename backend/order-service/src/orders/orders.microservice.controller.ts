import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';

@Controller()
export class OrdersMicroserviceController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })  
  async createOrder(@Payload() orderData: Partial<Order>): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @MessagePattern({ cmd: 'get_orders' })  
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @MessagePattern({ cmd: 'get_order_by_id' })  
  async getOrderById(@Payload() data: { id: number }): Promise<Order | null> { 
    return this.ordersService.getOrderById(data.id); 
  }

  @MessagePattern({ cmd: 'update_order' })
  async updateOrder(@Payload() data: { id: number; orderData: Partial<Order> }): Promise<Order | null> {
    return this.ordersService.updateOrder(data.id, data.orderData);
  }

  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(@Payload() data: { id: number }): Promise<boolean> {
    return this.ordersService.deleteOrder(data.id);
  }
}
