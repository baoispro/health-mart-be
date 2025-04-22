import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUsageRequest {
  @ApiProperty({
    example:
      'Sản phẩm được dùng để đo huyết áp tâm thu, huyết áp tâm trương và nhịp tim.',
    description: 'Mô tả công dụng',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả công dụng không được để trống' })
  description?: string;

  @ApiProperty({ example: 8, description: 'ID của sản phẩm' })
  @IsOptional()
  @IsNumber({}, { message: 'Product ID phải là số' })
  @IsNotEmpty({ message: 'Product ID không được để trống' })
  product_id?: number;
}
