import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePrecautionRequest {
  @ApiProperty({ example: 8, description: 'ID của sản phẩm' })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Product ID phải là số' })
  product_id: number;
  @ApiProperty({
    example: 'Mô tả',
    description: 'Mô tả',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;
}
