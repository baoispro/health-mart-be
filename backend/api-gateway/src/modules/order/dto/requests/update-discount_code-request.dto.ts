import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';

// Định nghĩa enum cục bộ với các giá trị cố định cho phần discount
export enum DiscountTypeEnum {
  NONE = 'NONE',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export class UpdateDiscountCodeRequest {
  @ApiPropertyOptional({
    example: 'DISCOUNT2023-UPDATED',
    description: 'Mã giảm giá mới (nếu cập nhật)',
  })
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({
    example: DiscountTypeEnum.FIXED,
    enum: DiscountTypeEnum,
    description:
      'Loại giảm giá mới (nếu cập nhật), giá trị có thể là NONE, FIXED hoặc PERCENTAGE',
  })
  @IsOptional()
  @IsEnum(DiscountTypeEnum, {
    message: 'discountType phải là NONE, FIXED hoặc PERCENTAGE',
  })
  discountType?: DiscountTypeEnum;

  @ApiPropertyOptional({
    example: 150000,
    description:
      'Giá trị giảm giá mới (nếu cập nhật). Nếu discountType là FIXED thì là số tiền; nếu là PERCENTAGE thì là phần trăm giảm',
  })
  @IsOptional()
  @IsNumber({}, { message: 'discountValue phải là số' })
  @Min(0, { message: 'discountValue không được nhỏ hơn 0' })
  discountValue?: number;

  @ApiPropertyOptional({
    example: '2023-02-01',
    description:
      'Ngày bắt đầu hiệu lực mới (nếu cập nhật, định dạng YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'Ngày bắt đầu hiệu lực phải theo định dạng ISO 8601' },
  )
  validFrom?: Date;

  @ApiPropertyOptional({
    example: '2023-11-30',
    description:
      'Ngày kết thúc hiệu lực mới (nếu cập nhật, định dạng YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'Ngày kết thúc hiệu lực phải theo định dạng ISO 8601' },
  )
  validUntil?: Date;

  @ApiPropertyOptional({
    example: 5,
    description: 'Giới hạn số lần sử dụng mới (nếu cập nhật)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'usageLimit phải là số' })
  usageLimit?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số lần đã sử dụng (nếu cập nhật)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'usageCount phải là số' })
  @Min(0, { message: 'usageCount không được nhỏ hơn 0' })
  usageCount?: number;
}
