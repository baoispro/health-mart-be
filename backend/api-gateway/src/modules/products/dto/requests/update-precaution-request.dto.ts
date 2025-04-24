import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePrecautionRequest {
  @ApiProperty({
    description: 'Mô tả ',
    example: 'Có thể gây buồn ngủ hoặc chóng mặt',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(5, 500, { message: 'Mô tả tác dụng phụ phải từ 5 đến 500 ký tự' })
  description?: string;
}
