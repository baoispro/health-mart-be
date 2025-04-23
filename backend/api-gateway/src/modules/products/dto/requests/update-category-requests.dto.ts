import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequest {
  @ApiProperty({ example: 'Thuốc giảm đau', description: 'Tên danh mục' })
  @IsOptional()
  @IsString({ message: 'name phải là chuỗi' })
  name?: string;

  @ApiProperty({ example: 'thuoc-giam-dau', description: 'Slug dùng trong URL' })
  @IsOptional()
  @IsString({ message: 'slug phải là chuỗi' })
  slug?: string;

  @ApiProperty({ example: 1, description: 'ID danh mục cha (nếu có)' })
  @IsOptional()
  @IsNumber({}, { message: 'parent_id phải là số' })
  parent_id?: number;
}
