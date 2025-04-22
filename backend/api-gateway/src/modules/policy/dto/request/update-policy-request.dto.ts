import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePolicyRequest {
  @ApiProperty({ example: 'gioi-thieu', description: 'Slug chính sách' })
  @IsOptional()
  @IsString({ message: 'slug phải là chuỗi' })
  slug?: string;

  @ApiProperty({ example: 'Giới thiệu', description: 'Tên chính sách' })
  @IsOptional()
  @IsString({ message: 'title phải là chuỗi' })
  title?: string;

  @ApiProperty({ example: 'Mô tả ....', description: 'Mô tả chính sách' })
  @IsOptional()
  @IsString({ message: 'content phải là chuỗi' })
  content?: string;
}
