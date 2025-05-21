import { Controller } from '@nestjs/common';
import { OrderItemsService } from '../services/order_items.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderItem } from '../entities/order_items.entity';
import { CreateOrderItemRequestDto } from '../dto/requests/create-order_item-request.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @MessagePattern({ cmd: 'get_all_order_items' })
  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemsService.findAll();
  }

  @MessagePattern({ cmd: 'get_order_items_by_order_id' })
  async findByOrderId(
    @Payload() payload: { orderId: number },
  ): Promise<OrderItem[]> {
    return await this.orderItemsService.findByOrderId(payload.orderId);
  }

  @MessagePattern({ cmd: 'create_order_items' })
  async create(
    @Payload() items: CreateOrderItemRequestDto[],
  ): Promise<OrderItem[]> {
    return await this.orderItemsService.createOrderItem(items);
  }

  @MessagePattern({ cmd: 'delete_order_item_by_id' })
  async deleteItemById(
    @Payload() payload: { orderItemId: number },
  ): Promise<{ message: string }> {
    const result = await this.orderItemsService.deleteItemById(
      payload.orderItemId,
    );
    return result;
  }
}
