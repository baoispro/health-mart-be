import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewImgRequest {
  @ApiProperty({ example: 1, description: 'ID của đánh giá' })
  @IsNumber()
  @IsNotEmpty()
  reviewId: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL hình ảnh đánh giá' })
  @IsString()
  @IsNotEmpty()
  img_url: string;
}
