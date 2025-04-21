import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsageRequest {
  @ApiProperty({
    example:
      'Sản phẩm được dùng để đo huyết áp tâm thu, huyết áp tâm trương và nhịp tim.',
    description: 'Mô tả công dụng',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả công dụng không được để trống' })
  description: string;

  @ApiProperty({ example: 8, description: 'ID của sản phẩm' })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Product ID phải là số' })
  product_id: number;
}
