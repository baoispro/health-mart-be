import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateOrderPromotionRequest {
  @ApiProperty({
    example: 123,
    description: 'ID của đơn hàng áp dụng khuyến mãi',
  })
  @IsNumber()
  @Type(() => Number)
  order_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID của mã giảm giá từ kho discount_codes',
  })
  @IsNumber()
  @Type(() => Number)
  discountCodeId: number;
}
