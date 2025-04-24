import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderItemService } from '../services/order_item.service';
import { CreateOrderItemRequest } from '../dto/requests/create-order_item-request.dto';
import { UpdateOrderItemRequest } from '../dto/requests/update-order_item-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@Controller('order-item')
@ApiTags('Order Item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả order items' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách order items',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả order items thành công')
  getAllOrderItems() {
    return this.orderItemService.getAllOrderItems();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin order item theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin order item',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin order item thành công')
  getOrderItemById(@Param('id') id: number) {
    return this.orderItemService.getOrderItemById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một order item' })
  @ApiResponse({
    status: 201,
    description: 'Order item được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo order item thành công.')
  createOrderItem(@Body() createOrderItemRequest: CreateOrderItemRequest) {
    return this.orderItemService.createOrderItem(createOrderItemRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin order item' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật order item thành công.')
  updateOrderItem(
    @Param('id') id: number,
    @Body() updateOrderItemRequest: UpdateOrderItemRequest,
  ) {
    return this.orderItemService.updateOrderItem(id, updateOrderItemRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa order item' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa order item thành công.')
  deleteOrderItem(@Param('id') id: number) {
    return this.orderItemService.deleteOrderItem(id);
  }
}
