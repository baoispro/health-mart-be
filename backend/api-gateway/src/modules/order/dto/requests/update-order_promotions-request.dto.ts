import { ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from '../../enums/order.enum';

export class UpdateOrderPromotionRequest {
  @ApiPropertyOptional({
    example: 'PROMO2023-UPDATED',
    description: 'Mã khuyến mãi mới (nếu cập nhật)',
  })
  promoCode?: string;

  @ApiPropertyOptional({
    enum: DiscountType,
    example: DiscountType.PERCENTAGE,
    description:
      'Loại khuyến mãi mới: NONE, FIXED hoặc PERCENTAGE (nếu cập nhật)',
  })
  discountType?: DiscountType;

  @ApiPropertyOptional({
    example: 15,
    description:
      'Giá trị giảm giá mới (nếu cập nhật). Với discountType là FIXED thì là số tiền, còn với PERCENTAGE là phần trăm giảm',
  })
  discountValue?: number;
}
