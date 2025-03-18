import { Controller, Get, Post, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { Order } from '../entities/orders.entity';
import { MessagePattern, Payload } from '@nestjs/microservices'; // Sửa lỗi thiếu import Payload

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @MessagePattern({ cmd: "create_order" })
  async createOrder(@Payload() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }


  @MessagePattern({ cmd: 'get_orders' })
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @MessagePattern({ cmd: 'get_order_by_id' })
  async getOrderById(@Payload() data: { id: number }): Promise<Order | null> {
    return this.orderService.getOrderById(data.id);
  }


  @MessagePattern({ cmd: 'update_order' })
  async updateOrder(@Payload() data: { id: number; updateOrderRequest: Partial<Order> }): Promise<Order | null> {
    return this.orderService.updateOrder(data.id, data.updateOrderRequest);
  }


  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(@Payload() data: { id: number }): Promise<boolean> {
    return this.orderService.deleteOrder(data.id);
  }
}
