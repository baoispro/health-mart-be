import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateIngredientRequest {
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
    example: 'Thành phần thuốc 300mg',
    description: 'Hàm lượng cách dùng',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Tên thành phần cách dùng không được để trống' })
  name: string;
  @ApiProperty({
    example: 'Hàm lượng 300mg',
    description: 'Hàm lượng của sản phẩm',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Hàm lượng không được để trống' })
  concentration: string;
}
