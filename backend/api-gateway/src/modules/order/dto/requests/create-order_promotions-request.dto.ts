import { ApiProperty } from '@nestjs/swagger';
import { DiscountType } from '../../enums/order.enum';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEnum,
} from 'class-validator';

export class CreateOrderPromotionRequest {
  @ApiProperty({
    example: 123,
    description: 'ID của đơn hàng áp dụng khuyến mãi',
  })
  @IsNumber({}, { message: 'order_id phải là số!' })
  order_id: number;

  @ApiProperty({
    example: 'PROMO2023',
    description: 'Mã khuyến mãi được áp dụng',
  })
  @IsNotEmpty({ message: 'promoCode không được để trống!' })
  @IsString({ message: 'promoCode phải là chuỗi!' })
  promoCode: string;

  @ApiProperty({
    enum: DiscountType,
    example: DiscountType.FIXED,
    description: 'Loại khuyến mãi: NONE, FIXED hoặc PERCENTAGE',
  })
  @IsOptional()
  @IsEnum(DiscountType, {
    message: 'discountType phải là NONE, FIXED hoặc PERCENTAGE!',
  })
  discountType: DiscountType;

  @ApiProperty({
    example: 100000,
    description:
      'Giá trị giảm giá áp dụng. Nếu discountType là FIXED thì đây là số tiền, nếu là PERCENTAGE thì đây là phần trăm giảm',
  })
  @IsNotEmpty({ message: 'discountValue không được để trống!' })
  @IsNumber({}, { message: 'discountValue phải là số!' })
  @Min(0, { message: 'discountValue không được nhỏ hơn 0!' })
  discountValue: number;
}
