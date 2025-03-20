import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Inject,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('orders')
@ApiTags('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }
}
