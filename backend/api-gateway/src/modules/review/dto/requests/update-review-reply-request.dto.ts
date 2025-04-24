import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewReplyRequest {
  @ApiProperty({
    example: 'Cảm ơn bạn rất nhiều!',
    description: 'Nội dung phản hồi mới',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'replyText phải là chuỗi' })
  replyText?: string;
}
