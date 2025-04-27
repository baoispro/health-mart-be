import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductRequest {
  @ApiProperty({ example: 'Paracetamol 500mg', description: 'Tên sản phẩm' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @ApiProperty({ example: 15000, description: 'Giá sản phẩm (VNĐ)' })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá phải là số' })
  price: number;

  @ApiProperty({ example: 'DHG Pharma', description: 'Thương hiệu sản phẩm' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Thương hiệu không được để trống' })
  brand: string;

  @ApiProperty({ example: 'Hộp', description: 'Đơn vị tính' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Đơn vị không được để trống' })
  unit: string;

  @ApiProperty({ example: 3, description: 'ID của danh mục sản phẩm' })
  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Category ID phải là số' })
  category_id: number;

  @ApiProperty({ example: '500mg, viên nén', description: 'Thông số kỹ thuật' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Thông số kỹ thuật không được để trống' })
  specification: string;

  @ApiProperty({ example: 'Việt Nam', description: 'Xuất xứ' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Quốc gia không được để trống' })
  country: string;

  @ApiProperty({ example: 'Thuốc giảm đau, hạ sốt', description: 'Mô tả ngắn' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả ngắn không được để trống' })
  short_description: string;

  @ApiProperty({ example: 'CTCP Dược Hậu Giang', description: 'Nhà sản xuất' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Nhà sản xuất không được để trống' })
  manufacturer: string;

  @ApiProperty({ example: 'VN-12345-67', description: 'Số đăng ký sản phẩm' })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Số đăng ký không được để trống' })
  registration_number: string;

  @ApiProperty({
    example: '<p>Chi tiết sản phẩm...</p>',
    description: 'Mô tả chi tiết HTML',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Mô tả chi tiết không được để trống' })
  description_html: string;

  @ApiProperty({
    example: 'paracetamol-500mg',
    description: 'Slug dùng cho URL',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL ảnh đại diện',
  })
  @Expose()
  @IsString()
  @IsOptional()
  image_url?: string = 'https://example.com/avatar.png';
}
