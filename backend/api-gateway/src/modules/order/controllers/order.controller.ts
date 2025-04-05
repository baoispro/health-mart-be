import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderRequest } from '../dto/requests/create-order-request.dto';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UpdateOrderRequest } from '../dto/requests/update-order-request.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng được trả về' })
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin đơn hàng thành công')
  getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiBody({ type: CreateOrderRequest })
  @ApiResponse({ status: 201, description: 'Đơn hàng được tạo thành công' })
  async createOrder(@Body() createOrderDto: CreateOrderRequest) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật đơn hàng thành công.')
  updateOrder(
    @Param('id') id: number,
    @Body() updateOrderRequest: UpdateOrderRequest,
  ) {
    return this.orderService.updateOrder(id, updateOrderRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa đơn hàng thành công.')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
