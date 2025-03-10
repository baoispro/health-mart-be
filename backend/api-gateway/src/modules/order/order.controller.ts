import { Controller, Get, Post, Body, Put, Delete, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateOrderRequest } from './dto/requests/create-order-request.dto';
import { UpdateOrderRequest } from './dto/requests/update-order-request.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private readonly orderService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới đơn hàng' })
  @ApiResponse({ status: 201, description: 'Tạo đơn hàng thành công' })
  @ApiBody({ type: CreateOrderRequest })
  createOrder(@Body() orderData: CreateOrderRequest) {
    return this.orderService.send({ cmd: 'create_order' }, orderData);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đơn hàng' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng' })
  getAllOrders() {
    return this.orderService.send({ cmd: 'get_orders' }, {});
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật đơn hàng' })
  @ApiResponse({ status: 200, description: 'Cập nhật đơn hàng thành công' })
  updateOrder(@Param('id', ParseIntPipe) id: number, @Body() orderData: UpdateOrderRequest) {
    return this.orderService.send({ cmd: 'update_order' }, { id, orderData });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @ApiResponse({ status: 200, description: 'Xóa đơn hàng thành công' })
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.send({ cmd: 'delete_order' }, { id });
  }
}
