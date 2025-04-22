import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStorageRequest {
  @ApiProperty({
    example: 'Mô tả về bảo quản.',
    description: 'Mô tả bảo quản',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả bảo quản không được để trống' })
  description: string;

  @ApiProperty({ example: 7, description: 'ID của sản phẩm' })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Product ID phải là số' })
  product_id: number;
}
