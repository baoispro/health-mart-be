import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStorageRequest {
  @ApiProperty({
    example: 'Mô tả về bảo quản.',
    description: 'Mô tả bảo quản',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả bảo quản không được để trống' })
  description?: string;

  @ApiProperty({ example: 8, description: 'ID của sản phẩm' })
  @IsOptional()
  @IsNumber({}, { message: 'Product ID phải là số' })
  @IsNotEmpty({ message: 'Product ID không được để trống' })
  product_id?: number;
}
