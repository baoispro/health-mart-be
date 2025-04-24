import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewReplyRequest {
  @ApiProperty({ example: 1, description: 'ID của review cần phản hồi' })
  @IsNotEmpty({ message: 'reviewId là bắt buộc' })
  @IsInt({ message: 'reviewId phải là số nguyên' })
  reviewId: number;

  @ApiProperty({ example: '1', description: 'Mã nhân viên phản hồi' })
  @IsNotEmpty({ message: 'staffId là bắt buộc' })
  @IsInt({ message: 'staffId phải là số nguyên' })
  staffId: number;

  @ApiProperty({
    example: 'Cảm ơn bạn đã đánh giá!',
    description: 'Nội dung phản hồi',
  })
  @IsNotEmpty({ message: 'replyText là bắt buộc' })
  @IsString({ message: 'replyText phải là chuỗi' })
  replyText: string;
}
