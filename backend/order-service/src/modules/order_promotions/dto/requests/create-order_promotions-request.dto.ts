import { DiscountType } from '../../entities/order_promotions.entity';

export class CreateOrderPromotionRequest {
  order_id: number;
  promoCode: string;
  discountType: DiscountType;
  discountValue: number;
}
 