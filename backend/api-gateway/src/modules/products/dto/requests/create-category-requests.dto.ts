import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryRequest {
  @ApiProperty({
    example: 'Thuốc giảm đau',
    description: 'Tên danh mục sản phẩm',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  name: string;

  @ApiProperty({ example: 'thuoc-giam-dau', description: 'Slug dùng cho URL' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @ApiProperty({
    example: 1,
    description: 'ID của danh mục cha (nếu có)',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber({}, { message: 'Parent ID phải là số' })
  parent_id?: number;
}
