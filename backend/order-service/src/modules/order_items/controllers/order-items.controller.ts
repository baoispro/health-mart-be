import { Controller } from '@nestjs/common';
import { OrderItemsService } from '../services/order-items.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderItemRequestDto } from '../dto/requests/create-order_item-request.dto';
import { UpdateOrderItemRequestDto } from '../dto/requests/update-order_item-request.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @MessagePattern('get_all_order_items')
  getAllOrderItems() {
    return this.orderItemsService.findAll();
  }

  @MessagePattern('get_order_item_by_id')
  async getOrderItemById(@Payload() id: number) {
    return this.orderItemsService.findOne(id);
  }

  @MessagePattern('create_order_item')
  async createOrderItem(@Payload() createOrderItemRequest: CreateOrderItemRequestDto) {
    return this.orderItemsService.create(createOrderItemRequest);
  }

  @MessagePattern('update_order_item')
  async updateOrderItem(
    @Payload() payload: { id: number; updateOrderItemRequest: UpdateOrderItemRequestDto },
  ) {
    const { id, updateOrderItemRequest } = payload;
    return this.orderItemsService.update(id, updateOrderItemRequest);
  }

  @MessagePattern('delete_order_item')
  async deleteOrderItem(@Payload() id: number) {
    return this.orderItemsService.remove(id);
  }
}