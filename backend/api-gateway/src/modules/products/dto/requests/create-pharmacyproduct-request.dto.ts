import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePharmacyProductRequest {
  @ApiProperty({
    example: 1,
    description: 'ID của nhà thuốc',
    required: true,
  })
  @Expose()
  @IsInt({ message: 'ID nhà thuốc phải là số nguyên' })
  @IsPositive({ message: 'ID nhà thuốc phải là số dương' })
  @IsNotEmpty({ message: 'ID nhà thuốc không được để trống' })
  pharmacy_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID của sản phẩm',
    required: true,
  })
  @Expose()
  @IsInt({ message: 'ID sản phẩm phải là số nguyên' })
  @IsPositive({ message: 'ID sản phẩm phải là số dương' })
  @IsNotEmpty({ message: 'ID sản phẩm không được để trống' })
  product_id: number;

  @ApiProperty({
    example: 100,
    description: 'Số lượng tồn kho',
    minimum: 0,
  })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số lượng phải là số' })
  @IsPositive({ message: 'Số lượng phải lớn hơn 0' })
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;
}
