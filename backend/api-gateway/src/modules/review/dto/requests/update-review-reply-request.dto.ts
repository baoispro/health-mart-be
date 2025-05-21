import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateReviewReplyRequest {
  @ApiProperty({
    example: 'Cảm ơn bạn rất nhiều!',
    description: 'Nội dung phản hồi mới',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'replyText phải là chuỗi' })
  replyText?: string;

  @ApiProperty({
    example: 123,
    description: 'ID của nhân viên phản hồi',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'staffId phải là số' })
  staffId?: number;
}
