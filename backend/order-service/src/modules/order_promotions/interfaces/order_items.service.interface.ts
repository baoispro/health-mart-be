import { OrderPromotion } from '../entities/order_promotions.entity';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';

export interface OrderPromotionsService {
  findAll(): Promise<OrderPromotion[]>;
  findByOrderId(orderId: number): Promise<OrderPromotion[]>;
  createPromotion(dto: CreateOrderPromotionRequest): Promise<OrderPromotion>;
  updatePromotion(
    id: number,
    updateDto: UpdateOrderPromotionRequest,
  ): Promise<OrderPromotion>;
  deletePromotion(id: number): Promise<void>;
}
