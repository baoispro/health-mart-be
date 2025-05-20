import { DiscountType } from '../entities/discount_code.entity';

export class CreateDiscountCodeRequest {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
}
