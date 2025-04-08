import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductRequest {
  @ApiProperty({ example: 'Paracetamol 500mg', description: 'Tên sản phẩm' })
  @IsOptional()
  @IsString({ message: 'name phải là chuỗi' })
  name?: string;

  @ApiProperty({ example: '<p>Chi tiết mô tả HTML</p>', description: 'Mô tả chi tiết dạng HTML' })
  @IsOptional()
  @IsString({ message: 'description_html phải là chuỗi' })
  description_html?: string;

  @ApiProperty({ example: 15000, description: 'Giá sản phẩm' })
  @IsOptional()
  @IsNumber({}, { message: 'price phải là số' })
  price?: number;

  @ApiProperty({ example: 'MEKOPHAR', description: 'Thương hiệu sản phẩm' })
  @IsOptional()
  @IsString({ message: 'brand phải là chuỗi' })
  brand?: string;

  @ApiProperty({ example: 'viên', description: 'Đơn vị tính' })
  @IsOptional()
  @IsString({ message: 'unit phải là chuỗi' })
  unit?: string;

  @ApiProperty({ example: '500mg paracetamol', description: 'Thành phần / đặc điểm kỹ thuật' })
  @IsOptional()
  @IsString({ message: 'specification phải là chuỗi' })
  specification?: string;

  @ApiProperty({ example: 'Việt Nam', description: 'Quốc gia sản xuất' })
  @IsOptional()
  @IsString({ message: 'country phải là chuỗi' })
  country?: string;

  @ApiProperty({ example: 'Công ty dược ABC', description: 'Nhà sản xuất' })
  @IsOptional()
  @IsString({ message: 'manufacturer phải là chuỗi' })
  manufacturer?: string;

  @ApiProperty({ example: 'VN-12345-67', description: 'Số đăng ký' })
  @IsOptional()
  @IsString({ message: 'registration_number phải là chuỗi' })
  registration_number?: string;

  @ApiProperty({ example: 'Giảm đau, hạ sốt', description: 'Mô tả ngắn gọn sản phẩm' })
  @IsOptional()
  @IsString({ message: 'short_description phải là chuỗi' })
  short_description?: string;

  @ApiProperty({ example: 'paracetamol-500mg', description: 'Slug dùng trong URL' })
  @IsOptional()
  @IsString({ message: 'slug phải là chuỗi' })
  slug?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL ảnh đại diện' })
  @IsOptional()
  @IsString({ message: 'image_url phải là chuỗi' })
  image_url?: string;

  @ApiProperty({ example: 2, description: 'ID danh mục sản phẩm' })
  @IsOptional()
  @IsNumber({}, { message: 'categoryId phải là số' })
  @Transform(({ obj }) => obj.category_id ?? obj.categoryId) // Ưu tiên lấy category_id nếu có
  categoryId?: number;
}
