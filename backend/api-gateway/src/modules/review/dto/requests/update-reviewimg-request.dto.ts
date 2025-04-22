import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewImgRequest {
  @ApiPropertyOptional({ example: 'https://example.com/image_updated.jpg', description: 'URL hình ảnh đánh giá (mới)' })
  @IsOptional()
  @IsString()
  img_url?: string;
}