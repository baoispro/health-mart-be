import { DiscountType } from '../../entities/order_promotions.entity';

export class UpdateOrderPromotionRequest {
  promoCode?: string;
  discountType?: DiscountType;
  discountValue?: number;
}
