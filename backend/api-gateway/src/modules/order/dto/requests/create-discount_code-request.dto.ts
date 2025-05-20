import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

// Định nghĩa enum cục bộ với các giá trị cố định
export enum DiscountTypeEnum {
  NONE = 'NONE',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export class CreateDiscountCodeRequest {
  @ApiProperty({
    example: 'DISCOUNT2023',
    description: 'Mã giảm giá duy nhất',
  })
  @IsNotEmpty({ message: 'Mã giảm giá không được để trống' })
  code: string;

  @ApiProperty({
    example: DiscountTypeEnum.FIXED,
    enum: DiscountTypeEnum,
    description: 'Loại giảm giá: NONE, FIXED hoặc PERCENTAGE',
  })
  @IsEnum(DiscountTypeEnum, {
    message: 'discountType phải là NONE, FIXED hoặc PERCENTAGE',
  })
  discountType: DiscountTypeEnum;

  @ApiProperty({
    example: 100000,
    description:
      'Giá trị giảm giá: nếu discountType là FIXED thì đây là số tiền, nếu là PERCENTAGE thì đây là phần trăm giảm',
  })
  @IsNotEmpty({ message: 'Giá trị giảm giá không được để trống' })
  @IsNumber({}, { message: 'Giá trị giảm giá phải là số' })
  @Min(0, { message: 'Giá trị giảm giá không được nhỏ hơn 0' })
  discountValue: number;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Ngày bắt đầu hiệu lực của mã giảm giá (định dạng YYYY-MM-DD)',
  })
  @IsNotEmpty({ message: 'Ngày bắt đầu hiệu lực không được để trống' })
  @IsDateString(
    {},
    { message: 'Ngày bắt đầu hiệu lực phải theo định dạng ISO 8601' },
  )
  validFrom: Date;

  @ApiProperty({
    example: '2023-12-31',
    description:
      'Ngày kết thúc hiệu lực của mã giảm giá (định dạng YYYY-MM-DD)',
  })
  @IsNotEmpty({ message: 'Ngày kết thúc hiệu lực không được để trống' })
  @IsDateString(
    {},
    { message: 'Ngày kết thúc hiệu lực phải theo định dạng ISO 8601' },
  )
  validUntil: Date;

  @ApiProperty({
    example: 1,
    description: 'Giới hạn số lần sử dụng của mã giảm giá (mặc định là 1)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'usageLimit phải là số' })
  usageLimit?: number;
}
