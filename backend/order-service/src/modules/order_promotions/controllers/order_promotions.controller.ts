import { Controller } from '@nestjs/common';
import { OrderPromotionsService } from '../services/order_promotions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderPromotion } from '../entities/order_promotions.entity';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';

@Controller('order-promotions')
export class OrderPromotionsController {
  constructor(
    private readonly orderPromotionsService: OrderPromotionsService,
  ) {}

  @MessagePattern({ cmd: 'get_all_order_promotions' })
  async findAll(): Promise<OrderPromotion[]> {
    return await this.orderPromotionsService.findAll();
  }

  @MessagePattern({ cmd: 'get_order_promotions_by_order_id' })
  async findByOrderId(
    @Payload() payload: { orderId: number },
  ): Promise<OrderPromotion[]> {
    return await this.orderPromotionsService.findByOrderId(payload.orderId);
  }

  @MessagePattern({ cmd: 'create_order_promotion' })
  async create(
    @Payload() promotionDto: CreateOrderPromotionRequest,
  ): Promise<OrderPromotion> {
    return await this.orderPromotionsService.createPromotion(promotionDto);
  }

  @MessagePattern({ cmd: 'update_order_promotion' })
  async update(
    @Payload()
    payload: {
      id: number;
      updateOrderPromotionRequest: UpdateOrderPromotionRequest;
    },
  ): Promise<OrderPromotion> {
    return await this.orderPromotionsService.updatePromotion(
      payload.id,
      payload.updateOrderPromotionRequest,
    );
  }

  @MessagePattern({ cmd: 'delete_order_promotion' })
  async delete(
    @Payload() payload: { id: number },
  ): Promise<{ message: string }> {
    return await this.orderPromotionsService.deletePromotion(payload.id);
  }
}
