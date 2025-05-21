import { DiscountType } from '../entities/discount_code.entity';

export class UpdateDiscountCodeRequest {
  code?: string;
  discountType?: DiscountType;
  discountValue?: number;
  validFrom?: Date;
  validUntil?: Date;
  usageCount?: number;
  usageLimit?: number;
}
