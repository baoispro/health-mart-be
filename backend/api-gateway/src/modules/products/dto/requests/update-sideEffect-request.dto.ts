import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateSideEffectRequest {
  @ApiProperty({
    description: 'Mô tả tác dụng phụ cập nhật',
    example: 'Có thể gây buồn ngủ hoặc chóng mặt',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(5, 500, { message: 'Mô tả tác dụng phụ phải từ 5 đến 500 ký tự' })
  description?: string;
}
