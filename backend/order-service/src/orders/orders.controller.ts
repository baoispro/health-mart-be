import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @MessagePattern({ cmd: 'get_all_orders' })
  getAllOrders() {
    return this.orderService.findUser();
  }

  
}
