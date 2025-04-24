import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientRequest {
  @ApiProperty({
    example: 'Thành phần thuốc 300mg',
    description: 'Tên thành phần',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Tên thành phần không được để trống' })
  name?: string;

  @ApiProperty({
    example: 'Hàm lượng của thành phần thuốc 300mg',
    description: 'Hàm lượng thành phần',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Hàm lượng thành phần không được để trống' })
  concentration?: string;
}
