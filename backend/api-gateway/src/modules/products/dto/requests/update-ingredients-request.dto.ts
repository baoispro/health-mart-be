import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested, IsOptional } from 'class-validator';

export class UpdateIngredientItemDto {
  @ApiProperty({ example: 'Calci carbonat', description: 'Tên thành phần' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '400mg', description: 'Hàm lượng' })
  @IsString()
  @IsNotEmpty()
  concentration: string;
}

export class UpdateIngredientRequest {

  @ApiProperty({
    type: [UpdateIngredientItemDto],
    description: 'Danh sách thành phần cập nhật',
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateIngredientItemDto)
  ingredients: UpdateIngredientItemDto[];
}