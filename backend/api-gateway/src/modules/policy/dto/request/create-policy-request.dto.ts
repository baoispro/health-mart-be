import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyRequest {
  @ApiProperty({ example: 'gioi-thieu', description: 'Slug của chính sách' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Slug chính sách không được để trống' })
  slug: string;

  @ApiProperty({ example: 'Giới thiệu', description: 'Tên của chính sách' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Tên chính sách không được để trống' })
  title: string;

  @ApiProperty({ example: 'Mô tả', description: 'Mô tả của chính sách' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả chính sách không được để trống' })
  content: string;
}
