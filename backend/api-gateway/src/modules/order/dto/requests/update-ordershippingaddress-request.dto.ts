import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UpdateOrderShippingAddressRequest {
  @ApiProperty({
    description: 'City',
    example: 'Hà Nội',
    required: true,
  })
  @IsString({ message: 'City phải là chuỗi' })
  @IsNotEmpty({ message: 'City không được để trống' })
  @MaxLength(50, { message: 'City không được vượt quá 50 ký tự' })
  city: string;

  @ApiProperty({
    description: 'District',
    example: 'Cầu Giấy',
    required: true,
  })
  @IsString({ message: 'District phải là chuỗi' })
  @IsNotEmpty({ message: 'District không được để trống' })
  @MaxLength(50, { message: 'District không được vượt quá 50 ký tự' })
  district: string;

  @ApiProperty({
    description: 'Ward',
    example: 'Dịch Vọng',
    required: true,
  })
  @IsString({ message: 'Ward phải là chuỗi' })
  @IsNotEmpty({ message: 'Ward không được để trống' })
  @MaxLength(50, { message: 'Ward không được vượt quá 50 ký tự' })
  ward: string;

  @ApiProperty({
    description: 'Detailed address',
    example: '123 Nguyễn Văn A',
    required: true,
  })
  @IsString({ message: 'Address phải là chuỗi' })
  @IsNotEmpty({ message: 'Address không được để trống' })
  @MaxLength(255, { message: 'Address không được vượt quá 255 ký tự' })
  address: string;

  // --- Các trường mới cho thông tin người đặt và ghi chú ---
  @ApiProperty({
    description: 'Customer Name (orderer, optional)',
    example: 'Nguyễn Văn A',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Customer Name phải là chuỗi nếu có' })
  customerName?: string;

  @ApiProperty({
    description: 'Customer Phone (orderer, optional)',
    example: '0987654321',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Customer Phone phải là chuỗi nếu có' })
  customerPhone?: string;

  @ApiProperty({
    description: 'Customer Email (optional)',
    example: 'example@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Customer Email phải là chuỗi nếu có' })
  customerEmail?: string;

  @ApiProperty({
    description: 'Note (optional)',
    example: 'Ghi chú về đơn hàng',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Note phải là chuỗi nếu có' })
  note?: string;
}
