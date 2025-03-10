import { Controller, Get, Post, Body, Put, Delete, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';


@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Get()
  getOrders() {
      return this.orderService.getOrders();
  }
}
