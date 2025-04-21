import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateSideEffectRequest {
  @ApiProperty({ 
    description: 'ID sản phẩm', 
    example: 1,
    required: true 
  })
  @IsNumber()
  @IsNotEmpty({ message: 'ID sản phẩm không được để trống' })
  product_id: number;

  @ApiProperty({ 
    description: 'Mô tả tác dụng phụ', 
    example: 'Có thể gây buồn ngủ',
    required: true 
  })
  @IsString()
  @IsNotEmpty({ message: 'Mô tả tác dụng phụ không được để trống' })
  description: string;
}