import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewRequest {
  @ApiProperty({ example: 1, description: 'ID người dùng' })
  @IsNotEmpty({ message: 'user_id là bắt buộc' })
  @IsInt({ message: 'user_id phải là số nguyên' })
  userId: number;

  @ApiProperty({ example: 10, description: 'ID sản phẩm' })
  @IsNotEmpty({ message: 'product_id là bắt buộc' })
  @IsInt({ message: 'product_id phải là số nguyên' })
  productId: number;

  @ApiProperty({ example: 5, description: 'Số sao đánh giá (1-5)' })
  @IsNotEmpty({ message: 'rating là bắt buộc' })
  @IsInt({ message: 'rating phải là số nguyên' })
  @Min(1, { message: 'rating phải từ 1 đến 5' })
  @Max(5, { message: 'rating phải từ 1 đến 5' })
  rating: number;

  @ApiProperty({
    example: 'Sản phẩm rất tốt!',
    description: 'Nội dung đánh giá',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'comment phải là chuỗi ký tự' })
  comment?: string;

  @IsOptional()
  @IsBoolean()
  isHidden?: boolean = false;
}
