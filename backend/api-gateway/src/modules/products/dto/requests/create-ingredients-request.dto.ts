import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested, ArrayMinSize } from 'class-validator';

export class IngredientItemDto {
  @ApiProperty({ example: 'Calci carbonat', description: 'Tên thành phần' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '400mg', description: 'Hàm lượng' })
  @IsString()
  @IsNotEmpty()
  concentration: string;
}

export class CreateIngredientRequest {
  @ApiProperty({
    example: 1,
    description: 'ID của sản phẩm',
    required: true,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({
    type: [IngredientItemDto],
    description: 'Danh sách thành phần',
  })
  @ValidateNested({ each: true })
  @Type(() => IngredientItemDto)
  @ArrayMinSize(1, { message: 'Phải có ít nhất 1 thành phần' })
  ingredients: IngredientItemDto[];
}