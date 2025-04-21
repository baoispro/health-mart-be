import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewRequest {
  @ApiProperty({ example: 5, description: 'Số sao đánh giá (1-5)', required: false })
  @IsOptional()
  @IsInt({ message: 'rating phải là số nguyên' })
  @Min(1, { message: 'rating phải từ 1 đến 5' })
  @Max(5, { message: 'rating phải từ 1 đến 5' })
  rating?: number;

  @ApiProperty({ example: 'Sản phẩm cải tiến rất tốt!', description: 'Nội dung đánh giá', required: false })
  @IsOptional()
  @IsString({ message: 'comment phải là chuỗi ký tự' })
  comment?: string;
}
