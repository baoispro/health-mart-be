import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewImgRequest {
  @ApiProperty({ example: 1, description: 'ID của đánh giá' })
  @IsNumber()
  @IsNotEmpty()
  reviewId: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL hình ảnh đánh giá',
  })
  @IsString()
  @IsOptional()
  img_url?: string =
    'https://bucket-ktpm.s3.ap-southeast-1.amazonaws.com/avatars/4c66412e-6894-4bfd-b717-3018f79faf13_avatar-default.svg';
}
