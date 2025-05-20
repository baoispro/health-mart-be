import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderPromotionRequest {
  @ApiPropertyOptional({
    example: 2,
    description: 'ID của mã giảm giá mới (nếu cập nhật)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'discountCodeId phải là số' })
  @Type(() => Number)
  discountCodeId?: number;
}
